import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { FormComponent, DialogModal } from '../../../../components';
import { ReportsData, ViewAndDownloadData, DownloadInstructorStudentData, ViewDownloadSubmissiondData } from '../../../../redux/action/admin/AdminAction';
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

    const handleChange = (event, value) => {
        event.preventDefault();
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + reportDownloadData?.report?.name + '?page=' + (value - 1) + '&size=' + PaginationValue?.size + '&instructor=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
    };

    const onSubmit = (data) => {
        let fromDate = convertDate(data?.fromDate);
        let toDate = convertDate(data?.toDate);
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + data?.report?.name + '?page=' + PaginationValue?.page + '&size=' + PaginationValue?.size + '&instructor=' + data?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
        setShowDialogModal(true);
        setReportDownloadData(data);
    };

    const handleDownload = () => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + reportDownloadData?.report?.name + 'Report?&instructor=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        DownloadInstructorStudentData(url, reportDownloadData?.report?.name);
    };

    const onSend = (data) => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        let url = BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + reportDownloadData?.report?.name + 'Report?email=' + data.username + '&instructor=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        ViewDownloadSubmissiondData(url);
    };

    useEffect(() => {
        if (reportViewSubmissionResponse === 200) {
            setOpen(false);
        }
    }, [reportViewSubmissionResponse]);

    const reportName = reportDownloadData?.report?.name;

    useEffect(() => {
        ReportsData(BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS);
    }, []);

    useEffect(() => {
        let reportType = [];
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'report') {
                reportData?.reportTypes?.map((item) => {
                    reportType.push({ 'name': item });
                });
                formItem['options'] = reportType;
            }
            if (formItem.name === 'instructor') {
                reportData?.instructorList.unshift({ 'name': 'All', 'username': 'all' });
                formItem['options'] = reportData?.instructorList;
            }
            return formItem;
        });
        setFormData(formList);
    }, [reportData]);

    return (
        <>
            {showDialogModal &&
                <>
                    <DialogModal
                        headingTitle="Reports"
                        isOpen={true}
                        fullWidth="xl"
                        maxWidth="xl"
                        handleClose={handleCloseDialog}
                    >
                        <ReportView
                            reportName={ reportName }
                            assignmentViewDownloadData={ assignmentViewDownloadData }
                            classesViewDownloadData={ classesViewDownloadData }
                            submissionsViewDownloadData={ submissionsViewDownloadData }
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
        DownloadInstructorStudentData: (url, type) => dispatch(DownloadInstructorStudentData(url, type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
