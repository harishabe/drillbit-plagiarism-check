import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import styled from 'styled-components';
import debouce from "lodash.debounce";
import { Grid, Tooltip, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import VpnKeyOffOutlinedIcon from '@mui/icons-material/VpnKeyOffOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { TextField, Pagination, IconButton, Button } from '@mui/material';
import Admin from './../../layouts/Admin';
import {
    CardView,
    CommonTable,
    MainHeading,
    StatusDot,
    BreadCrumb,
    ErrorBlock,
    AvatarName,
    CreateDrawer,
    WarningDialog,
    DialogModal,
    SubTitle
} from '../../components';
import {
    EditIcon,
    DeleteIcon,
    StatsIcon,
    DeleteWarningIcon,
    DownloadIcon,
    UploadIcon,
    AddMultipleIcon,
    AddPersonIcon
} from '../../assets/icon';
import {
    GetInstructorData,
    DeleteData,
    DeactivateData,
    DownloadTemplate,
    UploadFile
} from '../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import InstructorForm from './form/InstructorForm';
import InstructorStats from './instructor/InstructorStats';
import { removeCommaWordEnd } from '../../utils/RegExp';
import { INSTRUCTOR_NOT_FOUND } from '../../constant/data/ErrorMessage';

const columns = [
    // { id: 'user_id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'creationDate', label: 'Creation Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'stats', label: 'Statistics', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
]

function createData(user_id, name, email, creationDate, plagairism, grammar, status, stats, action) {
    return { user_id, name, email, creationDate, plagairism, grammar, status, stats, action }
};

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const UploadButtonAlign = styled('div')({
    marginBottom: '-5px',
    // marginLeft: '10px'
});

const Input = styled('input')({
    display: 'none',
});

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Instructors',
        link: '',
        active: true,
    },
];

