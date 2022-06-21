import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Admin from '../../layouts/Admin';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import debouce from "lodash.debounce";
import { Skeleton, TextField, Pagination } from '@mui/material';
import { BreadCrumb } from './../../components';
import {
    CardView,
    CommonTable,
    MainHeading,
    WarningDialog,
    AvatarName,
} from '../../components';
import { EditIcon, DeleteIcon, DeleteWarningIcon } from '../../assets/icon';
import { GetStudnetData, EditData, DeleteStudentData } from '../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';

const columns = [
    { id: 'id', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'department', label: 'Department', minWidth: 170 },
    { id: 'section', label: 'Section', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 100 },
]

function createData(id, name, email, department, section, action) {
    return { id, name, email, department, section, action }
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
    const [deleteRowData, setDeleteRowData] = useState('');

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });


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
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <EditIcon />, 'type': 'edit' }, { 'component': <DeleteIcon />, 'type': 'delete' }]
                );
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

    /** search implementation using debounce concepts */

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

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            EditData();
        } else if (icon === 'delete') {
            const student = studentData.filter((s) => {
                if (s.student_id === rowData?.id?.props?.title) {
                    return s.id;
                }
            });
            setDeleteRowData(student[0].id);
            setShowDeleteWarning(true);
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
                        <MainHeading title={'Students' + '(' + pageDetails?.totalElements + ')'} />
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
                {isLoading ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </> :
                    <>
                        <CommonTable
                            isCheckbox={true}
                            tableHeader={columns}
                            tableData={rows}
                            handleAction={handleAction}
                            handleTableSort={handleTableSort}
                            isActionIcon={true}
                            charLength={20}
                            path=''
                        />
                        <div style={{ marginLeft: '35%', marginTop: '25px' }}>
                            <Pagination
                                count={pageDetails?.totalPages}
                                onChange={handleChange}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                            />
                        </div>
                    </>
                }

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