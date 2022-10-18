/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/addon-docs/blocks';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonType } from 'types/ButtonTypes';
import Button from '../components/UI/Button/Button';

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
  colorMode: 'light',
  forStorybook: true,
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
    colorMode: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  }}
/>;
