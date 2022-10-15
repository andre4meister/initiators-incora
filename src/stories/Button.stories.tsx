/* eslint-disable react/destructuring-assignment */
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

export const Template: ComponentStory<typeof Button> = (args: ButtonType) => (
  <Button {...args} handleOnClick={() => console.log('I was pushed')}>
    {args.children}
  </Button>
);
Template.args = {
  handleOnClick: () => console.log('I was pushed'),
  children: 'Button',
};

<Story
  name="Button"
  argTypes={{
    colorMode: {
      description: 'Changes button`s styles',
      defaultValue: 'light',
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    handleOnClick: {
      control: '',
    },
    children: {
      control: { type: 'text' },
      options: ['Button'],
    },
  }}
/>;
