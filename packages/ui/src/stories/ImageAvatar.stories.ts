import type { Meta, StoryObj } from "@storybook/react";

import { ImageAvatar } from "../components/image-avatar";

const meta = {
  title: "ImageAvatar",
  component: ImageAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "ImageAvatar",
  },
} satisfies Meta<typeof ImageAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://plus.unsplash.com/premium_photo-1706800175869-af6e81c36de7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cindy",
    size: 40,
  },
};
