import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";
import { IAutoViewAvatarProps } from "./IAutoViewAvatarProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewChipProps
  extends IAutoViewComponentPropsBase<"Chip"> {
  label: string;
  startElement?: IAutoViewAvatarProps | IAutoViewIconProps;
  endElement?: IAutoViewAvatarProps | IAutoViewIconProps;
  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  size?: IAutoViewSize.IBase;
}
