import React from 'react';

import { Heading, MainHeading } from '../../components';

export default {
  title: 'Example/Typography',
  component: Heading,
};

const Template = (args) => <Heading color="#000" title="DrillBit" {...args} />;

export const HeadingText = Template.bind({});

HeadingText.args = {
  color: '#000'
};

