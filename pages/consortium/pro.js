import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Admin from "../../layouts/Admin";
import styled from 'styled-components';
import { makeStyles } from "@mui/styles";
import debouce from 'lodash.debounce';
import { Box, Pagination, Grid, TextField, Tooltip, Skeleton } from '@mui/material';
import {
    CreateDrawer,
    CardView,
    CommonTable,
    BreadCrumb,
    WarningDialog
} from '../../components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
    DownloadWarningIcon,
    AddMultipleIcon,
    AddPersonIcon
} from "../../assets/icon";
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import {
    DownloadCsv
} from '../../redux/action/common/Submission/SubmissionAction';
import {
    UploadFileDataClear
} from '../../redux/action/admin/AdminAction';
import RefForm from './form/RefForm';
import { PaginationContainer, AddButtonBottom, StyledButtonIcon } from '../../style/index';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from "../../utils/EndPoints";
import { BASE_URL_SUPER } from '../../utils/BaseUrl';
import { DOWNLOAD_CSV, WINDOW_PLATFORM } from '../../constant/data/Constant';
import { WARNING_MESSAGES } from '../../constant/data/Constant';
import { platform } from '../../utils/RegExp';

const SkeletonContainer = styled.div`
    margin-top: 7px;
    margin-right: 12px;
`;

const DownloadButton = styled.div`
    margin-top:-5.5px;
    margin-right:${platform === WINDOW_PLATFORM ? '25px' : '0px'};
`;

const useStyles = makeStyles(() => ({
    button: {
        margin: "6px 6px 0px 0px",
    },
}));

const columns = [
    { id: 'college_name', label: 'Institution name', maxWidth: 90 },
    { id: 'name', label: 'Co-ordinator name', maxWidth: 90 },
    { id: 'email', label: 'Email', maxWidth: 90 },
    { id: 'country', label: 'Location', maxWidth: 90 },
    { id: 'start_date', label: 'Start date', maxWidth: 90 },
    { id: 'expiry_date', label: 'Expiry date', maxWidth: 90 },
    { id: 'acc_manager', label: 'Account manager', maxWidth: 90 },
    { id: 'instructors', label: 'Users', maxWidth: 90 },
    { id: 'documents', label: 'Allocated documents', maxWidth: 90 },
    { id: 'used_documents', label: 'Submissions', maxWidth: 90 },
    { id: 'action', label: 'Action', maxWidth: 90 }
];

function createData(college_name, name, email, country, start_date, expiry_date, acc_manager, instructors, documents, used_documents, action, lid, students, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department, institution_type) {

    return { college_name, name, email, country, start_date, expiry_date, acc_manager, instructors, documents, used_documents, action, lid, students, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department, institution_type };
}

