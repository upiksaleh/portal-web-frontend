import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UISwrResourceDataNewsCarouselHeadline } from '../news-carousel-headline';

const meta: Meta<typeof UISwrResourceDataNewsCarouselHeadline> = {
  component: UISwrResourceDataNewsCarouselHeadline,
  title: 'UI/SwrResource/Data/NewsCarouselHeadline',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof UISwrResourceDataNewsCarouselHeadline>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full h-full" style={{ height: 800 }}>
      <UISwrResourceDataNewsCarouselHeadline {...args} />
    </div>
  ),
  args: {},
};
