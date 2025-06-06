import {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerResult,
} from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewVendor;
  inputSchema: IAutoViewCompilerMetadata;
  componentSchema: IAutoViewCompilerMetadata;
  initialAnalysis: string;
  dataExploration: string;
  ideas: string;
  reasoning: string;
  planning: string;
  transformFunctionName: string;
  onCompilerError?: (
    tsCode: string,
    diagnostics: IAutoViewCompilerResult.IDiagnostic[],
  ) => void | Promise<void>;
}

export interface Output {
  analysis: string;
  transformTsCode: string;
}
