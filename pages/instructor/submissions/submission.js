import React from 'react';
import Instructor from '../../../layouts/Instructor';
import { CardView, CommonTable, AvatarName } from '../../../components';
import { EditIcon, DeleteIcon } from '../../../assets/icon';

const InstructorBreadCrumb = [
  {
    name: 'Dashboard',
    link: '/instructor/dashboard',
    active: false,
  },
  {
    name: 'My classes',
    link: '/instructor/myclasses',
    active: false,
  },
  {
    name: 'Java',
    link: '/instructor/myclasstables',
    active: false,
  },
  {
    name: 'Submissions',
    link: '/instructor/mysubmissions',
    active: true,
  },
];

const columns = [
  { id: 'id', label: 'Student ID' },
  { id: 'STname', label: 'Student Name' },
  { id: 'PAname', label: 'Paper Name' },
  { id: 'file', label: 'Original File' },
  { id: 'lang', label: 'Language' },
  { id: 'grammer', label: 'Grammer' },
  { id: 'similarity', label: 'Similarity' },
  { id: 'paperid', label: 'Paper Id' },
  { id: 'date', label: 'Submission Date' },
  { id: 'action', label: 'Actions' },
];

function createData(
  id,
  STname,
  PAname,
  file,
  lang,
  grammer,
  similarity,
  paperid,
  date,
  action
) {
  return {
    id,
    STname,
    PAname,
    file,
    lang,
    grammer,
    similarity,
    paperid,
    date,
    action,
  };
}

const rows = [
  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    'UPSC',
    '22',
    'English',
    'NA',
    '70%',
    '223421',
    '4/03/2022',
    [<EditIcon />, <DeleteIcon />]
  ),

  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    'UPSC',
    '22',
    'English',
    'NA',
    '70%',
    '223421',
    '4/03/2022',
    [<EditIcon />, <DeleteIcon />]
  ),

  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    'UPSC',
    '22',
    'English',
    'NA',
    '70%',
    '223421',
    '4/03/2022',
    [<EditIcon />, <DeleteIcon />]
  ),

  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    'UPSC',
    '22',
    'English',
    'NA',
    '70%',
    '223421',
    '4/03/2022',
    [<EditIcon />, <DeleteIcon />]
  ),

  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    'UPSC',
    '22',
    'English',
    'NA',
    '70%',
    '223421',
    '4/03/2022',
    [<EditIcon />, <DeleteIcon />]
  ),

  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    'UPSC',
    '22',
    'English',
    'NA',
    '70%',
    '223421',
    '4/03/2022',
    [<EditIcon />, <DeleteIcon />]
  ),
];

const actionIcon = [<EditIcon />, <DeleteIcon />];

const Submission = () => {
  return (
    <React.Fragment>
      <CardView>
        <CommonTable
          isCheckbox={true}
          tableHeader={columns}
          tableData={rows}
          actionIcon={actionIcon}
          isActionIcon={true}
        />
      </CardView>
    </React.Fragment>
  );
};

Submission.layout = Instructor;

export default Submission;
