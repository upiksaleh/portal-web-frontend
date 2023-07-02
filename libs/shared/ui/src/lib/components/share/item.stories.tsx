import type { Meta, StoryObj } from '@storybook/react';
import { UIShareItem } from './index';
import React from 'react';

const meta: Meta<typeof UIShareItem> = {
  component: UIShareItem,
  title: 'UI/Components/Share',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UIShareItem>;

export const Item: Story = {
  render: (args) => <UIShareItem {...args} />,
  args: {
    url: 'https://google.com',
    title: 'Google',
  },
};
