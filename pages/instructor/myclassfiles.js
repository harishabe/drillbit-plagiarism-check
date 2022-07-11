import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import Instructor from '../../layouts/Instructor';
import { CardInfoView, CreateDrawer } from '../../components';
import { PaginationValue } from '../../utils/PaginationUrl';
import { Skeleton } from '@mui/material';
import MyClassesForm from './form/MyclassesForm';
import { renameKeys, findByExpiryDate, expiryDateBgColor } from '../../utils/RegExp';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const MyClassFiles = ({
    GetClassesData,
    classesData,
    pageDetails,
    isLoading,
}) => {

    const [item, setItem] = useState([]);
    const [editClasses, setEditClasses] = useState(false);
    const [editClassesData, setEditClassesData] = useState('');

    const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];

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
                })
            arr.push(row)
        });
        setItem([...arr]);
    }, [classesData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleClick = (event, rowData) => {
        setEditClasses(true);
        setEditClassesData(rowData);
    };


    return (
        <React.Fragment>
            { isLoading ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                </Grid> :
                <>
                    <Grid container spacing={ 2 }>

                        { item?.map((item, index) => (
                            <Grid item md={ 4 } xs={ 12 }>
                                <CardInfoView
                                    key={ index }
                                    item={ item }
                                    isAvatar={ true }
                                    isHeading={ true }
                                    isTimer={ true }
                                    isAction={ true }
                                    handleClick={ handleClick }
                                    statusColor={ expiryDateBgColor(item.validity) }
                                    path={ { pathname: '/instructor/myclasstables', query: { clasId: item.id } } }
                                />
                            </Grid>
                        )) }
                    </Grid>

                    <AddButtonBottom>
                        <CreateDrawer
                            title="Create Class"
                            isShowAddIcon={ true }>
                            <MyClassesForm />
                        </CreateDrawer>
                    </AddButtonBottom>

                    {
                        editClasses &&
                        <CreateDrawer
                            title="Edit Class"
                            isShowAddIcon={ false }
                            showDrawer={ editClasses }
                        >
                            <MyClassesForm
                                editData={ editClassesData }
                            />
                        </CreateDrawer>
                    }
                </>
            }

            <div style={ { marginLeft: '45%', marginTop: '25px' } }>
                <Pagination
                    count={ pageDetails?.totalPages }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </React.Fragment>
    );
};

MyClassFiles.layout = Instructor;

export default MyClassFiles;
