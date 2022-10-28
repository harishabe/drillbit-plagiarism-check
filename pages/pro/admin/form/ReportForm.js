import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { FormComponent, DialogModal } from '../../../../components';
import { ReportsData, ViewAndDownloadData, DownloadInstructorStudentData, ViewDownloadSubmissiondData } from '../../../../redux/action/admin/AdminAction';
import FormJson from '../../../../constant/form/pro-admin-report-form.json';
import ReportView from '../report/ReportView';
import { convertDate } from '../../../../utils/RegExp';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
import { BASE_URL_PRO } from '../../../../utils/BaseUrl';

const ReportForm = ({
    ReportsData,
    ViewAndDownloadData,
    ViewDownloadSubmissiondData,
    DownloadInstructorStudentData,
    folderViewDownloadData,
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
        let url = BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS_DOWNLOAD_LIST + reportDownloadData?.report?.name + '?page=' + (value - 1) + '&size=' + PaginationValue?.size + '&user=' + reportDownloadData?.user?.name + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
    };

    const onSubmit = (data) => {
        let fromDate = convertDate(data?.fromDate);
        let toDate = convertDate(data?.toDate);
        let url = BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS_DOWNLOAD_LIST + data?.report?.name + '?page=' + PaginationValue?.page + '&size=' + PaginationValue?.size + '&user=' + data?.user?.name + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
        setShowDialogModal(true);
        setReportDownloadData(data);
    };

    const handleDownload = () => {
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        let url = BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS_DOWNLOAD_LIST + reportDownloadData?.report?.name + 'Report?page=' + PaginationValue?.page + '&size=' + PaginationValue?.size + '&user=' + reportDownloadData?.user?.name + '&from=' + fromDate + '&to=' + toDate;
        DownloadInstructorStudentData(url, reportDownloadData?.report?.name);
    };

    const onSend = (data) => {
        console.log('datadatadatadata-pro',data);
        console.log('reportDownloadDatareportDownloadDatareportDownloadData-pro',reportDownloadData)
        let fromDate = convertDate(reportDownloadData?.fromDate);
        let toDate = convertDate(reportDownloadData?.toDate);
        let url = BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS_DOWNLOAD_LIST + reportDownloadData?.report?.name + 'Report?email=' + data.username + '&user=' + reportDownloadData?.user?.name + '&from=' + fromDate + '&to=' + toDate;
        ViewDownloadSubmissiondData(url);
    };

    useEffect(() => {
        if (reportViewSubmissionResponse === 200) {
            setOpen(false);
        }
    }, [reportViewSubmissionResponse]);

    const reportName = reportDownloadData?.report?.name;

    useEffect(() => {
        ReportsData(BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS);
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
                if (formItem.name === 'user') {
                    reportData?.users.unshift({ 'name': 'All', 'username': 'all' });
                    reportData?.users?.map((item) => {
                        userList.push({ 'name': item?.username, 'userName': item?.name });
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
                        headingTitle="Reports"
                        isOpen={true}
                        fullWidth="xl"
                        maxWidth="xl"
                        handleClose={handleCloseDialog}
                    >
                        <ReportView
                            reportName={reportName}
                            folderViewDownloadData={folderViewDownloadData}
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formData?.map((field, index) => (
                        <Grid key={index} md={5.8} xs={12} style={{ marginLeft: '8px' }}>
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                <FormComponent
                                    key={index}
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
    folderViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.foldersDTOList,
    submissionsViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.submissionsDTOList,
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
