import type { Meta } from '@storybook/react';
import { UIContainer } from './container';

const Story: Meta<typeof UIContainer> = {
  component: UIContainer,
  title: 'UI/Components/Container',
  argTypes:{
    className:{
      type: 'string'
    }
  }
};
export default Story;

const Template = (args) => <UIContainer {...args}>CONTAINER</UIContainer>;

export const Default = Template.bind({
  className:'bg-red-900'
});

Default.args = {
  className:'bg-red-900'
};
