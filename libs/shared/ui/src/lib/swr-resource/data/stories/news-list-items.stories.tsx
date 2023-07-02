import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import UISwrResourceDataNewsListItems from '../news-list-items';

const meta: Meta<Omit<typeof UISwrResourceDataNewsListItems, 'itemComponent'>> =
  {
    component: UISwrResourceDataNewsListItems,
    title: 'UI/SwrResource/Data/NewsListItems',
    tags: ['autodocs'],
    argTypes: {
      itemComponent: {
        control: false,
      },
    },
  };
export default meta;

type Story = StoryObj<typeof UISwrResourceDataNewsListItems>;

export const Default: Story = {
  render: (args) => <UISwrResourceDataNewsListItems {...args} />,
  args: {},
};
