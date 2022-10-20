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
import { PaginationContainer } from '../../../style/index';

const DownloadButton = styled.div`
    position:fixed;
    top: 17px;
    right:80px;
`;

const foldersColumn = [
    { id: 'reportname', label: 'Folder Name', minWidth: 170 },
    { id: 'reportid', label: 'Folder ID', minWidth: 170 },
    { id: 'reportusername', label: 'Email', minWidth: 170 },
    { id: 'reportcreated', label: 'Created Date', minWidth: 170 },
    { id: 'reportendDate', label: 'End Date', minWidth: 170 },
    { id: 'reportcount', label: 'Submissions', minWidth: 170 },
];

const submissionsColumns = [
    { id: 'reportname', label: 'Author Name', minWidth: 110 },
    { id: 'reporttitle', label: 'Title', minWidth: 110 },
    { id: 'reportdate_up', label: 'Submission Date', minWidth: 110 },
    { id: 'reportusername', label: 'Email', minWidth: 110 },
    { id: 'reportpaper_id', label: 'Paper ID', minWidth: 110 },
    { id: 'reportpercent', label: 'Similarity', minWidth: 110 },
];

function submissionData(reportname, reporttitle, reportdate_up, reportusername, reportpaper_id, reportpercent) {
    return { reportname, reporttitle, reportdate_up, reportusername, reportpaper_id, reportpercent };
}

function folderData(reportname, reportid, reportusername, reportcreated, reportendDate, reportcount) {
    return { reportname, reportid, reportusername, reportcreated, reportendDate, reportcount };
}

const ReportView = ({
    reportName,
    folderViewDownloadData,
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
    pageDetails,
}) => {
    const [rows, setRows] = useState([]);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        let row = '';
        let arr = [];
        folderViewDownloadData?.map((data) => {
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
        setRows([...arr]);
    }, [folderViewDownloadData]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionsViewDownloadData?.map((data) => {
            row =
                submissionData(
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
    }, [submissionsViewDownloadData]);

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
                        reportName === 'folders' &&
                        <>
                            { isLoadingDownload ? <Skeleton /> :
                                <Tooltip title="Download Folders" arrow>
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
                                tableHeader={ foldersColumn }
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