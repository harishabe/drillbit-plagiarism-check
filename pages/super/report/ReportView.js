import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { Grid, Tooltip } from '@mui/material';
import {
    CommonTable,
    FormComponent,
    DialogModal,
    SimilarityStatus
} from '../../../components';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FormJson from '../../../constant/form/report-submission-form.json';
import { EXTREME, PRO } from '../../../constant/data/Constant';
import { formatDate } from '../../../utils/RegExp';
import { PaginationContainer, StyledButtonIcon } from '../../../style/index';

const DownloadButton = styled.div`
    position:fixed;
    top: 14px;
    right:80px;
`;

const assignmentsColumns = [
    { id: 'reportass_id', label: 'Assignment ID', maxWidth: 100 },
    { id: 'reportass_name', label: 'Assignment Name', maxWidth: 170 },
    { id: 'reportemail', label: 'Email', maxWidth: 170 },
    { id: 'reportcreated', label: 'Created Date', maxWidth: 170 },
    { id: 'reportendDate', label: 'End Date', maxWidth: 170 },
    { id: 'reportclass_id', label: 'Class ID', maxWidth: 170 },
    { id: 'reportclass_name', label: 'Class Name', maxWidth: 170 },
    { id: 'reportcount', label: 'Submission count', maxWidth: 100 },
];

const classesColumns = [
    { id: 'reportcls_id', label: 'Class ID', maxWidth: 80 },
    { id: 'reportcls_name', label: 'Class Name', maxWidth: 150 },
    { id: 'reportemail', label: 'Email', maxWidth: 200 },
    { id: 'reportcreated', label: 'Creation Date', maxWidth: 150 },
    { id: 'reportvalidity', label: 'Validity', maxWidth: 150 },
    { id: 'reportstudents_count', label: 'Students Count', maxWidth: 100 },
    { id: 'reportsubmissions_count', label: 'Submissions Count', maxWidth: 100 },
];

const submissionsColumns = [
    { id: 'reportassignment_name', label: 'Assignment Name', maxWidth: 90 },
    { id: 'reportassignmet_id', label: 'Assignment ID', maxWidth: 110 },
    { id: 'reportauthor', label: 'Author Name', maxWidth: 110 },
    { id: 'reportclas_id', label: 'Class ID', maxWidth: 90 },
    { id: 'reportclas_name', label: 'Class Name', maxWidth: 110 },
    { id: 'reportemail', label: 'Email', maxWidth: 110 },
    { id: 'reportno_of_page', label: 'No.of Pages', maxWidth: 90 },
    { id: 'reportpaper_id', label: 'Paper ID', maxWidth: 95 },
    { id: 'reportsimilarity', label: 'Similarity', maxWidth: 140 },
    { id: 'reportsubmission_date', label: 'Submission Date', maxWidth: 110 },
    { id: 'reporttitle', label: 'Title', maxWidth: 100 },
];

const foldersColumn = [
    { id: 'reportname', label: 'Folder Name', maxWidth: 170 },
    { id: 'reportid', label: 'Folder ID', maxWidth: 170 },
    { id: 'reportusername', label: 'Email', maxWidth: 170 },
    { id: 'reportcreated', label: 'Created Date', maxWidth: 170 },
    { id: 'reportendDate', label: 'End Date', maxWidth: 170 },
    { id: 'reportcount', label: 'Submissions', maxWidth: 90 },
];

const proSubmissionsColumns = [
    { id: 'reportname', label: 'Author Name', maxWidth: 170 },
    { id: 'reporttitle', label: 'Title', maxWidth: 170 },
    { id: 'reportdate_up', label: 'Submission Date', maxWidth: 130 },
    { id: 'reportusername', label: 'Email', maxWidth: 170 },
    { id: 'reportpaper_id', label: 'Paper ID', maxWidth: 80 },
    { id: 'reportpercent', label: 'Similarity', maxWidth: 170 },
];

function submissionData(reportassignment_name, reportassignmet_id, reportauthor, reportclas_id, reportclas_name, reportemail, reportno_of_page, reportpaper_id, reportsimilarity, reportsubmission_date, reporttitle, flag) {
    return { reportassignment_name, reportassignmet_id, reportauthor, reportclas_id, reportclas_name, reportemail, reportno_of_page, reportpaper_id, reportsimilarity, reportsubmission_date, reporttitle, flag };
}

function assignmentData(reportass_id, reportass_name, reportemail, reportcreated, reportendDate, reportclass_id, reportclass_name, reportcount) {
    return { reportass_id, reportass_name, reportemail, reportcreated, reportendDate, reportclass_id, reportclass_name, reportcount };
}

function classesData(reportcls_id, reportcls_name, reportcreated, reportemail, reportstudents_count, reportsubmissions_count, reportvalidity) {
    return { reportcls_id, reportcls_name, reportcreated, reportemail, reportstudents_count, reportsubmissions_count, reportvalidity };
}

function folderData(reportname, reportid, reportusername, reportcreated, reportendDate, reportcount) {
    return { reportname, reportid, reportusername, reportcreated, reportendDate, reportcount };
}

function proSubmissionData(reportname, reporttitle, reportdate_up, reportusername, reportpaper_id, reportpercent) {
    return { reportname, reporttitle, reportdate_up, reportusername, reportpaper_id, reportpercent };
}

const ReportView = ({
    reportName,
    role,
    assignmentViewDownloadData,
    classesViewDownloadData,
    submissionsViewDownloadData,
    foldersViewList,
    submissionsViewList,
    isLoadingViewReport,
    isLoadingSubmission,
    isLoadingDownload,
    handleDownload,
    open,
    setOpen,
    onSend,
    closeSendDialog,
    handleChange,
    pageDetails
}) => {
    const [rows, setRows] = useState([]);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        let row = '';
        let arr = [];
        assignmentViewDownloadData?.map((data) => {
            row =
                assignmentData(
                    data.assignment_id,
                    data.assignment_name,
                    data.email_id,
                    data.created_id,
                    data.end_date,
                    data.class_id,
                    data.class_name,
                    data.submissions_count,
                );
            arr.push(row);
        });
        classesViewDownloadData?.map((data) => {
            row =
                classesData(
                    data.class_id,
                    data.class_name,
                    data.creation_date,
                    data.email_id,
                    data.students_count,
                    data.submissions_count,
                    data.validity,
                );
            arr.push(row);
        });
        submissionsViewDownloadData?.map((data) => {
            row =
                submissionData(
                    data.assignment_name,
                    data.assignmet_id,
                    data.author_name,
                    data.class_id,
                    data.class_name,
                    data.email_id,
                    data.number_of_pages,
                    data.paper_id,
                    <SimilarityStatus percent={ data.similarity } flag={ data.flag } />,
                    formatDate(data.submission_date),
                    data.title,
                );
            arr.push(row);
        });
        foldersViewList?.map((data) => {
            row =
                folderData(
                    data.folder_name,
                    data.folder_id,
                    data.mail_id,
                    formatDate(data.created_date),
                    formatDate(data.end_date),
                    data.no_of_submissions,
                );
            arr.push(row);
        });
        submissionsViewList?.map((data) => {
            row =
                proSubmissionData(
                    data.name,
                    data.title,
                    formatDate(data.date_up),
                    data.mail_id,
                    data.paper_id,
                    <SimilarityStatus percent={ data.percent } />,
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [assignmentViewDownloadData, classesViewDownloadData, submissionsViewDownloadData, foldersViewList, submissionsViewList]);

    return (
        <>
            { isLoadingViewReport ?
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
                :
                <>
                    {
                        reportName === 'assignments' &&
                        <>
                            { isLoadingDownload ? <Skeleton /> :
                                <Tooltip title="Download Assignments" arrow>
                                    <DownloadButton >
                                        <StyledButtonIcon variant="outlined" size='small' onClick={ handleDownload }>
                                            <FileDownloadOutlinedIcon fontSize='small' />
                                        </StyledButtonIcon>
                                    </DownloadButton>
                                </Tooltip>
                            }
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ assignmentsColumns }
                                tableData={ rows }
                                path=''
                            />
                        </>
                    }

                    {
                        reportName === 'classes' &&
                        <>
                            { isLoadingDownload ? <Skeleton /> :
                                <Tooltip title="Download classes" arrow>
                                    <DownloadButton >
                                        <StyledButtonIcon variant="outlined" size='small' onClick={ handleDownload }>
                                            <FileDownloadOutlinedIcon fontSize='small' />
                                        </StyledButtonIcon>
                                    </DownloadButton>
                                </Tooltip>
                            }
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ classesColumns }
                                tableData={ rows }
                                path=''
                            />
                        </>
                    }

                    {
                        reportName === 'submissions' && role === EXTREME &&
                        <>
                            <Tooltip title="Download submissions" arrow>
                                <DownloadButton >
                                    <StyledButtonIcon variant="outlined" size='small' onClick={ setOpen }>
                                        <FileDownloadOutlinedIcon fontSize='small' />
                                    </StyledButtonIcon>
                                </DownloadButton>
                            </Tooltip>
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ submissionsColumns }
                                tableData={ rows }
                                path=''
                            />
                        </>

                    }

                    {
                        reportName === 'folders' &&
                        <>
                            { isLoadingDownload ? <Skeleton /> :
                                <Tooltip title="Download Folders" arrow>
                                    <DownloadButton >
                                        <StyledButtonIcon variant="outlined" size='small' onClick={ handleDownload }>
                                            <FileDownloadOutlinedIcon fontSize='small' />
                                        </StyledButtonIcon>
                                    </DownloadButton>
                                </Tooltip>
                            }
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ foldersColumn }
                                tableData={ rows }
                                path=''
                            />
                        </>
                    }

                    {
                        reportName === 'submissions' && role === PRO &&
                        <>
                            <Tooltip title="Download submissions" arrow>
                                <DownloadButton >
                                    <StyledButtonIcon variant="outlined" size='small' onClick={ setOpen }>
                                        <FileDownloadOutlinedIcon fontSize='small' />
                                    </StyledButtonIcon>
                                </DownloadButton>
                            </Tooltip>
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ proSubmissionsColumns }
                                tableData={ rows }
                                path=''
                            />
                        </>

                    }

                    { open &&
                        <>
                            <DialogModal
                                headingTitle="Mail"
                                isOpen={ true }
                                fullWidth="sm"
                                maxWidth="sm"
                                handleClose={ closeSendDialog }
                            >
                                <form onSubmit={ handleSubmit(onSend) }>
                                    <Grid container>
                                        { FormJson?.map((field, i) => (
                                            <Grid key={ field?.name } md={ 12 } style={ { marginLeft: '8px' } }>
                                                <FormComponent
                                                    key={ i }
                                                    field={ field }
                                                    control={ control }
                                                    isLoading={ isLoadingSubmission }
                                                />
                                            </Grid>
                                        )) }
                                    </Grid>
                                </form>
                            </DialogModal>
                        </>
                    }
                </>
            }

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

export default ReportView;