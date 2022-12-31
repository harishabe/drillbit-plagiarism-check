import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent, DialogModal, CommonTable } from '../../../components';
import { CreateAccount } from '../../../redux/action/super/SuperAdminAction';
import FormJson from '../../../constant/form/super-admin-search-form.json';

function createData(name, details) {
    return { name, details };
};

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'details', label: 'Details' },
];

const EmailForm = ({
    onSearch,
    globalData,
    closeSearchDialog,
    isLoadingList
}) => {
    const [rows, setRows] = useState([]);
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        let row = [
            createData('Institution Name:', globalData?.college_name),
            createData('Product:', globalData?.product_type),
        ];
        setRows([...row]);
    }, [globalData]);

    return (
        <>
            <DialogModal
                isOpen={ true }
                fullWidth="sm"
                maxWidth="sm"
                handleClose={ closeSearchDialog }
            >
                { globalData !== '' &&
                    <CommonTable
                        isCheckbox={ false }
                        tableHeader={ columns }
                        tableData={ rows }
                        charLength={ 50 }
                        path=''
                    />
                }
                <form onSubmit={ handleSubmit(onSearch) }>
                    <Grid container>
                        { FormJson?.map((field, i) => (
                            <Grid key={ field?.name } md={ 12 } style={ { marginLeft: '8px' } }>
                                <FormComponent
                                    key={ i }
                                    field={ field }
                                    control={ control }
                                    isLoading={ isLoadingList }
                                />
                            </Grid>
                        )) }
                    </Grid>
                </form>
            </DialogModal>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingSend: state?.superAdmin?.isLoadingSend,
});

export default connect(mapStateToProps, {})(EmailForm);