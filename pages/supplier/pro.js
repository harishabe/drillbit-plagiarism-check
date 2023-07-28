import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Admin from "../../layouts/Admin";
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { Box, Pagination, Grid, TextField, Tooltip, Skeleton, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
    CreateDrawer,
    CardView,
    CommonTable,
    BreadCrumb
} from '../../components';
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import {
    DownloadCsv
} from '../../redux/action/common/Submission/SubmissionAction';
import RefForm from './form/RefForm';
import { PaginationContainer } from '../../style/index';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from "../../utils/EndPoints";
import { BASE_URL_SUPER } from '../../utils/BaseUrl';
import { DOWNLOAD_CSV, WINDOW_PLATFORM } from '../../constant/data/Constant';
import { platform } from '../../utils/RegExp';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index: 999;
`;

const SkeletonContainer = styled.div`
    margin-top: 7px;
    margin-right: 12px;
`;

const DownloadButton = styled.div`
    margin-right:${platform === WINDOW_PLATFORM ? '25px' : '0px'};
`;

const columns = [
    { id: 'college_name', label: 'Institution name', maxWidth: 145 },
    { id: 'name', label: 'Username', maxWidth: 130 },
    { id: 'email', label: 'Email', maxWidth: 130 },
    { id: 'country', label: 'Location', maxWidth: 90 },
    { id: 'start_date', label: 'Start date', maxWidth: 110 },
    { id: 'expiry_date', label: 'Expiry date', maxWidth: 110 },
    { id: 'acc_manager', label: 'Account manager', maxWidth: 120 },
    { id: 'used_documents', label: 'Submissions', maxWidth: 80 },
    { id: 'action', label: 'Action', maxWidth: 75 }
];

function createData(college_name, name, email, acc_manager, country, start_date, expiry_date, used_documents, action, lid, instructors, students, documents, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department, institution_type) {

    return { college_name, name, email, acc_manager, country, start_date, expiry_date, used_documents, action, lid, instructors, students, documents, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department, institution_type };
}

const Pro = ({
    GetExtremeRefData,
    DownloadCsv,
    pageDetails,
    extremeData,
    isLoading,
    isLoadingDownload
}) => {

    const [rows, setRows] = useState([]);
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
            link: '/supplier/dashboard',
            active: false,
        },
        {
            name: `Pro(${pageDetails?.totalElements === undefined ? 0 : pageDetails?.totalElements})`,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        GetExtremeRefData(END_POINTS.RESELLER_PRO, paginationPayload);
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
                    data.acc_manager,
                    data.country,
                    data.start_date,
                    data.expiry_date,
                    data.used_documents.toString(),
                    [
                        { 'component': <EditOutlinedIcon fontSize='small' />, 'type': 'edit', 'title': 'Edit' }
                    ],
                    data.lid,
                    data.instructors,
                    data.students,
                    data.documents,
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

    const handleCloseDrawer = (drawerClose) => {
        setEditUser(drawerClose);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_SUPER + END_POINTS.RESELLER_CSV_DOWNLOAD + 'proResellerCsv', DOWNLOAD_CSV.RESELLER_PRO);
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
            <Grid container spacing={ 2 }>
                <Grid item md={ 8.5 } xs={ 5 }>
                    <BreadCrumb item={ ResellerBreadCrumb } />
                </Grid>
                <Grid item md={ 0.5 } xs={ 7 } style={ { textAlign: 'right' } }>
                    <DownloadButton> 
                            { extremeData?.length > 0 &&
                                isLoadingDownload ?
                                <SkeletonContainer>
                                    <Skeleton width={ 40 } />
                                </SkeletonContainer>
                                :
                                <Tooltip title="Download csv" arrow>
                                    <IconButton
                                        aria-label="download-file"
                                    size="small"
                                        onClick={ handleDownload }>
                                    <FileDownloadOutlinedIcon fontSize='medium' />
                                    </IconButton>
                                </Tooltip>
                            }
                    </DownloadButton>
                </Grid>
                <Grid item md={ 3 } xs={ 7 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '100%' } }
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 5,
                                display: 'inline-flex',
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
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <RefForm
                        editData={ editUserData }
                    />
                </CreateDrawer>
            }

            <AddButtonBottom>
                <CreateDrawer
                    title="Create Pro Account"
                    isShowAddIcon={ true }
                >
                    <RefForm />
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
    };
};

Pro.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Pro);
