import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Instructor from '../../../layouts/Instructor';
import {
    CardInfoView,
    CreateDrawer,
    WarningDialog,
    CommonTable,
    StatusDot,
    CardView,
    Instructions,
    ErrorBlock,
    EllipsisText,
} from '../../../components';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DeleteWarningIcon } from '../../../assets/icon';
import MyClassesForm from './form/MyclassesForm';
import {
    renameKeys,
    findByExpiryDate,
    expiryDateBgColor,
    formatDate
} from '../../../utils/RegExp';
import { DeleteClass } from '../../../redux/action/instructor/InstructorAction';
import { StyledButtonIcon, StyledButtonRedIcon, PaginationContainer } from '../../../style/index';
import { CLASS_VIEW } from '../../../constant/data/Constant';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { INSTRUCTIONS_STEPS } from '../../../constant/data/InstructionMessage';

const columns = [
    { id: 'class_id', label: 'Class ID', maxWidth: 90 },
    { id: 'class_name', label: 'Class name', maxWidth: 300 },
    { id: 'created_date', label: 'Start date', maxWidth: 165 },
    { id: 'end_date', label: 'Expiry date', maxWidth: 165 },
    { id: 'status', label: 'Status', maxWidth: 130 },
    { id: 'action', label: 'Action', maxWidth: 135 },
];

function createData(class_id, class_name, created_date, end_date, status, action, description, expiry_date) {
    return {
        class_id, class_name, created_date, end_date, status, action, description, expiry_date
    };
}

