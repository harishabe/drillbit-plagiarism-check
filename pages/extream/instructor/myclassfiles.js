import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import Instructor from '../../../layouts/Instructor';
import {
    CardInfoView,
    CreateDrawer,
    WarningDialog,
    ErrorBlock
} from '../../../components';
import { DeleteWarningIcon } from '../../../assets/icon';
import MyClassesForm from './form/MyclassesForm';
import {
    renameKeys,
    findByExpiryDate,
    expiryDateBgColor
} from '../../../utils/RegExp';
import { DeleteClass } from '../../../redux/action/instructor/InstructorAction';
import { PaginationContainer } from '../../style/index';
import { CLASS_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const MyClassFiles = ({
    classesData,
    pageDetails,
    DeleteClass,
    handlePagination,
}) => {

    const [item, setItem] = useState([]);
    const [editClasses, setEditClasses] = useState(false);
    const [editClassesData, setEditClassesData] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');


    useEffect(() => {
        let row = '';
        let arr = [];
        const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];
        classesData?.map((item, index) => {
            item['color'] = Colors[index];
            item['validity'] = findByExpiryDate(item.expiry_date);
            row = renameKeys(item,
                {
                    class_id: 'id',
                    class_name: 'name',
                    creation_date: 'creation_date',
                    expiry_date: 'expiry_date',
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
        DeleteClass(selectedClass.id);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleCloseDrawer = (drawerClose) => {
        setEditClasses(drawerClose);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {item?.length > 0 ? item?.map((item, index) => (
                    <Grid key={index} item md={4} xs={12}>
                        <CardInfoView
                            key={index}
                            item={item}
                            isAvatar={true}
                            isHeading={true}
                            isTimer={true}
                            isAction={true}
                            isNextPath={true}
                            isDescription={true}
                            handleClick={handleClassEdit}
                            handleDelete={handleClassDelete}
                            statusColor={expiryDateBgColor(item.validity)}
                            path={ { pathname: '/extream/instructor/my-assignment', query: { clasId: item.id, clasName: item.name } } }
                        />
                    </Grid>
                )) :
                    <Grid item md={12} xs={12}>
                        <ErrorBlock message={CLASS_NOT_FOUND} />
                    </Grid>
                }
            </Grid>

            {
                showDeleteWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message="Are you sure you want to delete ?"
                    handleYes={handleYesWarning}
                    handleNo={handleCloseWarning}
                    isOpen={true}
                />
            }


            <AddButtonBottom>
                <CreateDrawer
                    title="Create Class"
                    isShowAddIcon={true}>
                    <MyClassesForm />
                </CreateDrawer>
            </AddButtonBottom>

            {
                editClasses &&
                <CreateDrawer
                    title="Edit Class"
                    isShowAddIcon={false}
                    showDrawer={editClasses}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <MyClassesForm
                        editData={editClassesData}
                    />
                </CreateDrawer>
            }


            <PaginationContainer>
                <Pagination
                    count={pageDetails?.totalPages}
                    page={pageDetails?.number + 1}
                    onChange={handlePagination}
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

