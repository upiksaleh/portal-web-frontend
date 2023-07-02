import type { Meta, StoryObj } from '@storybook/react';
import { UISearchInput } from './index';
import React from 'react';

const meta: Meta<typeof UISearchInput> = {
  component: UISearchInput,
  title: 'UI/Components/Input/SearchInput',
};
export default meta;

type Story = StoryObj<typeof UISearchInput>;

export const Default: Story = {
  render: (args) => <UISearchInput {...args} />,
  args: {
    onSubmit(value) {
      alert(value);
    },
  },
};
