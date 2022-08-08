import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import _ from 'lodash';
import debouce from "lodash.debounce";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Grid, Tooltip, Skeleton, Button, TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
import Instructor from '../../../layouts/Instructor'
import {
    CardView,
    CommonTable,
    AvatarName,
    CreateDrawer,
    WarningDialog,
    SubTitle,
    ErrorBlock,
    DialogModal
} from '../../../components';
import { EditIcon, DeleteIcon, DeleteWarningIcon, DownloadIcon, UploadIcon } from '../../../assets/icon';
import StudentForm from '../form/StudentForm';
import {
    DeleteStudent,
    DownloadTemplate,
    UploadFile,
    GetStudentList
} from '../../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import StudentInstitute from '../studentInstitute';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { STUDENT_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const AddButtonBottom = styled.div`
    position:absolute;
    bottom: 30px;
    right:30px;
`;

const UploadButtonAlign = styled('div')({
    marginBottom: '-5px',
    marginLeft: '10px'
});

const Input = styled('input')({
    display: 'none',
});

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


const Students = ({
    studentData,
    GetStudentList,
    studentInstituteData,
    isLoadingInstitute,
    pageDetails,
    pageInstituteDetails,
    isLoadingStudent,
    DeleteStudent,
    handlePagination,
    DownloadTemplate,
    isLoadingTemplate,
    UploadFile
}) => {

    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [show, setShow] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editStudent, setEditStudent] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    student.id,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <EditIcon />, 'type': 'edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete' },
                    ]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [studentData]);

    const handleAction = (event, icon, rowData) => {
        console.log('rowData', rowData);
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.id);
            setShowDeleteWarning(true);
        }
    }

    const handleYesWarning = () => {
        DeleteStudent(router.query.clasId, deleteRowData);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

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
            if (rowItem?.id?.props?.title === row?.id?.props?.title) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    }

    const deleteAllStudent = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    }

    /** search implementation using debounce concepts */

    // const handleSearch = (event) => {
    //     if (event.target.value !== '') {
    //         paginationPayload['search'] = event.target.value;
    //         setPaginationPayload({ ...paginationPayload, paginationPayload });
    //     } else {
    //         delete paginationPayload['search'];
    //         setPaginationPayload({ ...paginationPayload, paginationPayload });
    //     }
    // }

    // const debouncedResults = useMemo(() => {
    //     return debouce(handleSearch, 300);
    // }, []);

    // useEffect(() => {
    //     return () => {
    //         debouncedResults.cancel();
    //     };
    // });

    /** end debounce concepts */


    const handleDownload = () => {
        DownloadTemplate(router.query.clasId)
        setShow(true)
    }

    useEffect(() => {
        GetStudentList(paginationPayload)
    }, [paginationPayload]);

    const handleShow = () => {
        // GetStudentList(paginationPayload)
        setShowDialogModal(true)
    }

    const handleSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        UploadFile(router.query.clasId, bodyFormData);
    }

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    }

    const handlePaginationInstitute = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    return (
        <React.Fragment>

            { showDialogModal &&
                <>
                    <DialogModal
                        headingTitle={ "Institute Students List" }
                        isOpen={ true }
                        fullWidth="lg"
                        maxWidth="lg"
                        handleClose={ handleCloseDialog }
                    >
                        <StudentInstitute
                            studentInstituteData={ studentInstituteData }
                            isLoadingInstitute={ isLoadingInstitute }
                            pageInstituteDetails={ pageInstituteDetails }
                            handleAction={ handleAction }
                            handleTableSort={ handleTableSort }
                            handleCheckboxSelect={ handleCheckboxSelect }
                            handleSingleSelect={ handleSingleSelect }
                            handlePaginationInstitute={ handlePaginationInstitute }
                        />
                    </DialogModal>
                </>
            }
            {
                showDeleteWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message="Are you sure you want to delete ?"
                    handleYes={handleYesWarning}
                    handleNo={handleCloseWarning}
                    isOpen={true}
                />
            }

            <AddButtonBottom>
                <CreateDrawer
                    title="Add Student"
                    isShowAddIcon={true}>
                    <StudentForm />
                </CreateDrawer>
            </AddButtonBottom>

            {
                editStudent &&
                <CreateDrawer
                    title="Edit Student"
                    isShowAddIcon={ false }
                    showDrawer={ editStudent }
                >
                    <StudentForm
                        editData={ editStudentData }
                    />
                </CreateDrawer>
            }

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8}></Grid>
                    <Grid item md={4} xs container direction='row' justifyContent={'right'}>
                        {/* <TextField
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={ {
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            } }
                        /> */}
                        {show ? '' :
                            <Tooltip title="Download Template">
                                <IconButton sx={{
                                    position: 'absolute',
                                    padding: '7px',
                                    top: '118px',
                                    right: '50px'
                                }}
                                    onClick={handleDownload}>
                                    {isLoadingTemplate ? <Skeleton sx={{ mt: 1 }} width={20} /> : <DownloadIcon />}
                                </IconButton>
                            </Tooltip>
                        }

                        {show &&
                            <>

                                <form>
                                    <label htmlFor="contained-button-file">
                                        <Input id="contained-button-file" onChange={handleSubmit} multiple type="file" />
                                        <Button variant="contained" component="span" style={{
                                            position: 'absolute',
                                            padding: '7px',
                                            top: '118px',
                                            right: '50px'
                                        }}>
                                            <>
                                                <UploadIcon />
                                                <UploadButtonAlign>
                                                    <SubTitle textColor='#fff' title='Upload File' />
                                                </UploadButtonAlign>
                                            </>
                                        </Button>
                                    </label>
                                </form>

                            </>
                        }

                    </Grid>
                </Grid>
            </Box>


            <CardView>
                <>
                    {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
                        <IconButton onClick={deleteAllStudent}>
                            <DeleteIcon />
                        </IconButton>
                    </div>}

                    <Tooltip title="Add student from list">
                        <IconButton sx={ {
                            position: 'absolute',
                            padding: '7px',
                            top: '118px',
                            right: '100px'
                        } }
                            onClick={ handleShow }>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>

                    {studentData?.length > 0 ?
                        <CommonTable
                            isCheckbox={true}
                            tableHeader={columns}
                            tableData={rows}
                            handleAction={handleAction}
                            handleTableSort={handleTableSort}
                            handleCheckboxSelect={handleCheckboxSelect}
                            handleSingleSelect={handleSingleSelect}
                            isLoading={isLoadingStudent}
                            charLength={17}
                            path=''
                        />
                        : <ErrorBlock message={STUDENT_NOT_FOUND} />
                    }


                    {pageDetails?.totalPages > 1 &&
                        <div style={{ marginLeft: '35%', marginTop: '25px' }}>
                            <Pagination
                                count={pageDetails?.totalPages}
                                onChange={handlePagination}
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
    studentData: state?.instructorClasses?.studentData?._embedded?.studentDTOList,
    pageDetails: state?.instructorClasses?.studentData?.page,
    isLoadingTemplate: state?.instructorClasses?.isLoadingTemplate,
    studentInstituteData: state?.instructorClasses?.instituteData?._embedded?.studentDTOList,
    pageInstituteDetails: state?.instructorClasses?.instituteData?.page,
    isLoadingInstitute: state?.instructorClasses?.isLoadingInstitute,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DeleteStudent: (ClasId, userId) => dispatch(DeleteStudent(ClasId, userId)),
        DownloadTemplate: (ClasId) => dispatch(DownloadTemplate(ClasId)),
        UploadFile: (ClasId, data) => dispatch(UploadFile(ClasId, data)),
        GetStudentList: (PaginationValue) => dispatch(GetStudentList(PaginationValue)),
    };
};

Students.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(Students);