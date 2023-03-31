import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Admin from "../../layouts/Admin";
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { Box, Pagination, Grid, TextField, Tooltip, Skeleton, IconButton } from '@mui/material';
import {
    CreateDrawer,
    CardView,
    CommonTable,
    BreadCrumb,
} from '../../components';
import {
    EditIcon,
    DownloadIcon
} from '../../assets/icon';
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import {
    DownloadCsv
} from '../../redux/action/common/Submission/SubmissionAction';
import ExtremeForm from './form/ExtremeForm';
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
`;

const SkeletonContainer = styled.div`
    margin-top: 7px;
    margin-right: 12px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
    margin-right:${platform === WINDOW_PLATFORM ? '25px' : '0px'};
`;

const columns = [
    { id: 'college_name', label: 'Institution name' },
    { id: 'name', label: 'Co-ordinator name' },
    { id: 'email', label: 'Email' },
    { id: 'country', label: 'Location' },
    { id: 'start_date', label: 'Start date' },
    { id: 'expiry_date', label: 'Expiry date' },
    { id: 'acc_manager', label: 'Account manager' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'students', label: 'Students' },
    { id: 'documents', label: 'Allocated documents' },
    { id: 'used_documents', label: 'Submissions' },
    { id: 'action', label: 'Action' }
];

function createData(college_name, name, email, acc_manager, country, start_date, expiry_date, documents, used_documents, instructors, students, action, lid, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department, institution_type) {

    return { college_name, name, email, acc_manager, country, start_date, expiry_date, documents, used_documents, instructors, students, action, lid, state, address, designation, phone, created_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department, institution_type };
}

const Extreme = ({
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
            link: '/consortium/dashboard',
            active: false,
        },
        {
            name: `Extreme(${pageDetails?.totalElements === undefined ? 0 : pageDetails?.totalElements})`,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        GetExtremeRefData(END_POINTS.CONSORTIUM_EXTREME, paginationPayload);
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
                    data.instructors,
                    data.students,
                    data.documents,
                    data.used_documents,
                    [
                        { 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' }
                    ],
                    data.lid,
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
        DownloadCsv(BASE_URL_SUPER + END_POINTS.CONSORTIUM_CSV_DOWNLOAD + 'extremeConsortiumCsv', DOWNLOAD_CSV.CONSORTIUM_EXTREME);
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
                                    size="large"
                                    onClick={ handleDownload }>
                                    <DownloadIcon />
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
                        charLength={ 6 }
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
                    <ExtremeForm
                        editData={ editUserData }
                    />
                </CreateDrawer>
            }

            <AddButtonBottom>
                <CreateDrawer
                    title="Create Extreme Account"
                    isShowAddIcon={ true }
                >
                    <ExtremeForm />
                </CreateDrawer>
            </AddButtonBottom>

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
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

Extreme.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Extreme);
