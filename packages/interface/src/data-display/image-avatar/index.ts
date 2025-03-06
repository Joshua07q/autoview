import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewImageAvatar` component.
 *
 * The `AutoViewImageAvatar` component is used to display an avatar with an image.
 * It supports specifying an image source (`src`) and an optional name (`name`).
 */
export interface IAutoViewImageAvatarProps
  extends IAutoViewComponentPropsBase<"ImageAvatar"> {
  /**
   * The URL of the image used for the avatar.
   * - Must be a valid URI format.
   * - The image will be displayed inside the avatar component.
   *
   * Example:
   * ```ts
   * src: "https://example.com/avatar.jpg"
   * ```
   */
  src: string & tags.Format<"uri">;

  /**
   * The name associated with the avatar.
   * - Used as an alternative identifier for the user.
   * - Can be displayed as a tooltip or fallback when the image is not available.
   *
   * Example:
   * ```ts
   * name: "John Doe"
   * ```
   *
   * @default undefined
   */
  name?: string;
}
