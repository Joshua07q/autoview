import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewComponentProps } from "@autoview/interface";
import { TypeGuardError, assertGuard } from "typia";

import { AgentBase, LlmFailure, LlmProxy } from "../../core";
import { Input, Output } from "./dto";
import { prompt } from "./prompt";

export class Agent implements AgentBase<Input, Output> {
  async execute(input: Input): Promise<Output> {
    const compiler = new AutoViewCompiler({
      inputMetadata: {
        $defs: (input.inputSchema as any)["$defs"],
        schema: input.inputSchema as any,
      },
      componentMetadata: {
        $defs: (input.componentSchema as any)["$defs"],
        schema: input.componentSchema as any,
      },
      compilerOptions: {
        module: "cjs",
      },
    });
    const boilerplate = compiler.generateBoilerplate();
    const systemPrompt = prompt({
      input_schema: input.inputSchema,
      output_schema: input.componentSchema,
      component_plan: input.componentPlan,
      boilerplate,
    });

    const results = await new LlmProxy<Input, Output>()
      .withTextHandler(handleText)
      .call(
        input,
        input.provider.api,
        {
          model: input.provider.model,
          messages: [
            {
              role: "user",
              content: systemPrompt,
            },
          ],
          reasoning_effort: "medium",
        },
        input.provider.options,
      );

    const result = results[0];

    if (result == null) {
      throw new LlmFailure(`expect 1 output, but got ${results.length}`);
    }

    return result;
  }
}

async function handleText(input: Input, text: string): Promise<Output> {
  const output = parseOutput(text);
  const compiler = new AutoViewCompiler({
    inputMetadata: {
      $defs: (input.inputSchema as any)["$defs"],
      schema: input.inputSchema as any,
    },
    componentMetadata: {
      $defs: (input.componentSchema as any)["$defs"],
      schema: input.componentSchema as any,
    },
    compilerOptions: {
      module: "cjs",
    },
  });

  const result = await compiler.compile(output.typescript_function);

  if (result.type === "error") {
    throw result.error;
  }

  if (result.type === "failure") {
    console.debug(
      `llm generated invalid typescript code: ${JSON.stringify(
        result.diagnostics,
        null,
        2,
      )}`,
    );
    console.log(`code:\n${result.typescript}`);

    throw new LlmFailure(
      `failed to compile the typescript function: ${JSON.stringify(
        result.diagnostics,
        null,
        2,
      )}`,
    );
  }

  const randomResult = await compiler.compileRandom();

  if (randomResult.type !== "success") {
    throw new Error(
      "[internal bug] failed to generate random function; please report this at `https://github.com/wrtnlabs/autoview/issues`",
    );
  }

  const transform = new Function(
    "$input",
    `${result.javascript}\n\nreturn module.transform($input);`,
  );
  const random = new Function(
    `${randomResult.javascript}\n\nreturn module.generateRandom();`,
  );

  const MAX_ATTEMPTS = 10;

  for (let i = 0; i < MAX_ATTEMPTS; ++i) {
    // SAFETY: random should not throw any error
    const input = random();

    try {
      const output = transform(input);
      assertGuard<IAutoViewComponentProps>(output);
    } catch (error) {
      if (error instanceof TypeGuardError) {
        throw new LlmFailure(
          `your transformer function failed to generate correct output against the input:\n\n<input>\n${JSON.stringify(
            input,
            null,
            2,
          )}\n</input>\n\n<output>\n${JSON.stringify(
            output,
            null,
            2,
          )}\n</output>\n\nand here is the error:\n\n<error>\n${error.message}\n</error>\n\nplease fix the error and try again`,
        );
      }

      throw new LlmFailure(
        `your transformer function emits an error against the input:\n\n<input>\n${JSON.stringify(
          input,
          null,
          2,
        )}\n</input>\n\nand here is the error:\n\n<error>\n${error}\n</error>\n\nplease fix the error and try again`,
      );
    }
  }

  return {
    analysis: output.analysis,
    transform,
    random,
  };
}

interface TextOutput {
  analysis: string;
  typescript_function: string;
}

function parseOutput(text: string): TextOutput {
  const analysis = text.match(
    /<transformation_analysis>([\s\S]*?)<\/transformation_analysis>/,
  );
  const typescriptFunction = text.match(
    /<typescript_function>([\s\S]*?)<\/typescript_function>/,
  );

  if (analysis?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain analysis within <analysis> tags`,
    );
  }

  if (typescriptFunction?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain typescript function within <typescript_function> tags`,
    );
  }

  const stripped = typescriptFunction[1]
    .replace(/```typescript/, "")
    .replace(/```ts/, "")
    .replace(/```/, "");

  return {
    analysis: analysis[1],
    typescript_function: stripped,
  };
}
