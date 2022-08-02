import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Admin from '../../layouts/Admin';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import debouce from "lodash.debounce";
import { Skeleton, TextField, Pagination, IconButton } from '@mui/material';
import {
    CardView,
    CommonTable,
    MainHeading,
    WarningDialog,
    AvatarName,
    DialogModal,
    CreateDrawer,
    ErrorBlock,
    BreadCrumb
} from '../../components';
import { EditIcon, DeleteIcon, StatsIcon, DeleteWarningIcon } from '../../assets/icon';
import { GetStudnetData, EditData, DeleteStudentData } from '../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import StudentStats from './student/StudentStats';
import { removeCommaWordEnd } from '../../utils/RegExp';
import StudentForm from './form/StudentForm';
import { STUDENT_NOT_FOUND } from '../../constant/data/ErrorMessage';

const columns = [
    { id: 'user_id', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'department', label: 'Department', minWidth: 170 },
    { id: 'section', label: 'Section', minWidth: 170 },
    { id: 'stats', label: 'Statistics', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
]

function createData(user_id, id, name, email, department, section, stats, action) {
    return { user_id, id, name, email, department, section, stats, action }
}

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Students',
        link: '',
        active: true,
    },
]

const Students = ({
    GetStudnetData,
    studentData,
    pageDetails,
    EditData,
    DeleteStudentData,
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    const [editStudent, setEditStudent] = useState(false);

    const [editStudentData, setEditStudentData] = useState('');


    useEffect(() => {
        GetStudnetData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    <AvatarName avatarText="S" title={student.student_id} color='#4795EE' />,
                    student.id,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <StatsIcon />, 'type': 'stats' }],
                    [{ 'component': <EditIcon />, 'type': 'edit' }, { 'component': <DeleteIcon />, 'type': 'delete' }]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [studentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        DeleteStudentData(deleteRowData, paginationPayload);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        const student = studentData.filter((s) => {
            if (s.student_id === rowData?.user_id?.props?.title) {
                return s.id;
            }
        });
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);

        } else if (icon === 'delete') {
            setDeleteRowData(student[0].id);
            setShowDeleteWarning(true);

        } else if (icon === 'stats') {
            setStudentId(rowData.id);
            setShowDialogModal(true);
        }
    }

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    }


    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

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
        let rowData = rows?.map((rowItem) => {
            rowItem['isSelected'] = !rowItem['isSelected'];
            return rowItem;
        });
        setRows(rowData);
    }

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.user_id?.props?.title === row?.user_id?.props?.title) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    }

    const deleteAllInstructor = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.user_id?.props?.title + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    }

    return (
        <React.Fragment>

            {showDeleteWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message="Are you sure you want to delete ?"
                    handleYes={handleYesWarning}
                    handleNo={handleCloseWarning}
                    isOpen={true}
                />}

            {editStudent &&
                <CreateDrawer
                    title="Edit Instructor"
                    isShowAddIcon={false}
                    showDrawer={editStudent}
                >
                    <StudentForm
                        editData={editStudentData}
                    />
                </CreateDrawer>}

            {showDialogModal &&
                <>
                    <DialogModal
                        headingTitle="Students Statistics"
                        isOpen={true}
                        fullWidth="lg"
                        maxWidth="lg"
                        handleClose={handleCloseDialog}
                    >
                        <StudentStats studentId={studentId} />
                    </DialogModal>
                </>
            }

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={IntegrationBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={12}>
                        <MainHeading title={`Students(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid
                        item
                        md={2}
                        xs={12}
                        container
                        direction='row'
                        justifyContent={'right'}
                    >
                        <TextField
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                        {/* <SubTitle title='6/10 users &nbsp;' />
                        <InfoIcon /> */}
                    </Grid>
                </Grid>
            </Box>

            <CardView>
                <>
                    {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
                        <IconButton onClick={deleteAllInstructor}>
                            <DeleteIcon />
                        </IconButton>
                    </div>}
                    { studentData?.length > 0 ? 
                        <CommonTable
                            isCheckbox={ true }
                            tableHeader={ columns }
                            tableData={ rows }
                            handleAction={ handleAction }
                            handleTableSort={ handleTableSort }
                            handleCheckboxSelect={ handleCheckboxSelect }
                            handleSingleSelect={ handleSingleSelect }
                            isLoading={ isLoading }
                            charLength={ 20 }
                            path=''
                        />
                        : <ErrorBlock message={ STUDENT_NOT_FOUND } />
                    }

                    { pageDetails?.totalPages > '1' &&
                        <div style={ { marginLeft: '35%', marginTop: '25px' } }>
                            <Pagination
                                count={ pageDetails?.totalPages }
                                onChange={ handleChange }
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                            />
                        </div> 
                    }

                </>
            </CardView>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => ({
    pageDetails: state?.detailsData?.studentData?.page,
    studentData: state?.detailsData?.studentData?._embedded?.studentDTOList,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudnetData: (paginationPayload) => dispatch(GetStudnetData(paginationPayload)),
        EditData: (data) => dispatch(EditData(data)),
        DeleteStudentData: (deleteRowData, paginationPayload) => dispatch(DeleteStudentData(deleteRowData, paginationPayload))
    };
};

Students.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);