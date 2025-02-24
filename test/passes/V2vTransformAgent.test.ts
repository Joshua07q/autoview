import OpenAI from "openai";
import typia, { createAssertGuard } from "typia";

import { MainContentExtractionAgent } from "../../src/passes/main-content-extraction-agent/MainContentExtractionAgent";
import { V2vTransformAgent } from "../../src/passes/v2v-transform-agent/V2vTransformAgent";
import { V2vTransformAgentDto } from "../../src/passes/v2v-transform-agent/dto";
import { IAutoViewAgentProvider } from "../../src/structures/agents/IAutoViewAgentProvider";
import { TestGlobal } from "../TestGlobal";

async function main(): Promise<void> {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  const provider: IAutoViewAgentProvider.IChatGpt = {
    type: "chatgpt",
    model: "gpt-4o-mini",
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };

  const mainContentExtractionAgent = new MainContentExtractionAgent();

  const result1 = await mainContentExtractionAgent.execute({
    provider,
    jsonResponse: `
{
  "function": {
    "path": "connector_slack_get_files_post",
    "method": "post"
  },
  "arguments": [
    {
      "channel": "C0654GRKQNM",
      "latestDateTime": "2024-10-16T10:31:47.492Z",
      "limit": 200,
      "oldestDateTime": "2024-10-13T00:00:00.000Z",
      "secretKey": "63bfd9cf-b377-49b4-9ecc-0fb3fc0942ed"
    }
  ],
  "success": true,
  "value": {
    "ok": true,
    "files": [
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SBPQREAU/mockups.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SBPQREAU/download/mockups.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07SBPQREAU-02c218b539/mockups_1024.png",
        "name": "Mockups.png",
        "id": "F07SBPQREAU",
        "user": "U060JBN3PGX",
        "size": 933559,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728857835,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLA68XGV-7ba430e150/image_1024.png",
        "name": "image.png",
        "id": "F07RLA68XGV",
        "user": "U0769CNJVLL",
        "size": 1351407,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728865958,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP3BTBMZ/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP3BTBMZ/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RP3BTBMZ-b3f01a2f8f/image_1024.png",
        "name": "image.png",
        "id": "F07RP3BTBMZ",
        "user": "U0769CNJVLL",
        "size": 1327518,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728865967,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SC00310Q/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SC00310Q/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07SC00310Q-005e912be6/image_1024.png",
        "name": "image.png",
        "id": "F07SC00310Q",
        "user": "U0769CNJVLL",
        "size": 1410819,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728865998,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP61MCHG/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP61MCHG/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RP61MCHG-19e338ab2d/image_1024.png",
        "name": "image.png",
        "id": "F07RP61MCHG",
        "user": "U0769CNJVLL",
        "size": 1370028,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728866008,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLU40D1B-e506dd18f1/________________________________2024-10-14______________2.38.45.mp4",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLU40D1B/download/________________________________2024-10-14______________2.38.45.mov",
        "name": "화면 기록 2024-10-14 오후 2.38.45.mov",
        "id": "F07RLU40D1B",
        "user": "U04JTP7U1JS",
        "size": 15396803,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728884368,
        "mimetype": "video/quicktime"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07R8KG95ST/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07R8KG95ST/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07R8KG95ST-65edb15839/image_1024.png",
        "name": "image.png",
        "id": "F07R8KG95ST",
        "user": "U0769CNJVLL",
        "size": 1313006,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728866108,
        "mimetype": "image/png"
      }
    ]
  }
}
`,
  });

  console.log("result1.jsonPath", result1.jsonPath);

  const defs = {};
  const components: V2vTransformAgentDto.IComponent[] = [
    {
      name: "Text",
      description:
        "Displays a single, readonly text string for labels, titles, or short descriptions",
      componentSchema: typia.llm.schema<
        ITestTextProps,
        "chatgpt",
        {
          reference: true;
          strict: true;
        }
      >(defs) as any,
      valueValidator: createAssertGuard<ITestTextProps>(),
    },
    {
      name: "Image",
      description:
        "Renders a single, readonly image from a URL, suitable for static visual content",
      componentSchema: typia.llm.schema<
        ITestImageProps,
        "chatgpt",
        {
          reference: true;
          strict: true;
        }
      >(defs) as any,
      valueValidator: createAssertGuard<ITestImageProps>(),
    },
    {
      name: "List",
      description:
        "Arranges a collection of readonly items in a vertical list, supporting nested components",
      componentSchema: typia.llm.schema<
        ITestListProps,
        "chatgpt",
        {
          reference: true;
          strict: true;
        }
      >(defs) as any,
      valueValidator: createAssertGuard<ITestListProps>(),
    },
    {
      name: "Container",
      description:
        "Groups multiple readonly components vertically for structured layouts",
      componentSchema: typia.llm.schema<
        ITestContainerProps,
        "chatgpt",
        {
          reference: true;
          strict: true;
        }
      >(defs) as any,
      valueValidator: createAssertGuard<ITestContainerProps>(),
    },
    {
      name: "BarGraph",
      description:
        "Displays readonly numerical data as a bar graph for comparison across categories",
      componentSchema: typia.llm.schema<
        ITestBarGraphProps,
        "chatgpt",
        {
          reference: true;
          strict: true;
        }
      >(defs) as any,
      valueValidator: createAssertGuard<ITestBarGraphProps>(),
    },
  ];

  const v2vTransformAgent = new V2vTransformAgent();
  const result2 = await v2vTransformAgent.execute({
    provider,
    content: result1.mainContent,
    components,
    defs,
  });

  console.log("result2", JSON.stringify(result2, null, 2));
}

main().catch(console.error);

// Base interface with discriminator 'type'
interface ITestComponentPropsBase<Type extends string> {
  type: Type;
}

// Text component
interface ITestTextProps extends ITestComponentPropsBase<"Text"> {
  value: string;
}

// Image component
interface ITestImageProps extends ITestComponentPropsBase<"Image"> {
  src: string;
}

// List component
interface ITestListProps extends ITestComponentPropsBase<"List"> {
  children: ITestComponentProps[];
}

// Container component
interface ITestContainerProps extends ITestComponentPropsBase<"Container"> {
  children: ITestComponentProps[];
}

// BarGraph component
interface ITestBarGraphProps extends ITestComponentPropsBase<"BarGraph"> {
  labels: string[];
  values: number[];
}

// Union type for all components
type ITestComponentProps =
  | ITestTextProps
  | ITestImageProps
  | ITestListProps
  | ITestContainerProps
  | ITestBarGraphProps;
