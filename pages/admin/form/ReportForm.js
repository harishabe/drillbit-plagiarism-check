import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { FormComponent, DialogModal } from '../../../components';
import { ReportsData, ViewAndDownloadData, DownloadInstructorStudentData,ViewDownloadSubmissiondData } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/admin-report-form.json';
import ReportView from '../report/ReportView';

const ReportForm = ({
    ReportsData,
    ViewAndDownloadData,
    ViewDownloadSubmissiondData,
    DownloadInstructorStudentData,
    assignmentViewDownloadData,
    classesViewDownloadData,
    submissionsViewDownloadData,
    reportData,
    isLoading,
    isLoadingViewReport,
    isLoadingSubmission
}) => {
    const router = useRouter();
    const [formData, setFormData] = useState();
    const [reportDownloadData, setReportDownloadData] = useState();
    const [showDialogModal, setShowDialogModal] = useState(false);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    }

    const convertData = (str) => {
        let date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), month, day].join("-");
    }

    const onSubmit = (data) => {
        let fromDate = convertData(data?.fromDate);
        let toDate = convertData(data?.toDate);
        let url = data?.report?.name + '?page=' + 0 + '&size=' + 25 + '&instructor=' + data?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        ViewAndDownloadData(url);
        setShowDialogModal(true);
        setReportDownloadData(data);
    };

    const handleDownload = () => {
        let fromDate = convertData(reportDownloadData?.fromDate);
        let toDate = convertData(reportDownloadData?.toDate);
        let url = reportDownloadData?.report?.name + 'Report?&instructor=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        DownloadInstructorStudentData(url);
    }

    const onSend = (data) => {
        let fromDate = convertData(reportDownloadData?.fromDate);
        let toDate = convertData(reportDownloadData?.toDate);
        let url = reportDownloadData?.report?.name + 'Report?email=' + data.username + '&instructor=' + reportDownloadData?.instructor?.username + '&from=' + fromDate + '&to=' + toDate;
        ViewDownloadSubmissiondData(url)
        // setShowDialogModal(true)
    }

    const reportName = reportDownloadData?.report?.name

    useEffect(() => {
        ReportsData();
    }, []);

    useEffect(() => {
        let reportType = [];
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'report') {
                reportData?.reportTypes?.map((item) => {
                    reportType.push({ 'name': item })
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
    }, [reportData])

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
                        isLoadingViewReport={ isLoadingViewReport }
                        handleDownload={ handleDownload }
                        onSend={ onSend }
                        isLoadingSubmission={isLoadingSubmission}
                    />
                    </DialogModal>
                </>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formData?.map((field, i) => (
                        <Grid md={5.8} style={{ marginLeft: '8px' }}>
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
    isLoading: state?.adminReport?.isLoading,
    isLoadingSubmission: state?.adminReport?.isLoadingSubmissionReport,
    isLoadingViewReport: state?.adminReport?.isLoadingViewReport,
    assignmentViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.assignmentsReportList,
    classesViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.classesReportList,
    submissionsViewDownloadData: state?.adminReport?.viewDownloadData?._embedded?.submissionsReportList,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ReportsData: () => dispatch(ReportsData()),
        ViewAndDownloadData: (data) => dispatch(ViewAndDownloadData(data)),
        ViewDownloadSubmissiondData: (data) => dispatch(ViewDownloadSubmissiondData(data)),
        DownloadInstructorStudentData: (url) => dispatch(DownloadInstructorStudentData(url)),        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
