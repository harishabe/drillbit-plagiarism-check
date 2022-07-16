import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import debouce from "lodash.debounce";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination';
import { TextField } from '@mui/material'
import Instructor from '../../layouts/Instructor'
import {
    CardView,
    CommonTable,
    AvatarName,
    BreadCrumb,
    MainHeading,
} from '../../components'
import { GetSubmissionList } from '../../redux/action/instructor/InstructorAction';
import { EditIcon, DeleteIcon } from '../../assets/icon'
import { PaginationValue } from '../../utils/PaginationUrl';
import { formatDate } from '../../utils/RegExp';

const columns = [
    // { id: 'id', label: 'Student ID' },
    // { id: 'STname', label: 'Student Name' },
    { id: 'PAname', label: 'Paper Name' },
    { id: 'file', label: 'Original File' },
    { id: 'lang', label: 'Language' },
    { id: 'grammer', label: 'Grammer' },
    { id: 'similarity', label: 'Similarity' },
    { id: 'paperid', label: 'Paper Id' },
    { id: 'date', label: 'Submission Date' },
    { id: 'action', label: 'Actions' },
]

function createData(
    // id, STname, 
    PAname, file, lang, grammer, similarity, paperid, date, action) {
    return {
        // id, STname, 
        PAname, file, lang, grammer, similarity, paperid, date, action
    }
}

const StudentList = ({
    GetSubmissionList,
    submissionData,
    isLoadingSubmission,
    pageDetails,
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);

    const clasId = router.query.clasId;
    const folderId = router.query.folderId;
    const folderName = router.query.name;

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/instructor/dashboard',
            active: false,
        },
        {
            name: 'My Folder',
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
        GetSubmissionList(clasId, folderId, paginationPayload);
    }, [clasId, folderId, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((student) => {
            row =
                createData(
                    // <AvatarName avatarText="S" title={ student.student_id } color='#4795EE' />,
                    // student.student_name,
                    student.title,
                    student.original_fn,
                    student.lang1,
                    student.grammar,
                    student.percent,
                    student.paper_id,
                    formatDate(student.date_up),
                    [{ 'component': <EditIcon />, 'type': 'edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete' },
                        // {
                        //     'component': student.status === 'active' ? <VpnKeyOutlinedIcon /> : <VpnKeyOffOutlinedIcon />,
                        //     'type': student.status === 'active' ? 'lock' : 'unlock'
                        // }
                    ]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                        <MainHeading title={ `${folderName + '(' + pageDetails?.totalElements + ')'}` } />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <CardView>
                <CommonTable
                    isCheckbox={ true }
                    tableHeader={columns}
                    tableData={rows}
                    // actionIcon={ actionIcon }
                    // isActionIcon={ true }
                    isLoading={ isLoadingSubmission }
                    charLength={ 17 }
                />
                { pageDetails?.totalPages > '1' ?
                    <div style={ { marginLeft: '35%', marginTop: '25px' } }>
                        <Pagination
                            count={ pageDetails?.totalPages }
                            onChange={ handleChange }
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (clasId, folderId, PaginationValue) => dispatch(GetSubmissionList(clasId, folderId, PaginationValue)),
    };
};

StudentList.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
