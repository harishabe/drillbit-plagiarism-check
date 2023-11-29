import React, { useEffect, useState, useMemo } from 'react';
import debouce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import {
    GetAssignmentData,
    DownloadAssignmentInstruction
} from '../../../redux/action/student/StudentAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import Pagination from '@mui/material/Pagination';
import { TextField } from '@mui/material';
import Student from '../../../layouts/Student';
import { BreadCrumb, CardInfoView, CardInfoSkeleton, CardView, Heading, ErrorBlock, WarningDialog } from '../../../components';
import { DownloadWarningIcon } from "../../../assets/icon";
import { renameKeys, findByExpiryDate, expiryDateBgColor } from '../../../utils/RegExp';
import { ASSIGNMENT_NOT_FOUND } from '../../../constant/data/ErrorMessage';
import { WARNING_MESSAGES } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';

const useStyles = makeStyles({
    box: {
        flexGrow: 1, 
        marginBottom: '11px'
    }
});

const MyAssignments = ({
    GetAssignmentData,
    DownloadAssignmentInstruction,
    assignmentData,
    pageDetails,
    isLoading,
    isLoadingInstructions
}) => {

    const router = useRouter();
    const classes = useStyles();
    const [myclass, setMyclass] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setMyclass(router.query.clasName);
        }
    }, [router.isReady]);

    const StudentBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/student/dashboard',
            active: false,
        },
        {
            name: myclass,
            link: '/extream/student/myclasses',
            active: false,
        },
        {
            name: 'My assignments',
            link: '',
            active: true,
        },
    ];

    const [item, setItem] = useState([]);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            GetAssignmentData(router.query.clasId, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        assignmentData?.map((item, index) => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            item['color'] = '#' + randomColor;
            item['validity'] = findByExpiryDate(item.end_date);
            row = renameKeys(item,
                {
                    ass_id: 'id',
                    assignment_name: 'name',
                    color: 'color',
                    creation_date: 'creation_date',
                    end_date: 'end_date'
                });
            arr.push(row);
        });
        setItem([...arr]);
    }, [assignmentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    const handleDownload = (item) => {
        setShowModal([true, item])
    };

    const handleDownloadYesWarning = () => {
        DownloadAssignmentInstruction(showModal[1]?.attachment, router.query.clasId, showModal[1]?.id);
        setShowModal(false);
    };

    const handleDownloadCloseWarning = () => {
        setShowModal(false);
    };

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <Box className={ classes.box }>
                <Grid container spacing={1}>
                    <Grid item md={ 9.3 } xs={ 7 }>
                        <Heading
                            title={`My Assignments(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`}
                        />
                    </Grid>
                    <Grid item md={ 2.7 } xs={ 5 } style={ { textAlign: 'right' } }>
                        <TextField
                            sx={ { width: '100%' } }
                            placeholder='Search by Assignment name'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 7,
                                    display: 'inline-flex',
                                    fontWeight: 500
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            {isLoading ?
                <Grid container spacing={2}>
                    <Grid item md={ 4 } xs={ 12 }><CardInfoSkeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><CardInfoSkeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><CardInfoSkeleton /></Grid>
                </Grid> :
                <>
                    {assignmentData?.length > 0 ?
                        <>
                            <Grid container spacing={2}>
                                {item?.map((item, index) => (
                                    <Grid key={ index } item xl={ 3 } md={ 4 } sm={ 6 } xs={ 12 }>
                                        <CardInfoView
                                            key={item.id}
                                            item={item}
                                            isLoading={isLoadingInstructions}
                                            isAvatar={true}
                                            isHeading={true}
                                            isTimer={true}
                                            isSubmit={true}
                                            isDownload={true}
                                            handleDownload={handleDownload}
                                            statusColor={expiryDateBgColor(item.validity)}
                                            submitPath={ { pathname: '/extream/student/myassignment-details', query: { assId: item.id, clasId: router.query.clasId, clasName: router.query.clasName, assName: item.name, repo: item.report_access } } }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                        : <CardView>
                            <ErrorBlock message={ ASSIGNMENT_NOT_FOUND } />
                        </CardView>
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
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.studentClasses?.assignmentData?.page,
    assignmentData: state?.studentClasses?.assignmentData?._embedded?.assignmentDTOList,
    isLoading: state?.studentClasses?.isLoading,
    isLoadingInstructions: state?.studentClasses?.isLoadingInstructions,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAssignmentData: (id, PaginationValue) => dispatch(GetAssignmentData(id, PaginationValue)),
        DownloadAssignmentInstruction: (attachment, class_id, folder_id) => dispatch(DownloadAssignmentInstruction(attachment, class_id, folder_id)),
    };
};

MyAssignments.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignments);
