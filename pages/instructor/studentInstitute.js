import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Fab from '@mui/material/Fab';
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
import BeatLoader from "react-spinners/BeatLoader";
import AddIcon from '@mui/icons-material/Add';
import { removeCommaWordEnd } from '../../utils/RegExp';
import { PaginationValue } from '../../utils/PaginationUrl';
import {
    GetStudentList,
    EnrollStudent,
} from '../../redux/action/instructor/InstructorAction';

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
    GetStudentList,
    EnrollStudent,
    studentInstituteData,
    isLoadingInstitute,
    isLoadingEnroll,
    pageInstituteDetails,
    classId,
}) {
    const [data, setData] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetStudentList(paginationPayload)
    }, [paginationPayload]);

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

    const handleAction = (event, icon, rowData) => {
        if (icon === 'add') {
            EnrollStudent(classId, rowData?.email);
        }
    }

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload })
    }

    const handleCheckboxSelect = () => {
        let rowData = data?.map((rowItem) => {
            rowItem['isSelected'] = !rowItem['isSelected'];
            return rowItem;
        });
        setData(rowData);
    }

    const handleSingleSelect = (e, row) => {
        console.log("row", row)
        let rowData = data?.map((rowItem) => {
            if (rowItem?.id === row?.id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setData(rowData);
    }

    const addAllStudent = () => {
        let rowsEmail = '';
        _.filter(data, function (o) {
            if (o.isSelected === true) {
                return data;
            }
        }).map((rowItem) => {
            rowsEmail += rowItem?.email + ',';
        });
        EnrollStudent(classId, removeCommaWordEnd(rowsEmail));
    }

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    return (
        <>
            { _.find(data, function (o) { return o.isSelected === true }) && <div style={ { textAlign: 'left' } }>
                <Button variant="contained" onClick={ addAllStudent } >
                    { isLoadingEnroll ? <BeatLoader color="#fff" /> : `Add new student` }
                </Button>
            </div> }

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
                    onChange={ handlePagination }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    studentInstituteData: state?.instructorClasses?.instituteData?._embedded?.studentDTOList,
    pageInstituteDetails: state?.instructorClasses?.instituteData?.page,
    isLoadingInstitute: state?.instructorClasses?.isLoadingInstitute,
    isLoadingEnroll: state?.instructorClasses?.isLoadingEnroll,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudentList: (PaginationValue) => dispatch(GetStudentList(PaginationValue)),
        EnrollStudent: (ClasId, data) => dispatch(EnrollStudent(ClasId, data)),
    };
};

StudentInstitute.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(StudentInstitute);