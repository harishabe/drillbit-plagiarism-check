import React, { useEffect, useState, useMemo } from 'react';
import debouce from 'lodash.debounce';
import { connect } from 'react-redux';
import { GetClassesData } from '../../../redux/action/student/StudentAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { Skeleton, TextField } from '@mui/material';
import Student from '../../../layouts/Student';
import { BreadCrumb, CardInfoView, MainHeading, ErrorBlock } from '../../../components';
import { renameKeys, findByExpiryDate, expiryDateBgColor } from '../../../utils/RegExp';
import { CLASS_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const StudentBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/student/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '',
        active: true,
    },
];

const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];

const MyClasses = ({
    GetClassesData,
    classesData,
    pageDetails,
    isLoading
}) => {
    const [item, setItem] = useState([]);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'class_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetClassesData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        classesData?.map((item, index) => {
            item['color'] = Colors[index];
            item['validity'] = findByExpiryDate(item.end_date);
            row = renameKeys(item,
                {
                    class_id: 'id',
                    class_name: 'name',
                    mail_id: 'email',
                    created_date: 'expiry_date',
                    end_date: 'end_date',
                    instructor_name: 'instructorName',
                    status: 'status',
                    color: 'color',
                    validity: 'validity'
                });
            arr.push(row);
        });
        setItem([...arr]);
    }, [classesData]);

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


    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={ 5 } xs={ 5 }>
                        <MainHeading
                            title={`My Classes(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`}
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
                    {classesData?.length > 0 ?
                        <>
                            <Grid container spacing={2}>
                                {item?.map((item, index) => (
                                    <Grid key={ index } item md={ 4 } xs={ 12 }>
                                        <CardInfoView
                                            key={index}
                                            isNextPath={true}
                                            isAction={false}
                                            item={item}
                                            isAvatar={true}
                                            isHeading={true}
                                            isInstructorName={true}
                                            isTimer={true}
                                            statusColor={expiryDateBgColor(item.validity)}
                                            path={ { pathname: '/extream/student/myassignments', query: { clasId: item.id, clasName: item.name } } }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <div style={ { marginLeft: '45%', marginTop: '25px' } }>
                                <Pagination
                                    count={ pageDetails?.totalPages }
                                    onChange={ handleChange }
                                    color="primary"
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </div>
                        </>
                        : <ErrorBlock message={ CLASS_NOT_FOUND } />
                    }
                </>
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.studentClasses?.classesData?.page,
    classesData: state?.studentClasses?.classesData?._embedded?.studentClassesList,
    isLoading: state?.studentClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (paginationPayload) => dispatch(GetClassesData(paginationPayload)),
    };
};

MyClasses.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);