const Pro = ({
    GetExtremeRefData,
    DownloadCsv,
    pageDetails,
    extremeData,
    UploadFileDataClear,
    isLoading,
    isLoadingDownload
}) => {
    const router = useRouter()
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });
    const [editUser, setEditUser] = useState(false);
    const [editUserData, setEditUserData] = useState('');

    const ResellerBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/consortium/dashboard',
            active: false,
        },
        {
            name: `Pro(${pageDetails?.totalElements === undefined ? 0 : pageDetails?.totalElements})`,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        GetExtremeRefData(END_POINTS.CONSORTIUM_PRO, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        extremeData?.map((data) => {
            row =
                createData(
                    data.college_name,
                    data.name,
                    data.email,
                    data.country,
                    data.start_date,
                    data.expiry_date,
                    data.acc_manager,
                    data.instructors.toString(),
                    data.documents.toString(),
                    data.used_documents.toString(),
                    [
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><EditOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'edit', 'title': 'Edit'
                        },
                    ],
                    data.lid,
                    data.students.toString(),
                    data.state,
                    data.address,
                    data.designation,
                    data.phone,
                    data.created_date,
                    data.document_type,
                    data.grammar,
                    data.grammar_documents,
                    data.license_type,
                    data.product_type,
                    data.timeZone,
                    data.folpath,
                    data.department,
                    data.institution_type,
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [extremeData]);

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
    };

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            setEditUser(true);
            setEditUserData(rowData);
        }
    };

    const handleDrawerClose = (drawerClose) => {
        setEditUser(drawerClose);
    };

    const closeDrawerOnSuccess = (drawerClose) => {
        setEditUser(drawerClose);
    };

    const handleDownload = () => {
        setShowModal(true)
    };

    const handleDownloadYesWarning = () => {
        DownloadCsv(BASE_URL_SUPER + END_POINTS.CONSORTIUM_CSV_DOWNLOAD + 'proConsortiumCsv', DOWNLOAD_CSV.CONSORTIUM_PRO);
        setShowModal(false);
    };

    const handleDownloadCloseWarning = () => {
        setShowModal(false);
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

    const handleShow = (e, info) => {
        if (info?.title === "Create Multiple Pro Accounts") {
            UploadFileDataClear();
            router.push({ pathname: "/consortium/proBulkLicenseCreation" });
        }
    };

    return (
        <>
            <Grid container spacing={ 2 }>
                <Grid item md={ 9 } xs={ 9 }>
                    <BreadCrumb item={ ResellerBreadCrumb } />
                </Grid>
                <Grid item md={ 0.5 } xs={ 0.5 }>
                    <DownloadButton>
                        { extremeData?.length > 0 &&
                            isLoadingDownload ?
                            <SkeletonContainer>
                                <Skeleton width={ 35 } height={ 35 } />
                            </SkeletonContainer>
                            :
                            <Tooltip title="Download csv" arrow>
                                <StyledButtonIcon
                                    className={ classes.button }
                                    onClick={ handleDownload }
                                    variant="outlined"
                                    size="small"
                                >
                                    <FileDownloadOutlinedIcon fontSize="medium" />
                                </StyledButtonIcon>
                            </Tooltip>
                        }
                    </DownloadButton>
                </Grid>
                <Grid item md={ 2.5 } xs={ 2.5 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '100%' } }
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 7,
                                display: 'inline-flex',
                                fontWeight: 500
                            },
                        } }
                    />
                </Grid>
            </Grid>

            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <CommonTable
                        isCheckbox={ false }
                        isSorting={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        isLoading={ isLoading }
                        handleAction={ handleAction }
                        handleTableSort={ handleTableSort }
                    />
                </CardView>
            </Box>

            {
                editUser &&
                <CreateDrawer
                    title="Edit User"
                    isShowAddIcon={ false }
                    showDrawer={ editUser }
                        handleDrawerClose={ handleDrawerClose }
                        handleCloseDrawer={ closeDrawerOnSuccess }
                >
                    <RefForm
                        editData={ editUserData }
                    />
                </CreateDrawer>
            }

            <AddButtonBottom>
                <CreateDrawer
                    options={ [
                        {
                            icon: <AddPersonIcon />,
                            title: "Create Pro Account",
                            handleFromCreateDrawer: false,
                        },
                        {
                            icon: <AddMultipleIcon />,
                            title: "Create Multiple Pro Accounts",
                            handleFromCreateDrawer: true,
                        },
                    ] }
                    title="Create Pro Account"
                    handleMultiData={ handleShow }
                    isShowAddIcon={ true }
                >
                    <RefForm />
                </CreateDrawer>
            </AddButtonBottom>

            { showModal && (
                <WarningDialog
                    warningIcon={ <DownloadWarningIcon /> }
                    message={ WARNING_MESSAGES.DOWNLOAD }
                    handleYes={ handleDownloadYesWarning }
                    handleNo={ handleDownloadCloseWarning }
                    isOpen={ true }
                />
            ) }

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    page={ pageDetails?.number + 1 }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </>
    )
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.page,
    extremeData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url, paginationValue) => dispatch(GetExtremeRefData(url, paginationValue)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    };
};

Pro.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Pro);
