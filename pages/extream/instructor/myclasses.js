import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Skeleton,
    Tooltip,
    IconButton,
    TextField,
    Box,
} from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { GetClassesData } from '../../../redux/action/instructor/InstructorAction';
import { DownloadCsv } from '../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import Instructor from '../../../layouts/Instructor';
import {
    BreadCrumb,
    MainHeading,
    CreateDrawer,
} from '../../../components';
import MyClassesForm from './form/MyclassesForm';
import MyClassFiles from './myclassfiles';
import { DownloadIcon } from '../../../assets/icon';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { DOWNLOAD_CSV } from '../../../constant/data/Constant';
import { setItemSessionStorage, getItemSessionStorage } from '../../../utils/RegExp';
import { CLASS_VIEW, TABLE_VIEW } from '../../../constant/data/Constant';
import GridOnIcon from '@mui/icons-material/GridOn';

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

const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#fff !important',
        backgroundColor: '#3672FF !important'
    }
});

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index:999;
`;

const MyClasses = ({
    GetClassesData,
    DownloadCsv,
    classesData,
    pageDetails,
    isLoading,
    isLoadingClassDelete,
    isLoadingDownload
}) => {
    const [view, setView] = useState(getItemSessionStorage('classView') ? getItemSessionStorage('classView') : TABLE_VIEW);
    const [search, setSearch] = useState(false);
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

    const handleChangeView = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setView(value);
            setItemSessionStorage('classView', value);
        }
    };

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setSearch(true)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setSearch(false)
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

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DOWNLOAD_CSV_FILES, DOWNLOAD_CSV.CLASSROOM_REPORTS);
    };

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
                <Grid item md={ 4 } xs={ 5 }>
                    <MainHeading title={`My Classes(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                </Grid>
                <Grid item md={ 5 } style={ { textAlign: 'right', marginTop: '8px' } }>
                    <ToggleButtonGroup
                        color="primary"
                        size='small'
                        value={ view }
                        exclusive
                        onChange={ handleChangeView }
                    >
                        <Tooltip title='Table view' arrow>
                            <ToggleButton value={ TABLE_VIEW } selected={ view === TABLE_VIEW }><ViewListRoundedIcon fontSize='small' /></ToggleButton>
                        </Tooltip>
                        <Tooltip title='Class view' arrow>
                            <ToggleButton value={ CLASS_VIEW } selected={ view === CLASS_VIEW }><GridOnIcon fontSize='small' /></ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item md={ 3 } xs={ 7 } style={ { textAlign: 'right' } }>
                    {classesData?.length > 0 &&
                        isLoadingDownload ?
                        <Skeleton width={50} style={{ display: 'inline-block', marginRight: '10px', marginTop: '12px' }} />
                        : <Tooltip title="Download csv" arrow>
                            <IconButton
                                color="primary"
                                aria-label="download-file"
                                size="large"
                                onClick={handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    <TextField
                        sx={ { width: '80%', marginTop: '8px' } }
                        placeholder='Search'
                        onChange={debouncedResults}
                        inputProps={{
                            style: {
                                padding: 6,
                                display: 'inline-flex',
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <AddButtonBottom>
                <CreateDrawer
                    title="Create Class"
                    isShowAddIcon={true}>
                    <MyClassesForm />
                </CreateDrawer>
            </AddButtonBottom>
            <MyClassFiles
                pageDetails={ pageDetails }
                classesData={ classesData }
                view={ view }
                search={ search }
                isLoading={ isLoading }
                isLoadingClassDelete={ isLoadingClassDelete }
                handleTableSort={ handleTableSort }
                handlePagination={ handlePagination }
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.classesData?.page,
    classesData: state?.instructorClasses?.classesData?._embedded?.classDTOList,
    isLoading: state?.instructorClasses?.isLoading,
    isLoadingClassDelete: state?.instructorCrud?.isLoadingClassDelete,
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (PaginationValue) => dispatch(GetClassesData(PaginationValue)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

MyClasses.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);


