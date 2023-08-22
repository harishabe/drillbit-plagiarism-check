import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { FormComponent, DialogModal, WarningDialog } from '../../../../components';
import { DownloadWarningIcon } from "../../../../assets/icon";
import {
    ReportsData,
    ViewAndDownloadData,
    DownloadInstructorStudentData,
    ViewDownloadSubmissiondData,
    ViewDownloadSubmissiondClearData
} from '../../../../redux/action/admin/AdminAction';
import { WARNING_MESSAGES } from "../../../../constant/data/Constant";
import FormJson from '../../../../constant/form/admin-report-form.json';
import ReportView from '../report/ReportView';
import { convertDate } from '../../../../utils/RegExp';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';

const ReportForm = ({
    ReportsData,
    ViewAndDownloadData,
    ViewDownloadSubmissiondData,
    ViewDownloadSubmissiondClearData,
    DownloadInstructorStudentData,
    assignmentViewDownloadData,
    classesViewDownloadData,
    submissionsViewDownloadData,
    reportViewSubmissionResponse,
    reportData,
    pageDetails,
    isLoading,
    isLoadingDownload,
    isLoadingViewReport,
    isLoadingSubmission
}) => {
    const [formData, setFormData] = useState();
    const [reportDownloadData, setReportDownloadData] = useState();
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
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

    const fromDate = useWatch({
        control,
        name: 'fromDate',
    });

    const toDate = useWatch({
        control,
        name: 'toDate',
    });

    const handleChange = (event, value) => {
        event.preventDefault();
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + reportDownloadData?.report?.name + '?page=' + (value - 1) + '&size=' + PaginationValue?.size + '&instructor=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
    };

    const onSubmit = (data) => {
        let fromDate = convertDate(data?.fromDate);
        let toDate = convertDate(data?.toDate);
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + data?.report?.name + '?page=' + PaginationValue?.page + '&size=' + PaginationValue?.size + '&instructor=' + data?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
        setShowDialogModal(true);
        setReportDownloadData(data);
    };

    const handleDownload = () => {
        setShowModal(true)
    };

    const handleDownloadYesWarning = () => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + reportDownloadData?.report?.name + 'Report?&instructor=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
        DownloadInstructorStudentData(url, reportDownloadData?.report?.name);
        setShowModal(false);
    };

    const handleDownloadCloseWarning = () => {
        setShowModal(false);
    };

    const onSend = (data) => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + reportDownloadData?.report?.name + 'Report?email=' + data.username + '&instructor=' + reportDownloadData?.instructor?.userId + '&from=' + fromDate + '&to=' + toDate;
        ViewDownloadSubmissiondData(url);
    };

    useEffect(() => {
        if (reportViewSubmissionResponse === 200) {
            setOpen(false);
            ViewDownloadSubmissiondClearData()
        }
    }, [reportViewSubmissionResponse]);


    useEffect(() => {
        if (new Date(fromDate).getTime()) {
            let fields = FormJson?.map((item) => {
                if (item?.name === 'toDate') {
                    item['minDate'] = fromDate;
                }
                return item;
            });
            setFormData(fields);
        }
        if (new Date(toDate).getTime()) {
            let fields = FormJson?.map((item) => {
                if (item?.name === 'fromDate') {
                    item['maxDate'] = toDate;
                }
                return item;
            });
            setFormData(fields);
        }
    }, [fromDate, toDate]);

    const reportName = reportDownloadData?.report?.name;

    useEffect(() => {
        ReportsData(BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS);
    }, []);

    useEffect(() => {
        let reportType = [];
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
                    reportData?.instructorList?.unshift({ 'name': 'all', 'username': 'all', 'id': 'all' });
                    reportData?.instructorList?.map((item) => {
                        userList.push({ 'name': item?.username, 'userName': item?.name, 'userId': item?.id });
                    });
                    formItem['options'] = userList;
                }
                return formItem;
            });
            setFormData(formList);
        }
    }, [reportData]);

    return (
        <>
            {showDialogModal &&
                <>
                    <DialogModal
                    headingTitle={ `Reports (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : ''})` }
                        isOpen={true}
                        fullWidth="xl"
                        maxWidth="xl"
                        handleClose={handleCloseDialog}
                    >
                        <ReportView
                            reportName={reportName}
                            assignmentViewDownloadData={assignmentViewDownloadData}
                            classesViewDownloadData={classesViewDownloadData}
                            submissionsViewDownloadData={submissionsViewDownloadData}
                            handleDownload={handleDownload}
                            open={open}
                            setOpen={setOpen}
                            closeSendDialog={closeSendDialog}
                            onSend={onSend}
                            handleChange={handleChange}
                            pageDetails={pageDetails}
                            isLoadingViewReport={isLoadingViewReport}
                            isLoadingSubmission={isLoadingSubmission}
                            isLoadingDownload={isLoadingDownload}
                        />
                    </DialogModal>
                </>
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formData?.map((field, i) => (
                        <Grid key={field?.name} md={5.8} xs={12} style={{ marginLeft: '8px' }}>
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                <FormComponent
                                    key={i}
                                    field={field}
                                    control={control}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    reportData: state?.adminReport?.reportData,
    pageDetails: state?.adminReport?.viewDownloadData?.page,
    isLoading: state?.adminReport?.isLoading,
    isLoadingDownload: state?.adminReport?.isLoadingDownload,
    isLoadingSubmission: state?.adminReport?.isLoadingSubmissionReport,
    isLoadingViewReport: state?.adminReport?.isLoadingViewReport,
    assignmentViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.assignmentsReportList,
    classesViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.classesReportList,
    submissionsViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.submissionsReportList,
    reportViewSubmissionResponse: state?.adminReport?.reportViewSubmission?.status,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ReportsData: (url) => dispatch(ReportsData(url)),
        ViewAndDownloadData: (data) => dispatch(ViewAndDownloadData(data)),
        ViewDownloadSubmissiondData: (data) => dispatch(ViewDownloadSubmissiondData(data)),
        ViewDownloadSubmissiondClearData: () => dispatch(ViewDownloadSubmissiondClearData()),
        DownloadInstructorStudentData: (url, type) => dispatch(DownloadInstructorStudentData(url, type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
