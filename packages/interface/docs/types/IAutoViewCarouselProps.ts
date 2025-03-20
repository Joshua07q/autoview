import { IAutoViewNonSurfaceComponentProps } from "../../src/properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;
  childComponents: IAutoViewNonSurfaceComponentProps[];
  interval?: number;
  infinite?: boolean;
  effect?: "slide" | "fade";
  speed?: number;
  dotPosition?: "top" | "bottom" | "left" | "right";
  showArrows?: boolean;
  indicators?: boolean;
}
