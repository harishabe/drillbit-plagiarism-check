import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, DropdownList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/extreme-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints'; 

const ExtremeForm = ({
    CreateAccount,
    isLoadingCreate,
    DropdownList,
    dpList
}) => {
    const [formData, setFormData] = useState();
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        DropdownList();
    }, []);

    useEffect(() => {
        let InstitutionTypes = [];
        let timeZoneLists = [];
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'institutionType') {
                dpList?.institutionTypes?.map((item) => {
                    InstitutionTypes.push({ 'name': item });
                });
                formItem['options'] = InstitutionTypes;
            }
            if (formItem.name === 'timeZone') {
                dpList?.timeZoneList?.map((item) => {
                    timeZoneLists.push({ 'name': item?.zone });
                });
                formItem['options'] = timeZoneLists;
            }
            return formItem;
        });
        setFormData(formList);
    }, [dpList]);

    const onSubmit = (data) => {
        let DetailedData = { ...data, 'endDate': convertDate(data.endDate), 'startDate': convertDate(data.startDate) };
        CreateAccount(END_POINTS.SUPER_ADMIN_EXTREME, DetailedData);
    };

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoadingCreate }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingCreate: state?.superAdmin?.isLoadingCreate,
    dpList: state?.superAdmin?.ListSuccess,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAccount: (url, data) => dispatch(CreateAccount(url, data)),
        DropdownList: () => dispatch(DropdownList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtremeForm);