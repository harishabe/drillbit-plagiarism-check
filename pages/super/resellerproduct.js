import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, TextField, Box, Skeleton, Tooltip } from '@mui/material';
import debouce from 'lodash.debounce';
import SuperAdmin from './../../layouts/SuperAdmin';
import styled from 'styled-components';
import {
    BreadCrumb,
    CreateDrawer,
    CardView,
    CommonTable,
    WarningDialog
} from './../../components';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { DownloadWarningIcon } from "../../assets/icon";
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import {
    DownloadCsv,
} from '../../redux/action/common/Submission/SubmissionAction';
import ResellerForm from './form/ResellerForm';
import { PaginationContainer, AddButtonBottom, StyledButtonIcon } from '../../style/index';
import Pagination from '@mui/material/Pagination';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from '../../utils/EndPoints';
import { platform } from '../../utils/RegExp';
import { BASE_URL_SUPER } from '../../utils/BaseUrl';
import { DOWNLOAD_CSV, WINDOW_PLATFORM, WARNING_MESSAGES } from '../../constant/data/Constant';

const SkeletonContainer = styled.div`
    margin-left: 95px
`;

const columns = [
    { id: 'lid', label: 'LID', maxWidth: 135 },
    { id: 'name', label: 'Name', maxWidth: 105 },
    { id: 'email', label: 'Email', maxWidth: 170 },
    { id: 'college_name', label: 'Institution name', maxWidth: 170 },
    { id: 'country', label: 'Location', maxWidth: 115 },
    { id: 'used_documents', label: 'Used submissions', maxWidth: 105 },
    { id: 'action', label: 'Action', maxWidth: 115 }
];

function createData(lid, name, email, college_name, country, used_documents, action, state, address, designation, phone, expiry_date, timeZone
) {
    return {
        lid, name, email, college_name, country, used_documents, action, state, address, designation, phone, expiry_date, timeZone
    };
}

const ResellerProduct = ({
    GetExtremeRefData,
    DownloadCsv,
    pageDetails,
    refData,
    isLoading,
    isLoadingDownload,
}) => {
    const router = useRouter();
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

    const RefBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/super/dashboard',
            active: false,
        },
        {
            name: `Reseller (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : ''})`,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        GetExtremeRefData(END_POINTS.SUPER_ADMIN_RESELLER, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        refData?.map((data) => {
            row =
                createData(
                    data.lid,
                    data.name,
                    data.email,
                    data.college_name,
                    data.country,
                    data.used_documents,
                    [
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><EditOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'edit', 'title': 'Edit'
                        },
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><ArrowForwardOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'nextPath', 'title': 'Next'
                        }
                    ],
                    data.state,
                    data.address,
                    data.designation,
                    data.phone,
                    data.expiry_date,
                    data.timeZone,
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [refData]);

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
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/super/resellerExtreme',
                query: {
                    name: rowData?.name,
                    licenseId: rowData?.lid,
                }
            });
        }
    };

    const handleCloseDrawer = (drawerClose) => {
        setEditUser(drawerClose);
    };

    const handleDownload = () => {
        setShowModal(true)
    };

    const handleDownloadYesWarning = () => {
        DownloadCsv(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_RESELLER_LIST + 'resellersCsv', DOWNLOAD_CSV.RESELLER_LISTS);
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

    return (
        <>
            <Grid container spacing={ 1 }>
                <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                    <BreadCrumb item={ RefBreadCrumb } />
                </Grid>
                <Grid item md={ 2.2 } xs={ 2.2 } style={ { textAlign: 'right' } }>
                    { refData?.length > 0 &&
                        isLoadingDownload ?
                        <SkeletonContainer>
                            <Skeleton width={ 30 } height={ 40 } />
                        </SkeletonContainer>
                        :
                        <Tooltip title="Download csv" arrow>
                            <StyledButtonIcon
                                onClick={ handleDownload }
                                variant="outlined"
                                size="small"
                            >
                                <FileDownloadOutlinedIcon fontSize="medium" />
                            </StyledButtonIcon>
                        </Tooltip>
                    }
                </Grid>
                <Grid item md={ 2.8 } xs={ 2.8 } style={ { textAlign: 'right' } }>
                    <TextField
                        placeholder='Search by LID, Institution name'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 7,
                                display: 'inline-flex',
                                fontWeight: 500,
                                width: '225px'
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
                    isShowAddIcon={ false }
                    showDrawer={ editUser }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <ResellerForm
                        editData={ editUserData }
                    />
                </CreateDrawer>
            }

            { showModal && (
                <WarningDialog
                    warningIcon={ <DownloadWarningIcon /> }
                    message={ WARNING_MESSAGES.DOWNLOAD }
                    handleYes={ handleDownloadYesWarning }
                    handleNo={ handleDownloadCloseWarning }
                    isOpen={ true }
                />
            ) }

            <AddButtonBottom>
                <CreateDrawer
                    title="Add Reseller Account"
                    isShowAddIcon={ true }
                >
                    <ResellerForm />
                </CreateDrawer>
            </AddButtonBottom>

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
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.page,
    refData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url, paginationPayload) => dispatch(GetExtremeRefData(url, paginationPayload)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

ResellerProduct.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(ResellerProduct);