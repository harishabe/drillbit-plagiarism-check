import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Tooltip } from '@mui/material';
import styled from 'styled-components';
import debouce from "lodash.debounce";
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { GetClassesData } from '../../../redux/action/instructor/InstructorAction';
import {
    DownloadCsv,
} from '../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import Instructor from '../../../layouts/Instructor';
import { BreadCrumb, MainHeading } from '../../../components';
import MyClassFiles from './myclassfiles';
import { DownloadIcon } from '../../../assets/icon';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { DOWNLOAD_CSV } from '../../../constant/data/Constant';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/instructor/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/extream/instructor/myclasses',
        active: true,
    },
];

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const SkeletonContainer = styled.div`
    margin-top: 10px;
    margin-right: 5px;
`;

const MyClasses = ({
    GetClassesData,
    DownloadCsv,
    classesData,
    pageDetails,
    isLoading,
    isLoadingDownload
}) => {

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'class_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetClassesData(paginationPayload);
    }, [, paginationPayload]);

    const handlePagination = (event, value) => {
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

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DOWNLOAD_CSV_FILES, DOWNLOAD_CSV.CLASSROOM_REPORTS)
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={1}>
                <Grid item md={8} xs={7}>
                    <MainHeading title={`My Classes(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                </Grid>
                <Grid item md={4} xs={12} container direction='row' justifyContent={'right'}>
                    <DownloadButton>
                        {classesData?.length > 0 &&
                            isLoadingDownload ? <SkeletonContainer>
                            <Skeleton width={50} />
                        </SkeletonContainer> : <Tooltip title="Download csv" arrow>
                            <IconButton
                                color="primary"
                                aria-label="download-file"
                                size="large"
                                onClick={handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        }
                    </DownloadButton>
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
                </Grid>
            </Grid>

            {isLoading ?
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                </Grid> :
                <MyClassFiles
                    pageDetails={pageDetails}
                    classesData={classesData}
                    isLoading={isLoading}
                    handlePagination={handlePagination}
                />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.classesData?.page,
    classesData: state?.instructorClasses?.classesData?._embedded?.classDTOList,
    isLoading: state?.instructorClasses?.isLoading,
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (PaginationValue) => dispatch(GetClassesData(PaginationValue)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

MyClasses.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);


