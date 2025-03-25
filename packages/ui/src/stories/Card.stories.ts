import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../components/card/Card";

const meta = {
  title: "Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "Card",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalCard: Story = {
  args: {
    orientation: "vertical",
    childrenProps: [
      {
        type: "CardHeader",
        title: "햇살의화양연화",
        description: "11월 명예의 전당 크리에이터",
        startElement: {
          type: "Avatar",
          src: "https://image.ohousecdn.com/i/bucketplace-v2-development/profileImageUrl/171090759137950537.jpeg?w=512&h=512&c=c",
          name: "Nikki Roh",
        },
        endElement: {
          type: "Icon",
          id: "circle-plus",
        },
      },
      {
        type: "CardMedia",
        src: "https://prs.ohousecdn.com/apne2/content/uploads/cards/project/v1-342920862609408.jpg?w=3840&h=1352&c=c",
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "Text",
            variant: "subtitle2",
            content: "셀프 시공으로 리모델링 효과! 1년의 변화 기록(ft.살림법)",
          },
          {
            type: "Text",
            variant: "body2",
            content:
              "안녕하세요. 인생의 아름다운 순간을 기록하는 햇살의화양연화입니다. 이번 집들이는 입주 7년 차 제 집이 되고 난 뒤 작년 한 해 동안 셀프로 시공했던 공간의 변화들을 기록했어요.\n\n리모델링을 하기에는 아직 이른 감이 있었고 그렇다고 그대로 살자니 이것저것 안 본 눈으로 살아왔던 공간들이 눈에 밟히더라고요.",
            color: "#777",
            lineClamp: 3,
          },
        ],
      },
    ],
  },
};

export const VerticalCardWithFooter: Story = {
  args: {
    orientation: "vertical",
    childrenProps: [
      {
        type: "CardHeader",
        title: "botonglog",
        description: "보통의 이야기, 보통로그",
        startElement: {
          type: "Avatar",
          src: "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/users/profile_images/170359163903878044.jpeg?w=36&h=36&c=c",
          name: "botonglog",
        },
        endElement: {
          type: "Icon",
          id: "circle-plus",
        },
      },
      {
        type: "CardMedia",
        src: "https://prs.ohousecdn.com/apne2/content/uploads/cards/project/v1-349525045006400.jpg?w=960&h=642&c=c",
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "Text",
            variant: "subtitle2",
            content: "우드+패브릭으로 감성 충만하게 채운 4평 방 스타일링법",
          },
          {
            type: "Text",
            variant: "body2",
            content:
              "안녕하세요! 두 번째 집들이로 인사드려요. 여전히 같은 공간에서 좋아하는 것들로 방을 채우며 기록하고 있는 botonglog입니다.",
            color: "#777",
            lineClamp: 3,
          },
        ],
      },
      {
        type: "CardFooter",
        childrenProps: [
          {
            type: "Button",
            label: "팔로우",
            color: "blue",
            variant: "outlined",
            startElement: {
              type: "Icon",
              id: "plus",
            },
          },
        ],
      },
    ],
  },
};

export const HorizontalCard: Story = {
  args: {
    orientation: "horizontal",
    childrenProps: [
      {
        type: "CardMedia",
        src: "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/cards/projects/174125798219240480.png?w=3840&h=1352&c=c",
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "Avatar",
            src: "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/users/profile_images/167419639066373554.jpeg?w=512&h=512&c=c",
            name: "유집이",
          },
          {
            type: "Text",
            variant: "subtitle2",
            content: "오늘의집 3D 프로그램 100% 재현한 24평 신혼집",
          },
          {
            type: "Text",
            variant: "body2",
            content:
              "안녕하세요. 오늘의집과 인스타그램, 유튜브에서 활발히 활동 중인 유씨네 집 이야기의 유집이입니다. 지난 2022년 11월 책상 인테리어라는 주제를 시작으로 성장과 삶의 소소한 이야기, 공간의 긍정적인 요소들을 2년 넘도록 꾸준히",
            color: "#777",
            lineClamp: 3,
          },
        ],
      },
    ],
  },
};
