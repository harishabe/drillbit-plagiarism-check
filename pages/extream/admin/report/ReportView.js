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
} from '../../../../components';
import { DownloadIcon } from '../../../../assets/icon';
import FormJson from '../../../../constant/form/report-submission-form.json';
import { formatDate } from '../../../../utils/RegExp';
import { PaginationContainer } from '../../../../style/index';

const DownloadButton = styled.div`
    position:fixed;
    top: 17px;
    right:80px;
`;

const assignmentsColumns = [
    { id: 'reportass_id', label: 'Assignment ID', maxWidth: 135 },
    { id: 'reportass_name', label: 'Assignment Name', maxWidth: 135 },
    { id: 'reportemail', label: 'Email', maxWidth: 135 },
    { id: 'reportcreated', label: 'Created Date', maxWidth: 135 },
    { id: 'reportendDate', label: 'End Date', maxWidth: 135 },
    { id: 'reportclass_id', label: 'Class ID', maxWidth: 135 },
    { id: 'reportclass_name', label: 'Class Name', maxWidth: 135 },
    { id: 'reportcount', label: 'Submission count', maxWidth: 135 },
];

const classesColumns = [
    { id: 'reportcls_id', label: 'Class ID', maxWidth: 153 },
    { id: 'reportcls_name', label: 'Class Name', maxWidth: 153 },
    { id: 'reportcreated', label: 'Creation Date', maxWidth: 153 },
    { id: 'reportemail', label: 'Email', maxWidth: 153 },
    { id: 'reportstudents_count', label: 'Students Count', maxWidth: 153 },
    { id: 'reportsubmissions_count', label: 'Submissions Count', maxWidth: 153 },
    { id: 'reportvalidity', label: 'Validity', maxWidth: 153 },
];

const submissionsColumns = [
    { id: 'reportassignment_name', label: 'Assignment Name', maxWidth: 95 },
    { id: 'reportassignmet_id', label: 'Assignment ID', maxWidth: 95 },
    { id: 'reportauthor', label: 'Author Name', maxWidth: 95 },
    { id: 'reportclas_id', label: 'Class ID', maxWidth: 95 },
    { id: 'reportclas_name', label: 'Class Name', maxWidth: 95 },
    { id: 'reportemail', label: 'Email', maxWidth: 95 },
    { id: 'reportno_of_page', label: 'Number Of Pages', maxWidth: 95 },
    { id: 'reportpaper_id', label: 'Paper ID', maxWidth: 95 },
    { id: 'reportsimilarity', label: 'Similarity', maxWidth: 95 },
    { id: 'reportsubmission_date', label: 'Submission Date', maxWidth: 95 },
    { id: 'reporttitle', label: 'Title', maxWidth: 95 },
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

const ReportView = ({
    reportName,
    assignmentViewDownloadData,
    classesViewDownloadData,
    submissionsViewDownloadData,
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
        setRows([...arr]);
    }, [assignmentViewDownloadData, classesViewDownloadData, submissionsViewDownloadData]);

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
                                    <IconButton sx={ {
                                        position: 'fixed',
                                        padding: '20px',
                                        top: '9px',
                                        right: '74px'
                                    } }
                                        onClick={ handleDownload }>
                                        <DownloadButton >
                                            <DownloadIcon />
                                        </DownloadButton>
                                    </IconButton>
                                </Tooltip>
                            }
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ assignmentsColumns }
                                tableData={ rows }
                                charLength={ 10 }
                                path=''
                            />
                        </>
                    }

                    {
                        reportName === 'classes' &&
                        <>
                            { isLoadingDownload ? <Skeleton /> :
                                <Tooltip title="Download classes" arrow>
                                    <IconButton sx={ {
                                        position: 'fixed',
                                        padding: '20px',
                                        top: '9px',
                                        right: '74px'
                                    } }
                                        onClick={ handleDownload }>
                                        <DownloadButton >
                                            <DownloadIcon />
                                        </DownloadButton>
                                    </IconButton>
                                </Tooltip>
                            }
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ classesColumns }
                                tableData={ rows }
                                charLength={ 10 }
                                path=''
                            />
                        </>
                    }

                    {
                        reportName === 'submissions' &&
                        <>
                            <Tooltip title="Download submissions" arrow>
                                <IconButton sx={ {
                                    position: 'fixed',
                                    padding: '20px',
                                    top: '9px',
                                    right: '74px'
                                } }
                                    onClick={ setOpen }>
                                    <DownloadButton >
                                        <DownloadIcon />
                                    </DownloadButton>
                                </IconButton>
                            </Tooltip>
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                tableHeader={ submissionsColumns }
                                tableData={ rows }
                                charLength={ 10 }
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