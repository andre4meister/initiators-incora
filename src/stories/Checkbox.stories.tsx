/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/addon-docs/blocks';
import { ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox, { CheckBoxProps } from '../components/UI/CheckBox/CheckBox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Template: ComponentStory<typeof Checkbox> = (
  args: CheckBoxProps,
) => <Checkbox {...args} />;

Template.args = {
  isChecked: false,
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => console.log(e),
  label: '',
};

<Story
  name="Checkbox"
  argTypes={{
    isChecked: {
      options: [true, false],
      control: { type: 'toggle' },
    },
    label: {
      control: { type: 'text' },
    },
    handleOnChange: {
      control: '',
    },
  }}
/>;
