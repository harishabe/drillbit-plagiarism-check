import React, { useEffect, useState, useMemo } from 'react';
import debouce from 'lodash.debounce';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import {
    GetAssignmentData,
    DownloadAssignmentInstruction
} from '../../../redux/action/student/StudentAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import Pagination from '@mui/material/Pagination';
import { Skeleton, TextField } from '@mui/material';
import Student from '../../../layouts/Student';
import { BreadCrumb, CardInfoView, MainHeading, ErrorBlock } from '../../../components';
import { renameKeys, findByExpiryDate, expiryDateBgColor } from '../../../utils/RegExp';
import { ASSIGNMENT_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const MyAssignments = ({
    GetAssignmentData,
    DownloadAssignmentInstruction,
    assignmentData,
    pageDetails,
    isLoading,
    isLoadingInstructions
}) => {

    const router = useRouter();
    const [myclass, setMyclass] = useState('');

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
        DownloadAssignmentInstruction(item.attachment, router.query.clasId, item.id);
    };

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={ 5 } xs={ 5 }>
                        <MainHeading
                            title={`My Assignments(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`}
                        />
                    </Grid>
                    <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                        <TextField
                            sx={ { width: '40%', marginTop: '8px' } }
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            {isLoading ?
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                </Grid> :
                <>
                    {assignmentData?.length > 0 ?
                        <>
                            <Grid container spacing={2}>
                                {item?.map((item, index) => (
                                    <Grid key={ index } item md={ 4 } xs={ 12 }>
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
                                            submitPath={{ pathname: '/extream/student/myassignment-details', query: { assId: item.id, clasId: router.query.clasId, clasName: router.query.clasName, assName: item.name } }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <div style={{ marginLeft: '45%', marginTop: '25px' }}>
                                <Pagination
                                    count={pageDetails?.totalPages}
                                    onChange={handleChange}
                                    color="primary"
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </div>
                        </>
                        : <ErrorBlock message={ASSIGNMENT_NOT_FOUND} />
                    }

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
