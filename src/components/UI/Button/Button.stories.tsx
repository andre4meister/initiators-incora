/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/addon-docs/blocks';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonType } from 'types/typesForUI';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (args: ButtonType) => {
  return <Button {...args} />;
};

Template.args = {
  handleOnClick: () => console.log('I was pushed'),
  children: 'Button',
};

<Story
  name="Button"
  argTypes={{
    children: {
      control: { type: 'text' },
    },
    handleOnClick: {
      control: '',
    },
  }}
/>;
