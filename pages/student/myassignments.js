import React, { useEffect, useState, useMemo } from 'react';
import debouce from "lodash.debounce";
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { GetAssignmentData, DownloadStudentCsv } from '../../redux/action/student/StudentAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import Pagination from '@mui/material/Pagination';
import { Skeleton, TextField } from '@mui/material';
import Student from '../../layouts/Student';
import { BreadCrumb, CardInfoView, MainHeading, ErrorBlock } from '../../components';
import { renameKeys, findByExpiryDate, expiryDateBgColor } from '../../utils/RegExp';
import { ASSIGNMENT_NOT_FOUND } from '../../constant/data/ErrorMessage';

const StudentBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/student/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/student/myclasses',
        active: false,
    },
    {
        name: 'My assignments',
        link: '',
        active: true,
    },
]

const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];

const MyAssignments = ({
    GetAssignmentData,
    DownloadStudentCsv,
    assignmentData,
    pageDetails,
    isLoading
}) => {

    const router = useRouter();

    const [item, setItem] = useState([]);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetAssignmentData(router.query.clasId, paginationPayload);
    }, [router.query.clasId, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        assignmentData?.map((item, index) => {
            item['color'] = Colors[index];
            item['validity'] = findByExpiryDate(item.end_date);
            row = renameKeys(item,
                {
                    ass_id: 'id',
                    assignment_name: 'name',
                    color: 'color',
                    creation_date: 'creation_date',
                    end_date: 'end_date'
                })
            arr.push(row)
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

    const handleDownload = (e, item) => {
        let url = `/${router.query.clasId}/assignments/${item.id}/downloadHistory`;
        DownloadStudentCsv(url)
    }

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8}>
                        <MainHeading 
                            title={`My Assignments(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} 
                        />
                    </Grid>
                    {/* <Grid
                        item
                        md={4}
                        xs={12}
                        container
                        direction='row'
                        justifyContent={'right'}
                    >
                        <TextField
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            }}
                        />
                    </Grid> */}
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
                        <Grid container spacing={2}>
                            {item?.map((item, index) => (
                                <Grid item md={4} xs={12}>
                                    <CardInfoView
                                        key={index}
                                        item={item}
                                        isAvatar={true}
                                        isHeading={true}
                                        isTimer={true}
                                        isSubmit={true}
                                        isDownload={true}
                                        handleDownload={ handleDownload }
                                        statusColor={expiryDateBgColor(item.validity)}
                                        submitPath={{ pathname: '/student/myassignment-details', query: { assId: item.id, clasId: router.query.clasId } }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        : <ErrorBlock message={ASSIGNMENT_NOT_FOUND} />
                    }

                </>
            }


                <div style={{ marginLeft: '45%', marginTop: '25px' }}>
                    <Pagination
                        count={pageDetails?.totalPages}
                        onChange={handleChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </div>


        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.studentClasses?.assignmentData?.page,
    assignmentData: state?.studentClasses?.assignmentData?._embedded?.assignmentDTOList,
    isLoading: state?.studentClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAssignmentData: (id, PaginationValue) => dispatch(GetAssignmentData(id, PaginationValue)),
        DownloadStudentCsv: (url) => dispatch(DownloadStudentCsv(url)),
    };
};

MyAssignments.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignments);
