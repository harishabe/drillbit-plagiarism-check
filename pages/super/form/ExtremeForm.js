import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, EditAccount, DropdownList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/extreme-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints'; 

const ExtremeForm = ({
    CreateAccount,
    isLoadingCreate,
    isLoadingEdit,
    editData,
    EditAccount,
    DropdownList,
    dpList
}) => {
    const [formJsonField, setFormJsonField] = useState(FormJson);
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
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
        setFormJsonField(formList);
    }, [dpList]);

    const onSubmit = (data) => {
        if (editOperation) {
            data['startDate'] = convertDate(data.startDate);
            data['endDate'] = convertDate(data.endDate);
            data['grammarAccess'] = data?.grammarAccess;
            data['institutionType'] = data?.institutionType;
            data['licenseType'] = data?.licenseType;
            data['timeZone'] = data?.timeZone;
            EditAccount(END_POINTS.SUPER_ADMIN_EXTREME + '/license/' + editData?.lid, data);
        } else {
            let DetailedData = {
                ...data,
                'endDate': convertDate(data?.endDate),
                'startDate': convertDate(data?.startDate),
                'grammarAccess': data?.grammarAccess,
                'institutionType': data?.institutionType,
                'licenseType': data?.licenseType,
                'timeZone': data?.timeZone,
            };
            CreateAccount(END_POINTS.SUPER_ADMIN_EXTREME, DetailedData);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            if (field.name === 'institutionName') {
                field.disabled = isNameDisabled;
            }
            if (field.name === 'adminEmail') {
                field.disabled = isNameDisabled;
            }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        if (editData) {
            let a = {
                'institutionName': editData.college_name,
                'state': editData.state,
                'country': editData.country,
                'address': editData.address,
                'adminName': editData.name,
                'adminEmail': editData.email,
                'designation': editData.designation,
                'phone': editData.phone,
                'startDate': convertDate(editData.created_date),
                'endDate': convertDate(editData.expiry_date),
                'instructors': editData.instructors,
                'students': editData.students,
                'submissions': editData.documents,
                'documentlength': editData.document_type,
                'grammarAccess': editData.grammar,
                'grammar': editData.grammar_documents,
                'institutionType': editData.product_type,
                'licenseType': editData.license_type,
                'timeZone': editData.timeZone,
            };
            const fields = [
                'institutionName',
                'state',
                'country',
                'address',
                'adminName',
                'adminEmail',
                'designation',
                'phone',
                'startDate',
                'endDate',
                'instructors',
                'students',
                'submissions',
                'documentlength',
                'grammarAccess',
                'grammar',
                'institutionType',
                'licenseType',
                'timeZone',
            ];
            fields.forEach(field => { setValue(field, a[field]); });
            modifyFormField('Edit Extreme Account', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Extreme Account', false);
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
    isLoadingCreate: state?.superAdmin?.isLoadingCreate,
    isLoadingEdit: state?.superAdmin?.isLoadingEdit,
    dpList: state?.superAdmin?.ListSuccess,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAccount: (url, data) => dispatch(CreateAccount(url, data)),
        EditAccount: (url, data) => dispatch(EditAccount(url, data)),
        DropdownList: () => dispatch(DropdownList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtremeForm);