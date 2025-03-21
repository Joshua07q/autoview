import { IAutoViewPresentationComponentProps } from "@autoview/interface";
import { styled } from "@mui/material";

import { renderComponent } from "../../renderer";

export const CarouselSlide = (props: IAutoViewPresentationComponentProps) => {
  return <Slide>{renderComponent(props)}</Slide>;
};

const Slide = styled("div")`
  flex: 0 0 100%;
  min-width: 0;
`;
