import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, EditAccount, DropdownList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/super-admin-reseller-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';

const ResellerForm = ({
    CreateAccount,
    DropdownList,
    dpList,
    isLoadingCreate,
    isLoadingEdit,
    editData,
    EditAccount,
}) => {
    const [formJsonField, setFormJsonField] = useState(FormJson);
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        DropdownList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DROPDOWN_LIST);
    }, []);

    useEffect(() => {
        let timeZoneLists = [];
        let resellerLists = [];
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'timeZone') {
                dpList?.timeZoneList?.map((item) => {
                    timeZoneLists.push({ 'name': item?.zone });
                });
                formItem['options'] = timeZoneLists;
            }
            if (formItem.name === 'acc_manager') {
                dpList && dpList?.resellerList?.map((item) => {
                    resellerLists.push({ 'name': item });
                });
                formItem['options'] = resellerLists;
            }
            return formItem;
        });
        setFormJsonField(formList);
    }, [dpList]);

    const onSubmit = (data) => {
        if (editOperation) {
            let DetailedData = {
                ...data,
                'expiry_date': convertDate(data?.expiry_date),
                'acc_manager': data?.acc_manager?.name,
                'timeZone': data?.timeZone?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            EditAccount(END_POINTS.SUPER_ADMIN_CREATE_EDIT_RESELLER + '/' + editData?.lid, END_POINTS.SUPER_ADMIN_RESELLER, requestData);
        } else {
            let DetailedData = {
                ...data,
                'expiry_date': convertDate(data?.expiry_date),
                'acc_manager': data?.acc_manager?.name,
                'timeZone': data?.timeZone?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            CreateAccount(END_POINTS.SUPER_ADMIN_CREATE_EDIT_RESELLER, END_POINTS.SUPER_ADMIN_RESELLER, requestData);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            if (field.name === 'organisation_name') {
                field.disabled = isNameDisabled;
            }
            if (field.name === 'email') {
                field.disabled = isNameDisabled;
            }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        if (editData) {
            let a = {
                'organisation_name': editData.college_name,
                'name': editData.name,
                'email': editData.email,
                'designation': editData.designation,
                'state': editData.state,
                'country': editData.country,
                'address': editData.address,
                'expiry_date': convertDate(editData.expiry_date),
                'phone': editData.phone,
                'acc_manager': { 'name': editData.acc_manager },
                'timeZone': { 'name': editData.timeZone },
            };
            const fields = [
                'organisation_name',
                'name',
                'email',
                'designation',
                'state',
                'country',
                'address',
                'expiry_date',
                'phone',
                'acc_manager',
                'timeZone',
            ];
            fields.forEach(field => { setValue(field, a[field]); });
            modifyFormField('Edit Reseller Account', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Reseller Account', false);
        }
    }, [editData]);

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { formJsonField?.map((field, i) => (
                        <Grid key={ field?.name } md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoadingCreate || isLoadingEdit }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    dpList: state?.superAdmin?.ListSuccess,
    isLoadingCreate: state?.superAdmin?.isLoadingCreate,
    isLoadingEdit: state?.superAdmin?.isLoadingEdit,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAccount: (url, getUrl, data) => dispatch(CreateAccount(url, getUrl, data)),
        EditAccount: (url, getUrl, data) => dispatch(EditAccount(url, getUrl, data)),
        DropdownList: (url) => dispatch(DropdownList(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResellerForm);