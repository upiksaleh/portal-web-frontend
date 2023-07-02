import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UIViewNewsListItemSkeleton } from '../list-item-skeleton';
import { UIListItems } from '../../../components';

const meta: Meta<typeof UIViewNewsListItemSkeleton> = {
  component: UIViewNewsListItemSkeleton,
  title: 'UI/View/News/ListItemSkeleton',
  argTypes: {
    isWebNews: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof UIViewNewsListItemSkeleton>;

export const Single: Story = {
  render: (args) => <UIViewNewsListItemSkeleton {...args} />,
  args: {
    view: 'list',
  },
};

export const List: Story = {
  render: (args) => (
    <UIListItems
      view={args.view}
      items={5}
      itemComponent={({ view }) => <UIViewNewsListItemSkeleton {...args} />}
    />
  ),
  args: {
    view: 'list',
  },
};
