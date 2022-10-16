/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/addon-docs/blocks';
import { ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Calendar from '../components/UI/Calendar/Calendar';

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

export const Template: ComponentStory<typeof Calendar> = (args) => {
  return <Calendar {...args} />;
};

Template.args = {};

<Story
  name="Calendar"
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
      options: 'Calendar placeholder',
    },
    required: {
      control: { type: 'radio' },
      options: [true, false],
    },
  }}
/>;
