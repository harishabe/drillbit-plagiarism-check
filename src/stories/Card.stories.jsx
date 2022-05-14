import React from 'react';

import { Button } from './Button';
import { CardView } from '../../components'

export default {
  title: 'Example/Card',
  component: CardView,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <><CardView>fdsgsfg</CardView></>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
