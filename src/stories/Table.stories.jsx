import React from 'react';

import { Button } from './Button';
import { CommonTable } from '../../components'
import { RefreshTimerIcon, EditIcon, DeleteIcon } from '../../assets/icon';


function createData(id, name, email, department, section) {
  return { id, name, email, department, section };
}

export default {
  title: 'Example/Table',
  component: CommonTable,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <>
  <CommonTable
    tableHeader={args.columns}
    tableData={args.rows}
    actionIcon={args.actionIcon}
  />
</>;

export const Primary = Template.bind({});
Primary.args = {
  rows: [
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A')
  ],
  columns: [
    { id: 'id', label: 'Student ID', minWidth: 100 },
    { id: 'name', label: 'Student Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'department', label: 'Department', minWidth: 100 },
    { id: 'section', label: 'Section', minWidth: 100 },
  ],
  actionIcon: [<RefreshTimerIcon />, <EditIcon />, <DeleteIcon />]
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
