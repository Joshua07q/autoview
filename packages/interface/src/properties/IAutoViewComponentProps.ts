import {
  IAutoViewAvatarProps,
  IAutoViewBadgeProps,
  IAutoViewButtonProps,
  IAutoViewCardContentProps,
  IAutoViewCardFooterProps,
  IAutoViewCardHeaderProps,
  IAutoViewCardMediaProps,
  IAutoViewCardProps,
  IAutoViewCarouselProps,
  IAutoViewChipProps,
  IAutoViewCollapseProps,
  IAutoViewDividerProps,
  IAutoViewIconButtonProps,
  IAutoViewIconProps,
  IAutoViewImageProps,
  IAutoViewListItemButtonProps,
  IAutoViewListItemIconProps,
  IAutoViewListItemProps,
  IAutoViewListItemTextProps,
  IAutoViewListProps,
  IAutoViewListSubheaderProps,
  IAutoViewMarkdownProps,
  IAutoViewStatsProps,
  IAutoViewStepperProps,
  IAutoViewTextProps,
  IAutoViewTooltipProps,
} from "../components";

export type IAutoViewCommonComponentProps =
  | IAutoViewAvatarProps
  | IAutoViewChipProps
  | IAutoViewButtonProps
  | IAutoViewDividerProps
  | IAutoViewBadgeProps
  | IAutoViewIconProps
  | IAutoViewIconButtonProps
  | IAutoViewImageProps
  | IAutoViewMarkdownProps
  | IAutoViewStatsProps
  | IAutoViewTextProps
  | IAutoViewTooltipProps;

export type IAutoViewCardComponentProps =
  | IAutoViewCardContentProps
  | IAutoViewCardFooterProps
  | IAutoViewCardHeaderProps
  | IAutoViewCardMediaProps
  | IAutoViewCardProps;

export type IAutoViewListComponentProps =
  | IAutoViewListItemButtonProps
  | IAutoViewListItemIconProps
  | IAutoViewListItemProps
  | IAutoViewListItemTextProps
  | IAutoViewListProps
  | IAutoViewListSubheaderProps;

export type IAutoViewContainerComponentProps =
  | IAutoViewCardComponentProps
  | IAutoViewCarouselProps
  | IAutoViewCollapseProps
  | IAutoViewListComponentProps
  | IAutoViewStepperProps;

export type IAutoViewPresentationComponentProps = IAutoViewCommonComponentProps;

export type IAutoViewComponentProps =
  | IAutoViewPresentationComponentProps
  | IAutoViewContainerComponentProps;
