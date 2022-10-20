/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/addon-docs/blocks';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toggle, { ToggleProps } from './Toggle';

export default {
  title: 'Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

export const Template: ComponentStory<typeof Toggle> = (args: ToggleProps) => (
  <Toggle {...args} />
);

Template.args = {
  isToggle: false,
  handleOnChange: () => console.log('toggled'),
};

<Story
  name="Toggle"
  argTypes={{
    isToggle: {
      options: [true, false],
      control: { type: 'toggle' },
    },
    handleOnChange: {
      control: '',
    },
  }}
/>;
