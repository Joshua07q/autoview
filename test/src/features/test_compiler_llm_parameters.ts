import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewCompilerResult } from "@autoview/interface";
import { rollup } from "rollup";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_llm_parameters = async (): Promise<void> => {
  const compiler: AutoViewCompiler = new AutoViewCompiler(rollup, {
    inputMetadata: {
      parameters: typia.llm.parameters<
        IBbsArticle,
        "chatgpt",
        {
          reference: true;
        }
      >(),
    },
    componentMetadata: {
      $defs: {},
      schema: {},
    },
  });
  const result: IAutoViewCompilerResult = await compiler.compile(`
      return {
        type: "GridList",
        items: [],
      };
  `);
  if (result.type === "success")
    await TestGlobal.archive("llm_parameters.ts", result.typescript);
  else throw new Error(JSON.stringify(result, null, 2));
};