const Instructor = ({
    pageDetails,
    GetInstructorData,
    DownloadTemplate,
    UploadFile,
    instructorData,
    DeleteData,
    DeactivateData,
    isLoading,
    isLoadingTemplate,
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [show, setShow] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });
    const [editInstructor, setEditInstructor] = useState(false);
    const [editInstructorData, setEditInstructorData] = useState('');

    useEffect(() => {
        GetInstructorData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        instructorData?.map((instructor) => {
            row =
                createData(
                    // <AvatarName avatarText="I" title={instructor.id} color='#4795EE' />,
                    instructor.id,
                    instructor.name,
                    instructor.username,
                    instructor.creation_date,
                    instructor.plagairism,
                    instructor.grammar,
                    <StatusDot color={instructor.status === 'active' ? '#38BE62' : '#E9596F'} title={instructor.status} />,
                    [{ 'component': <StatsIcon />, 'type': 'stats' }],
                    [{ 'component': <EditIcon />, 'type': 'edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete' },
                    {
                        'component': instructor.status === 'active' ? <VpnKeyOutlinedIcon /> : <VpnKeyOffOutlinedIcon />,
                        'type': instructor.status === 'active' ? 'lock' : 'unlock'
                    }
                    ]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [instructorData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
    };

    const handleYesWarning = () => {
        DeleteData(deleteRowData, paginationPayload);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleStatusWarning = () => {
        DeactivateData(statusRowData, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        console.log("rowData", rowData)
        if (icon === 'edit') {
            setEditInstructor(true);
            setEditInstructorData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.user_id);
            setShowDeleteWarning(true);
        } else if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.user_id,
                'status': 'INACTIVE'
            }
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.user_id,
                'status': 'ACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        } else if (icon === 'stats') {
            setInstructorId(rowData?.user_id);
            setShowDialogModal(true);
        }
    }

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    }

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    }

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

    const handleDownload = () => {
        DownloadTemplate()
        setShow(true)
    }

    const handleSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        UploadFile(bodyFormData);
    }

    const handleShow = (e, info) => {
        if (info?.title === 'Add Instructor') {
            setShowDialogModal(true);
        } else if (info?.title === 'Add Multiple Instructor') {
            router.push({ pathname: '/admin/addBulkInstructor' })
        }
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

            {
                showStatusWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message={"Are you sure, you want to " + statusMessage + "?"}
                    handleYes={handleStatusWarning}
                    handleNo={handleStatusCloseWarning}
                    isOpen={true}
                />
            }

            {
                showDialogModal &&
                <DialogModal
                    headingTitle="Instructor Statistics"
                    isOpen={true}
                    fullWidth="lg"
                    maxWidth="lg"
                    handleClose={handleCloseDialog}
                >
                    <InstructorStats instructorId={instructorId} />
                </DialogModal>
            }

            <AddButtonBottom>
                <CreateDrawer
                    options={[
                        {
                            icon: <AddPersonIcon />,
                            title: 'Add Instructor',
                            handleFromCreateDrawer: false
                        },
                        {
                            icon: <AddMultipleIcon />,
                            title: 'Add Multiple Instructor',
                            handleFromCreateDrawer: true
                        }]}
                    title="Add Instructor"
                    handleMultiData={handleShow}
                    isShowAddIcon={true}>
                    <InstructorForm />
                </CreateDrawer>
            </AddButtonBottom>

            {
                editInstructor &&
                <CreateDrawer
                    title="Edit Instructor"
                    isShowAddIcon={false}
                    showDrawer={editInstructor}
                >
                    <InstructorForm
                        editData={editInstructorData}
                    />
                </CreateDrawer>
            }

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8}>
                        <MainHeading title={`Instructors(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid item md={4} xs container direction='row' justifyContent={'right'}>
                        <TextField
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            }}
                        />
                        {show ? '' :
                            <Tooltip title="Download Template" arrow>
                                <IconButton sx={{
                                    position: 'absolute',
                                    padding: '7px',
                                    top: '118px',
                                    right: '230px'
                                }}
                                    onClick={handleDownload}>
                                    {isLoadingTemplate ? <Skeleton sx={{ mt: 1 }} width={20} /> : <DownloadIcon />}
                                </IconButton>
                            </Tooltip>
                        }

                    </Grid>
                    {show &&
                        <form>
                            <label htmlFor="contained-button-file">
                                <Input id="contained-button-file" onChange={handleSubmit} multiple type="file" />
                                <Button variant="contained" component="span" style={{ marginBottom: '10px' }}>
                                    <>
                                        <UploadIcon />
                                        <UploadButtonAlign>
                                            <SubTitle textColor='#fff' title='Upload File' />
                                        </UploadButtonAlign>
                                    </>
                                </Button>
                            </label>
                        </form>
                    }
                </Grid>
                {/* <SubTitle title='6/10 users' />
                <InfoIcon /> */}
            </Box>

            <CardView>
                <>
                    {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ marginLeft: '10px' }}>
                        <Tooltip title='Delete' arrow>
                            <IconButton onClick={deleteAllInstructor}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>}
                    <CommonTable
                        isCheckbox={true}
                        isSorting={true}
                        tableHeader={columns}
                        tableData={rows}
                        handleAction={handleAction}
                        handleTableSort={handleTableSort}
                        handleCheckboxSelect={handleCheckboxSelect}
                        handleSingleSelect={handleSingleSelect}
                        isLoading={isLoading}
                        charLength={17}
                        path=''
                    />

                    <div style={{ marginLeft: '45%', marginTop: '25px' }}>
                        <Pagination
                            count={pageDetails?.totalPages}
                            onChange={handleChange}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                </>
            </CardView>

        </React.Fragment>
    )
}


const mapStateToProps = (state) => ({
    pageDetails: state?.detailsData?.instructorData?.list?.page,
    instructorData: state?.detailsData?.instructorData?.list?.content,
    isLoading: state?.detailsData?.isLoading,
    isLoadingTemplate: state?.detailsData?.isLoadingTemplate,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInstructorData: (paginationPayload) => dispatch(GetInstructorData(paginationPayload)),
        DeactivateData: (data, paginationPayload) => dispatch(DeactivateData(data, paginationPayload)),
        DeleteData: (deleteRowData, paginationPayload) => dispatch(DeleteData(deleteRowData, paginationPayload)),
        DownloadTemplate: () => dispatch(DownloadTemplate()),
        UploadFile: (data) => dispatch(UploadFile(data)),
    };
};

Instructor.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);