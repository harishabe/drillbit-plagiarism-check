import React from 'react';

import { PieChart } from '../../components'

export default {
  title: 'Example/Graph',
  component: PieChart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <PieChart />;

export const Primary = Template.bind({});
