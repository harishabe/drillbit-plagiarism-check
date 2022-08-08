import React, { useState, useEffect, useMemo } from 'react';
import debouce from "lodash.debounce";
import styled from 'styled-components'
import { Grid, Tooltip, Skeleton, Button, TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import {
    CardView,
    CommonTable,
    AvatarName,
    CreateDrawer,
    WarningDialog,
    SubTitle,
    ErrorBlock,
    DialogModal
} from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { removeCommaWordEnd } from '../../utils/RegExp';

const columns = [
    { id: 'id', label: 'Student ID' },
    { id: 'name', label: 'Student Name' },
    { id: 'email', label: 'Email' },
    { id: 'department', label: 'Department' },
    { id: 'section', label: 'Section' },
    { id: 'action', label: 'Action' },
]

function createData(id, name, email, department, section, action) {
    return { id, name, email, department, section, action }
}

function StudentInstitute({
    studentInstituteData,
    isLoadingInstitute,
    pageInstituteDetails,
    handleAction,
    handleTableSort,
    handleCheckboxSelect,
    handleSingleSelect,
    handlePaginationInstitute
}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentInstituteData?.map((student) => {
            row =
                createData(
                    student.id,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <AddIcon color="primary" />, 'type': 'add' }]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setData([...arr]);
    }, [studentInstituteData]);

    return (
        <>
            <CommonTable
                isCheckbox={ true }
                tableHeader={ columns }
                tableData={ data }
                charLength={ 10 }
                handleAction={ handleAction }
                handleTableSort={ handleTableSort }
                handleCheckboxSelect={ handleCheckboxSelect }
                handleSingleSelect={ handleSingleSelect }
                isLoading={ isLoadingInstitute }
                path=''
            />

            <div style={ { marginLeft: '40%', marginTop: '25px' } }>
                <Pagination
                    count={ pageInstituteDetails?.totalPages }
                    onChange={ handlePaginationInstitute }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </>
    )
}

StudentInstitute.layout = Instructor

export default StudentInstitute;