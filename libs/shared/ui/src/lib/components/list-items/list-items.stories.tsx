import type { Meta, StoryObj } from '@storybook/react';
import { UIListItems } from './index';
import React from 'react';

const meta: Meta<Omit<typeof UIListItems, 'itemComponent'>> = {
  component: UIListItems,
  title: 'UI/Components/ListItems',
  tags: ['autodocs'],
  argTypes: {
    itemComponent: {
      control: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof UIListItems>;

export const Default: Story = {
  render: (args) => <UIListItems {...args} />,
  args: {
    view: 'list',
    items: [{ title: '1' }, { title: '2' }],
    itemComponent: ({ data, view }) => {
      return <div className="border p-5 flex">Title-{data.title}</div>;
    },
  },
};
