import React, { useEffect, useState } from 'react';
import SuperAdmin from '../../layouts/SuperAdmin';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Autocomplete, Skeleton, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormComponent, DialogModal, CardView, Heading, BreadCrumb } from '../../components';
import { ReportsData, ViewAndDownloadData, DownloadInstructorStudentData, ViewDownloadSubmissiondData, ClearReportData } from '../../redux/action/admin/AdminAction';
import { DropdownList, GlobalSearch, GlobalSearchClear } from '../../redux/action/super/SuperAdminAction';
import FormJson from '../../constant/form/admin-report-form.json';
import ReportView from './report/ReportView';
import EmailForm from './form/EmailForm';
import { convertDate } from '../../utils/RegExp';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from '../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../utils/BaseUrl';

const SuperAdminBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/super/dashboard',
        active: false,
    },
    {
        name: 'Reports',
        link: '',
        active: true,
    },
];

const Reports = ({
    ReportsData,
    ViewAndDownloadData,
    ViewDownloadSubmissiondData,
    DownloadInstructorStudentData,
    assignmentViewDownloadData,
    classesViewDownloadData,
    submissionsViewDownloadData,
    foldersViewList,
    submissionsViewList,
    reportViewSubmissionResponse,
    reportData,
    pageDetails,
    isLoading,
    isLoadingDownload,
    isLoadingViewReport,
    isLoadingSubmission,
    isLoadingList,
    DropdownList,
    dpList,
    GlobalSearch,
    globalData,
    GlobalSearchClear,
    ClearReportData
}) => {
    const [formData, setFormData] = useState();
    const [list, setList] = useState();
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');
    const [licenseId, setLicenseId] = useState('');
    const [role, setRole] = useState('');
    const [reportDownloadData, setReportDownloadData] = useState();
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [emailSearch, setEmailSearch] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
    });

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    };

    const closeSendDialog = () => {
        setOpen(false);
    };

    const closeSearchDialog = () => {
        setEmailSearch(false);
        GlobalSearchClear()

    };

    const handleChange = (event, value) => {
        event.preventDefault();
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
        if (role === 'extreme') {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + reportDownloadData?.report?.name + '?page=' + (value - 1) + '&size=' + PaginationValue?.size + '&instructor=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
            ViewAndDownloadData(url);
        } else {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + reportDownloadData?.report?.name + '?page=' + (value - 1) + '&size=' + PaginationValue?.size + '&user=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
            ViewAndDownloadData(url);
        }
    };

    const onSubmit = (data) => {
        let fromDate = convertDate(data?.fromDate);
        let toDate = convertDate(data?.toDate);
        if (role === 'extreme') {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + data?.report?.name + '?page=' + PaginationValue?.page + '&size=' + PaginationValue?.size + '&instructor=' + data?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
            ViewAndDownloadData(url);
        } else {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + data?.report?.name + '?page=' + PaginationValue?.page + '&size=' + PaginationValue?.size + '&user=' + data?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
            ViewAndDownloadData(url);
        }
        setShowDialogModal(true);
        setReportDownloadData(data);
    };

    const handleDownload = () => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        if (role === 'extreme') {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + reportDownloadData?.report?.name + 'Report?&instructor=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
            DownloadInstructorStudentData(url, reportDownloadData?.report?.name);
        } else {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + reportDownloadData?.report?.name + 'Report?&user=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
            DownloadInstructorStudentData(url, reportDownloadData?.report?.name);
        }
    };

    const onSend = (data) => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        if (role === 'extreme') {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + reportDownloadData?.report?.name + 'Report?email=' + data.username + '&instructor=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
            ViewDownloadSubmissiondData(url);
        } else {
            let url = BASE_URL_SUPER + `/${role}/license/${licenseId}/` + reportDownloadData?.report?.name + 'Report?email=' + data.username + '&user=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
            ViewDownloadSubmissiondData(url);
        }
    };

    const handleShow = () => {
        setEmailSearch(true)
    };

    const onSearch = (data) => {
        GlobalSearch(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REPORT_SEARCH + data?.email);
    };

    useEffect(() => {
        if (reportViewSubmissionResponse === 200) {
            setOpen(false);
        }
    }, [reportViewSubmissionResponse]);

    const reportName = reportDownloadData?.report?.name;

    useEffect(() => {
        DropdownList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REPOSITORY_INSTITUTE)
        GlobalSearchClear()
    }, []);

    useEffect(() => {
        let InstitutionList = [];
        dpList && dpList?.map((item) => {
            InstitutionList.push({ 'id': item?.lid, 'name': item?.college_name, 'role': item?.product_type });
        });
        setList(InstitutionList);
    }, [dpList]);

    useEffect(() => {
        dpList && list?.map((item) => {
            if (inputValue === item?.name) {
                ReportsData(BASE_URL_SUPER + `/${item?.role}/license/${item?.id}/reports`);
                setLicenseId(item?.id)
                setRole(item?.role)
            }
        })
    }, [dpList, inputValue]);

    if (inputValue === '' && reportData !== '') {
        ClearReportData()
    }

    useEffect(() => {
        let reportType = [];
        let InstructorList = [];
        let userList = [];
        if (reportData !== undefined) {
            let formList = FormJson?.map((formItem) => {
                if (formItem.name === 'report') {
                    reportData?.reportTypes?.map((item) => {
                        reportType.push({ 'name': item });
                    });
                    formItem['options'] = reportType;
                }
                if (formItem.name === 'instructor') {
                    if (reportData?.instructorList) {
                        reportData?.instructorList.unshift({ 'name': 'all', 'username': 'all', 'id': 'all' });
                        reportData?.instructorList?.map((item) => {
                            InstructorList.push({ 'name': item?.username, 'username': item?.name, 'userId': item?.id });
                        });
                        formItem['options'] = InstructorList;
                    }
                    else if (reportData?.users) {
                        reportData?.users.unshift({ 'name': 'all', 'username': 'all', 'id': 'all' });
                        reportData?.users?.map((item) => {
                            userList.push({ 'name': item?.username, 'username': item?.name, 'userId': item?.id });
                        });
                        formItem['options'] = userList;
                    } else {
                        formItem['options'] = []
                    }
                }
                return formItem;
            });
            setFormData(formList);
        }
    }, [reportData]);

    return (
        <>
            <Grid container spacing={ 2 }>
                <Grid item md={ 7 } xs={ 5 }>
                    <BreadCrumb item={ SuperAdminBreadCrumb } />
                </Grid>
                <Grid item md={ 5 } xs={ 12 } style={ { display: 'inline-flex' } }>
                    <Autocomplete
                        size='small'
                        sx={ { width: '500px', mr: 1 } }
                        value={ value }
                        onChange={ (event, newValue) => {
                            setValue(newValue);
                        } }
                        inputValue={ inputValue }
                        onInputChange={ (event, newInputValue) => {
                            setInputValue(newInputValue);
                        } }
                        options={ list !== undefined && list?.map((item) => {
                            return item?.name
                        }) }
                        renderInput={ (params) => <TextField { ...params } label="Institution list" /> }
                    />
                    <Tooltip title="Search" arrow>
                        <IconButton
                            onClick={ handleShow }>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Box sx={ { mt: 3, flexGrow: 1 } }>
                <CardView>
                    <Heading title='Reports' />
                    { showDialogModal &&
                        <>
                            <DialogModal
                                headingTitle="Reports"
                                isOpen={ true }
                                fullWidth="xl"
                                maxWidth="xl"
                                handleClose={ handleCloseDialog }
                            >
                                <ReportView
                                    reportName={ reportName }
                                role={ role }
                                    assignmentViewDownloadData={ assignmentViewDownloadData }
                                    classesViewDownloadData={ classesViewDownloadData }
                                    submissionsViewDownloadData={ submissionsViewDownloadData }
                                foldersViewList={ foldersViewList }
                                submissionsViewList={ submissionsViewList }
                                    handleDownload={ handleDownload }
                                    open={ open }
                                    setOpen={ setOpen }
                                    closeSendDialog={ closeSendDialog }
                                    onSend={ onSend }
                                    handleChange={ handleChange }
                                    pageDetails={ pageDetails }
                                    isLoadingViewReport={ isLoadingViewReport }
                                    isLoadingSubmission={ isLoadingSubmission }
                                    isLoadingDownload={ isLoadingDownload }
                                />
                            </DialogModal>
                        </>
                    }

                    { emailSearch &&
                        <EmailForm
                            onSearch={ onSearch }
                            closeSearchDialog={ closeSearchDialog }
                            globalData={ globalData }
                            isLoadingList={ isLoadingList }
                        />
                    }

                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <Grid container>
                            { formData?.map((field, i) => (
                                <Grid key={ field?.name } md={ 5.8 } xs={ 12 } style={ { marginLeft: '8px' } }>
                                    { isLoading ? (
                                        <Skeleton />
                                    ) : (
                                        <FormComponent
                                            key={ i }
                                            field={ field }
                                            control={ control }
                                        />
                                    ) }
                                </Grid>
                            )) }
                        </Grid>
                    </form>
                </CardView>
            </Box>
        </>
    );
};

