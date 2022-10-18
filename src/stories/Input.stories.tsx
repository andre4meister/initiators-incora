/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/addon-docs/blocks';
import { ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputType } from 'types/InputTypes';
import Input from '../components/UI/Input/Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const Template: ComponentStory<typeof Input> = (args: InputType) => {
  return <Input {...args} />;
};

Template.args = {
  placeholder: 'Input placeholder',
  required: false,
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => console.log(e),
  value: '',
  type: 'text',
  colorMode: 'light',
  forStorybook: true,
};

<Story
  name="Input"
  argTypes={{
    value: {
      options: 'input field',
      control: { type: 'text' },
    },
    type: {
      options: ['email', 'text', 'password'],
      control: { type: 'radio' },
    },
    handleOnChange: {
      control: '',
    },
    placeholder: {
      control: { type: 'text' },
      options: 'Input placeholder',
    },
    required: {
      control: { type: 'radio' },
      options: [true, false],
    },
    colorMode: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  }}
/>;
