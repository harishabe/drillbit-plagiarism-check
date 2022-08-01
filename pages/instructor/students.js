import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import _ from 'lodash';
import debouce from "lodash.debounce";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Grid, Tooltip, Skeleton, Button, TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import Instructor from '../../layouts/Instructor'
import {
    CardView,
    CommonTable,
    AvatarName,
    CreateDrawer,
    WarningDialog,
    SubTitle
} from '../../components'
import { IconButton } from '@mui/material';
import { EditIcon, DeleteIcon, DeleteWarningIcon, DownloadIcon, UploadIcon } from '../../assets/icon'
import StudentForm from './form/StudentForm';
import {
    DeleteStudent,
    DownloadTemplate,
    UploadFile
} from '../../redux/action/instructor/InstructorAction';
import { removeCommaWordEnd } from '../../utils/RegExp';

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


const Students = ({
    studentData,
    pageDetails,
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
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [clasId, setClasId] = useState(router.query.clasId);
    const [editStudent, setEditStudent] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    <AvatarName avatarText="S" title={student.id} color='#4795EE' />,
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
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.id?.props?.title);
            setShowDeleteWarning(true);
        }
    }

    const handleYesWarning = () => {
        // router.push(`/instructor/myclasstables?clasId=${clasId}`);
        router.replace('/instructor/myclasstables', `/instructor/myclasstables?clasId=${clasId}`);
        DeleteStudent(clasId, deleteRowData);
        console.log("datadatadata", clasId, deleteRowData)
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
            rowsId += rowItem?.id?.props?.title + ',';
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
        DownloadTemplate(clasId)
        setShow(true)
    }

    const handleSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        UploadFile(clasId, bodyFormData);
    }

    return (
        <React.Fragment>

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

            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 8 }></Grid>
                    <Grid item md={ 4 } xs container direction='row' justifyContent={ 'right' }>
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
                        { show ? '' :
                            <Tooltip title="Download Template">
                                <IconButton sx={ {
                                    position: 'absolute',
                                    padding: '7px',
                                    top: '118px',
                                    right: '50px'
                                } }
                                    onClick={ handleDownload }>
                                    { isLoadingTemplate ? <Skeleton sx={ { mt: 1 } } width={ 20 } /> : <DownloadIcon /> }
                                </IconButton>
                            </Tooltip>
                        }

                        { show &&
                            <>

                                <form>
                                    <label htmlFor="contained-button-file">
                                        <Input id="contained-button-file" onChange={ handleSubmit } multiple type="file" />
                                        <Button variant="contained" component="span" style={ {
                                            position: 'absolute',
                                            padding: '7px',
                                            top: '118px',
                                            right: '50px'
                                        } }>
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

                    { pageDetails?.totalPages > 1 &&
                        <div style={ { marginLeft: '35%', marginTop: '25px' } }>
                            <Pagination
                                count={ pageDetails?.totalPages }
                                onChange={ handlePagination }
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
    isLoadingTemplate: state?.instructorClasses?.isLoadingTemplate,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DeleteStudent: (ClasId, userId) => dispatch(DeleteStudent(ClasId, userId)),
        DownloadTemplate: (ClasId) => dispatch(DownloadTemplate(ClasId)),
        UploadFile: (ClasId, data) => dispatch(UploadFile(ClasId, data)),
    };
};

Students.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(Students);
