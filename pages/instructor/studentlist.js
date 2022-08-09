import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import debouce from "lodash.debounce";
import { Grid, Tooltip } from '@mui/material';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box'
import { Pagination, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import {
    CardView,
    CommonTable,
    BreadCrumb,
    MainHeading,
    CreateDrawer,
    WarningDialog
} from '../../components';
import { GetSubmissionList, DeleteSubmission, DownloadSubmissionList } from '../../redux/action/instructor/InstructorAction';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon } from '../../assets/icon';
import { PaginationValue } from '../../utils/PaginationUrl';
import { formatDate, removeCommaWordEnd } from '../../utils/RegExp';
import SubmissionForm from './form/SubmissionForm';

const columns = [
    { id: 'PAname', label: 'Paper Name' },
    { id: 'file', label: 'Original File' },
    { id: 'lang', label: 'Language' },
    { id: 'grammer', label: 'Grammer' },
    { id: 'similarity', label: 'Similarity' },
    { id: 'paperid', label: 'Paper Id' },
    { id: 'date', label: 'Submission Date' },
    { id: 'action', label: 'Actions' },
]

function createData(PAname, file, lang, grammer, similarity, paperid, date, action) {
    return {
        PAname, file, lang, grammer, similarity, paperid, date, action
    }
}

const AddButtonBottom = styled.div`
    position:absolute;
    bottom: 30px;
    right:30px;
`;

const StudentList = ({
    GetSubmissionList,
    DownloadSubmissionList,
    DeleteSubmission,
    submissionData,
    isLoadingSubmission,
    isLoadingUpload,
    isLoadingDownload,
    pageDetails,
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);

    const folderId = router.query.folderId;
    const folderName = router.query.name;

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/instructor/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/instructor/myfolder',
            active: false,
        },
        {
            name: folderName,
            link: '',
            active: true,
        },
    ]

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    }

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    useEffect(() => {
        let url = `myFolder/${folderId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`;

        GetSubmissionList(url);
    }, [folderId, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((student) => {
            row =
                createData(
                    student.title,
                    student.original_fn,
                    student.lang1,
                    student.grammar,
                    student.percent,
                    student.paper_id,
                    formatDate(student.date_up),
                    [{ 'component': <DeleteIcon />, 'type': 'delete' }]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionData]);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'delete') {
            console.log("rowdata", rowData)
            setDeleteRowData(rowData?.paperid);
            setShowDeleteWarning(true);
        }
    }

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        DeleteSubmission(`myFolder/${folderId}/submissions?paperId=${deleteRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload })
    }

    const handleCheckboxSelect = () => {
        let rowData = rows?.map((rowItem) => {
            rowItem['isSelected'] = !rowItem['isSelected'];
            return rowItem;
        });
        setRows(rowData);
    }

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.paperid === row?.paperid) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    }

    const deleteAllSubmission = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.paperid + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    }

    const handleDownload = () => {
        let url = `myFolder/${folderId}/downloadSubmissions`;
        DownloadSubmissionList(url)
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={InstructorBreadCrumb} />
                        <MainHeading title={`${folderName} (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid item md={ 2 } xs={ 2 }>
                        <TextField
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                        { submissionData?.length > 0 &&
                            <Tooltip title="Download csv">
                                <IconButton
                                    sx={ { ml: 20, p: 1 } }
                                    color="primary"
                                    aria-label="download-file"
                                    size="large"
                                    onClick={ handleDownload }>
                                    { isLoadingDownload ? <Skeleton width={ 20 } /> : <DownloadIcon /> }
                                </IconButton>
                            </Tooltip>
                        }
                    </Grid>
                </Grid>
            </Box>
            <CardView>

                {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
                    <IconButton onClick={ deleteAllSubmission }>
                        <DeleteIcon />
                    </IconButton>
                </div>}

                <CommonTable
                    isCheckbox={true}
                    tableHeader={columns}
                    tableData={rows}
                    handleAction={handleAction}
                    handleTableSort={handleTableSort}
                    handleCheckboxSelect={handleCheckboxSelect}
                    handleSingleSelect={handleSingleSelect}
                    isLoading={isLoadingSubmission}
                    charLength={17}
                    path=''
                />

                <AddButtonBottom>
                    <CreateDrawer
                        title="Upload File"
                        isShowAddIcon={true}>
                        <SubmissionForm
                            folderId={folderId}
                            isLoadingUpload={isLoadingUpload}
                        />
                    </CreateDrawer>
                </AddButtonBottom>

                {
                    showDeleteWarning &&
                    <WarningDialog
                        warningIcon={<DeleteWarningIcon />}
                        message="Are you sure you want to delete ?"
                        handleYes={handleYesWarning}
                        handleNo={handleCloseWarning}
                        isOpen={true}
                    />
                }

                {pageDetails?.totalPages > '1' ?
                    <div style={{ marginLeft: '35%', marginTop: '25px' }}>
                        <Pagination
                            count={pageDetails?.totalPages}
                            onChange={handleChange}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </div> : ''
                }
            </CardView>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.submissionData?.page,
    submissionData: state?.instructorMyFolders?.submissionData?._embedded?.submissionsList,
    isLoadingSubmission: state?.instructorMyFolders?.isLoadingSubmission,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingDownload: state?.instructorMyFolders?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
        DeleteSubmission: (url) => dispatch(DeleteSubmission(url)),
        DownloadSubmissionList: (url) => dispatch(DownloadSubmissionList(url)),
    };
};

StudentList.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