const mapStateToProps = (state) => ({
    reportData: state?.adminReport?.reportData,
    pageDetails: state?.adminReport?.viewDownloadData?.page,
    isLoading: state?.adminReport?.isLoading,
    isLoadingList: state?.superAdmin?.isLoadingList,
    isLoadingDownload: state?.adminReport?.isLoadingDownload,
    isLoadingSubmission: state?.adminReport?.isLoadingSubmissionReport,
    isLoadingViewReport: state?.adminReport?.isLoadingViewReport,
    assignmentViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.assignmentsReportList,
    classesViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.classesReportList,
    submissionsViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.submissionsReportList,
    submissionsViewList: state?.adminReport?.viewDownloadData?._embedded?.submissionsDTOList,
    foldersViewList: state?.adminReport?.viewDownloadData?._embedded?.foldersDTOList,
    reportViewSubmissionResponse: state?.adminReport?.reportViewSubmission?.status,
    dpList: state?.superAdmin?.ListSuccess,
    globalData: state?.superAdmin?.globalData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ReportsData: (url) => dispatch(ReportsData(url)),
        ClearReportData: () => dispatch(ClearReportData()),
        ViewAndDownloadData: (data) => dispatch(ViewAndDownloadData(data)),
        ViewDownloadSubmissiondData: (data) => dispatch(ViewDownloadSubmissiondData(data)),
        DownloadInstructorStudentData: (url, type) => dispatch(DownloadInstructorStudentData(url, type)),
        DropdownList: (url) => dispatch(DropdownList(url)),
        GlobalSearch: (url) => dispatch(GlobalSearch(url)),
        GlobalSearchClear: () => dispatch(GlobalSearchClear()),
    };
};
Reports.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Reports);