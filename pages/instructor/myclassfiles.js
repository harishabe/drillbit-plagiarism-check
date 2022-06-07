import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { TextField } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { CardInfoView } from '../../components';
import { GetClassesData } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import { Skeleton } from '@mui/material';

function createData(validity) {
    return { validity }
};

const MyClassFiles = ({
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
        let presentDate;
        let expiryDate;
        let differenceInTime;
        classesData?.map((item) => {
            row =
                createData(
                    presentDate = new Date(),
                    expiryDate = new Date(item.expiry_date),
                    differenceInTime = presentDate.getTime() - expiryDate.getTime(),
                    item.validity = `${Math.round(differenceInTime / (1000 * 3600 * 24))} Days left`,
                );
            arr.push(row)
        });
        setItem([...arr]);
    }, [classesData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const checkStatus = (validity) => {
        console.log("first", validity)
        if (validity <= 15) {
            return '#FF0000';
        } else if (validity >= 15 && validity <= 100) {
            return '#FFFF00';
        }else{
            return '#CCCCCC';
        }
    }

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    return (
        <React.Fragment>
              <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            onChange={handleSearch}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                </Grid>
            {isLoading ?
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                </Grid> :
                <Grid container spacing={2}>
                    {classesData?.map((item, index) => (
                        <Grid item md={4} xs={12}>
                            <CardInfoView
                                key={index}
                                item={item}
                                isAvatar={true}
                                isHeading={true}
                                isTimer={true}
                                statusColor={checkStatus(item.validity)}
                                path='/instructor/myclasstables'
                            />
                        </Grid>
                    ))}
                </Grid>
            }
            <div style={{ marginLeft: '30%', marginTop: '25px' }}>
                <Pagination
                    count={pageDetails?.totalPages}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.classesData?.page,
    classesData: state?.instructorClasses?.classesData?._embedded?.classDTOList,
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (PaginationValue) => dispatch(GetClassesData(PaginationValue)),
    };
};

MyClassFiles.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassFiles);
