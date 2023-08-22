import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Skeleton,
    Tooltip,
    TextField,
    Box,
} from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { DownloadWarningIcon } from "../../../assets/icon";
import styled from 'styled-components';
import { makeStyles } from "@mui/styles";
import debouce from 'lodash.debounce';
import { GetClassesData, ClearAssignment, ClearStudent } from '../../../redux/action/instructor/InstructorAction';
import { DownloadCsv } from '../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import Instructor from '../../../layouts/Instructor';
import {
    BreadCrumb,
    Heading,
    CardInfoSkeleton,
    CreateDrawer,
    WarningDialog
} from '../../../components';
import MyClassesForm from './form/MyclassesForm';
import MyClassFiles from './myclassfiles';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { DOWNLOAD_CSV } from '../../../constant/data/Constant';
import { setItemSessionStorage, getItemSessionStorage, removeItemSessionStorage } from '../../../utils/RegExp';
import { CLASS_VIEW, TABLE_VIEW, WARNING_MESSAGES } from '../../../constant/data/Constant';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { StyledButtonIcon, AddButtonBottom } from '../../../style/index';

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

const useStyles = makeStyles(() => ({
    button: {
        margin: "0px 6px 0px 0px",
    },
    view: {
        textAlign: 'right',
        marginBottom: '7px'
    }
}));

const MyClasses = ({
    GetClassesData,
    DownloadCsv,
    classesData,
    pageDetails,
    isLoading,
    isLoadingClassDelete,
    isLoadingDownload,
    ClearAssignment,
    ClearStudent
}) => {
    const [view, setView] = useState(getItemSessionStorage('classView') ? getItemSessionStorage('classView') : TABLE_VIEW);
    const [showModal, setShowModal] = useState(false);
    const classes = useStyles();
    const [search, setSearch] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'class_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetClassesData(paginationPayload);
        removeItemSessionStorage('tab')
        ClearAssignment()
        ClearStudent()
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
        setShowModal(true)
    };

    const handleDownloadYesWarning = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DOWNLOAD_CSV_FILES, DOWNLOAD_CSV.CLASSROOM_REPORTS);
        setShowModal(false);
    };

    const handleDownloadCloseWarning = () => {
        setShowModal(false);
    };

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={ 1 }>
                <Grid item md={ 4 } xs={ 4 }>
                    <Heading title={ `My Classes(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                </Grid>
                <Grid item md={ 4.8 } xs={ 4.8 } className={ classes.view } >
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
                            <ToggleButton value={ CLASS_VIEW } selected={ view === CLASS_VIEW }><WysiwygIcon fontSize='small' /></ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item md={ 3.2 } xs={ 3.2 } style={ { textAlign: 'right' } }>
                    { classesData?.length > 0 &&
                        isLoadingDownload ?
                        <Skeleton width={ 30 } height={ 40 } style={ { display: 'inline-block', marginRight: '10px' } } />
                        : <Tooltip title="Download csv" arrow>
                            <StyledButtonIcon variant="outlined" size='small' className={ classes.button } onClick={ handleDownload }><FileDownloadOutlinedIcon fontSize='medium' /></StyledButtonIcon>
                        </Tooltip>
                    }
                    <TextField
                        sx={ { width: '80%' } }
                        placeholder='Search by Class ID'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 7,
                                display: 'inline-flex',
                                fontWeight:500,
                            },
                        } }
                    />
                </Grid>
            </Grid>
            <AddButtonBottom>
                <CreateDrawer
                    title="Create Class"
                    isShowAddIcon={ true }>
                    <MyClassesForm />
                </CreateDrawer>
            </AddButtonBottom>
            { view === CLASS_VIEW && (isLoading || isLoadingClassDelete) ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><CardInfoSkeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><CardInfoSkeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><CardInfoSkeleton /></Grid>
                </Grid> :
                <>
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
                </>
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
        ClearAssignment: () => dispatch(ClearAssignment()),
        ClearStudent: () => dispatch(ClearStudent()),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

MyClasses.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);


