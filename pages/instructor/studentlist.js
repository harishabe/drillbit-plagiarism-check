import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import Instructor from '../../layouts/Instructor'
import {
    CardView,
    CommonTable,
    AvatarName,
    BreadCrumb,
    MainHeading,
} from '../../components'
import { EditIcon, DeleteIcon, LockIcon } from '../../assets/icon'

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/instructor/dashboard',
        active: false,
    },
    {
        name: 'My Folder',
        link: '/instructor/myfolder',
        active: false,
    },
    {
        name: 'Data Science',
        link: '',
        active: true,
    },
]

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
]

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
    }
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
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
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
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
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
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
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
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
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
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
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
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
]

const actionIcon = [<EditIcon />, <DeleteIcon />, <LockIcon />]

const StudentList = () => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                        <MainHeading title='Data Science(6)' />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
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
    )
}

StudentList.layout = Instructor

export default StudentList