const MyClassFiles = ({
    classesData,
    pageDetails,
    DeleteClass,
    view,
    search,
    handlePagination,
    handleTableSort,
    isLoading,
    isLoadingClassDelete
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [item, setItem] = useState([]);
    const [editClasses, setEditClasses] = useState(false);
    const [editClassesData, setEditClassesData] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        let row = '';
        let arr = [];
        classesData?.map((item) => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            item['color'] = "#" + randomColor;
            item['validity'] = findByExpiryDate(item.end_date);
            row = renameKeys(item,
                {
                    class_id: 'id',
                    class_name: 'name',
                    creation_date: 'creation_date',
                    end_date: 'end_date',
                    status: 'status',
                    color: 'color',
                    validity: 'validity'
                });
            arr.push(row);
        });
        setItem([...arr]);
    }, [classesData]);


    const handleClassEdit = (e, rowData) => {
        e.preventDefault();
        setEditClasses(true);
        setEditClassesData(rowData);
    };

    const handleClassDelete = (e, data) => {
        e.preventDefault();
        setSelectedClass(data);
        setShowDeleteWarning(true);
    };

    const handleYesWarning = () => {
        DeleteClass((selectedClass.id || selectedClass.class_id));
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleDrawerClose = (drawerClose) => {
        setEditClasses(drawerClose);
    };

    const closeDrawerOnSuccess = (drawerClose) => {
        setEditClasses(drawerClose);
    };

    /** Table implementation functions start*/

    useEffect(() => {
        let row = '';
        let arr = [];
        classesData?.map((classes) => {
            row =
                createData(
                    classes.class_id,
                    <EllipsisText component={ [<WysiwygIcon className='folder-class-icon' fontSize='18px' htmlColor='#56B2EA' />] } value={ classes.class_name } />,
                    formatDate(classes.creation_date),
                    formatDate(classes.end_date),
                    <StatusDot color={ classes.status.toUpperCase() === 'ACTIVE' ? '#38BE62' : '#E9596F' } title={ classes.status }
                    />,
                    [
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><EditOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'edit', 'title': 'Edit'
                        },
                        {
                            'component': <StyledButtonRedIcon variant="outlined" size='small'><DeleteOutlineOutlinedIcon fontSize='small' /></StyledButtonRedIcon>, 'type': 'delete', 'title': 'Delete'
                        },
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><ArrowForwardOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'nextPath', 'title': 'Next'
                        }
                    ],
                    classes.description,
                    classes.end_date
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [classesData]);

    const handleAction = (e, icon, rowData) => {
        if (icon === 'edit') {
            setEditClasses(true);
            setEditClassesData(rowData);
        } else if (icon === 'delete') {
            setSelectedClass(rowData);
            setShowDeleteWarning(true);
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/extream/instructor/my-assignment',
                query: {
                    clasId: rowData.class_id, clasName: rowData?.class_name?.props?.value
                }
            });
        }
    };

    /** Table implementation functions end*/
    return (
        <React.Fragment>
            {
                view === CLASS_VIEW ?
                    <>
                        { search ?
                            <>
                                { item?.length > 0 ?
                                    <Grid container spacing={ 2 }>
                                        { item?.map((item, index) => (
                                            <Grid key={ index } item md={ 4 } xs={ 12 }>
                                                <CardInfoView
                                                    key={ index }
                                                    item={ item }
                                                    isAvatar={ true }
                                                    isHeading={ true }
                                                    isTimer={ true }
                                                    isAction={ true }
                                                    isNextPath={ true }
                                                    isDescription={ true }
                                                    handleClick={ handleClassEdit }
                                                    handleDelete={ handleClassDelete }
                                                    statusColor={ expiryDateBgColor(item.validity) }
                                                    path={ { pathname: '/extream/instructor/my-assignment', query: { clasId: item.id, clasName: item.name } } }
                                                />
                                            </Grid>
                                        )) }
                                    </Grid>
                                    : <CardView>
                                        <ErrorBlock message="No data found" />
                                    </CardView>
                                }
                            </> : <>
                                { item?.length > 0 ?
                                    <Grid container spacing={ 2 }>
                                        { item?.map((item, index) => (
                                            <Grid key={ index } item md={ 4 } xs={ 12 }>
                                                <CardInfoView
                                                    key={ index }
                                                    item={ item }
                                                    isAvatar={ true }
                                                    isHeading={ true }
                                                    isTimer={ true }
                                                    isAction={ true }
                                                    isNextPath={ true }
                                                    isDescription={ true }
                                                    handleClick={ handleClassEdit }
                                                    handleDelete={ handleClassDelete }
                                                    statusColor={ expiryDateBgColor(item.validity) }
                                                    path={ { pathname: '/extream/instructor/my-assignment', query: { clasId: item.id, clasName: item.name } } }
                                                />
                                            </Grid>
                                        )) }
                                    </Grid>
                                    : <CardView>
                                        <Instructions message={ Object.values(INSTRUCTIONS_STEPS.CLASS) } />
                                    </CardView>
                                }

                            </> }
                    </>
                    :
                    <>
                        { search ?
                            <CommonTable
                                isCheckbox={ false }
                                isSorting={ true }
                                isClass={ true }
                                tableHeader={ columns }
                                tableData={ rows }
                                handleAction={ handleAction }
                                handleTableSort={ handleTableSort }
                                isLoading={ isLoading || isLoadingClassDelete }
                                path=''
                            /> :
                            <>
                                { rows.length > 0 ?
                                    <CommonTable
                                        isCheckbox={ false }
                                        isSorting={ true }
                                        isClass={ true }
                                        tableHeader={ columns }
                                        tableData={ rows }
                                        handleAction={ handleAction }
                                        handleTableSort={ handleTableSort }
                                        isLoading={ isLoading || isLoadingClassDelete }
                                        path=''
                                    /> :
                                    <CardView>
                                        <Instructions message={ Object.values(INSTRUCTIONS_STEPS.CLASS) } />
                                    </CardView>
                                }
                            </>
                        }
                    </>
            }

            {
                showDeleteWarning &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
                    message="Are you sure you want to delete ?"
                    handleYes={ handleYesWarning }
                    handleNo={ handleCloseWarning }
                    isOpen={ true }
                />
            }

            {
                editClasses &&
                <CreateDrawer
                    title="Edit Class"
                        isShowAddIcon={ false }
                        showDrawer={ editClasses }
                        handleDrawerClose={ handleDrawerClose }
                        handleCloseDrawer={ closeDrawerOnSuccess }
                >
                    <MyClassesForm
                            editData={ editClassesData }
                            view={ view }
                    />
                </CreateDrawer>
            }


            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    page={ pageDetails?.number + 1 }
                    onChange={ handlePagination }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </React.Fragment>
    );
};


const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.classesData?.page
});

const mapDispatchToProps = (dispatch) => {
    return {
        DeleteClass: (id) => dispatch(DeleteClass(id)),
    };
};

MyClassFiles.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassFiles);

