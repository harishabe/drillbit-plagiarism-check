import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, EditAccount, DropdownList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/reseller-extreme-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { FORM_VALIDATION } from '../../../constant/data/Constant';

const ExtremeForm = ({
    CreateAccount,
    isLoadingCreate,
    isLoadingEdit,
    editData,
    EditAccount,
    DropdownList,
    dpList,
}) => {
    const [formJsonField, setFormJsonField] = useState(FormJson);
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        DropdownList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DROPDOWN_LIST);
    }, []);

    const grammarAccess = useWatch({
        control,
        name: 'grammarAccess',
    });

    const phoneNumber = useWatch({
        control,
        name: 'phone',
    });

    useEffect(() => {
        let InstitutionTypes = [];
        let timeZoneLists = [];
        let grammarAccessValue = [];
        let documentlengthValue = [];
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
            if (formItem.name === 'documentlength') {
                dpList?.documentLength?.map((item) => {
                    documentlengthValue.push({ 'name': item });
                });
                formItem['options'] = documentlengthValue;
            }
            if (formItem.name === 'grammarAccess') {
                dpList?.grammarAccess?.map((item) => {
                    grammarAccessValue.push({ 'name': item });
                });
                formItem['options'] = grammarAccessValue;
            }
            return formItem;
        });
        setFormJsonField(formList);
    }, [dpList]);

    useEffect(() => {
        if (phoneNumber !== undefined) {
            if ((phoneNumber?.length >= 1 && phoneNumber?.length < 10) || phoneNumber?.length > 15) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone') {
                        item['errorMsg'] = FORM_VALIDATION.PHONE_NUMBER;
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = true;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone') {
                        item['errorMsg'] = '';
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = false;
                    }
                    return item;
                });
                setFormJsonField(fields);
            }
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'phone') {
                    item['errorMsg'] = '';
                }
                if (item?.field_type === 'button') {
                    item['isDisabled'] = false;
                }
                return item;
            });
            setFormJsonField(fields);
        }
    }, [phoneNumber])

    useEffect(() => {
        if (grammarAccess?.name !== undefined) {
            if (grammarAccess?.name === 'YES') {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                        item['disabled'] = false;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                        item['disabled'] = true;
                        setValue('grammar', 0);
                    }
                    return item;
                });
                setFormJsonField(fields);
            }
        }
    }, [grammarAccess?.name])

    const onSubmit = (data) => {
        if (editOperation) {
            let DetailedData = {
                ...data,
                'endDate': convertDate(data?.endDate),
                'startDate': convertDate(data?.startDate),
                'grammarAccess': data?.grammarAccess?.name,
                'documentlength': data?.documentlength?.name,
                'institutionType': data?.institutionType?.name,
                'timeZone': data?.timeZone?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            EditAccount(END_POINTS.RESELLER_EXTREME_LICENSES + '/license/' + editData?.lid, END_POINTS.RESELLER_EXTREME_LICENSES, requestData);
        } else {
            let DetailedData = {
                ...data,
                'endDate': convertDate(data?.endDate),
                'startDate': convertDate(data?.startDate),
                'grammarAccess': data?.grammarAccess?.name,
                'documentlength': data?.documentlength?.name,
                'institutionType': data?.institutionType?.name,
                'timeZone': data?.timeZone?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            CreateAccount(END_POINTS.RESELLER_EXTREME_LICENSES, requestData);
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
                'startDate': convertDate(editData.start_date),
                'endDate': convertDate(editData.expiry_date),
                'instructors': editData.instructors,
                'students': editData.students,
                'submissions': editData.documents,
                'documentlength': { 'name': editData.document_type },
                'grammarAccess': { 'name': editData.grammar },
                'grammar': editData.grammar_documents,
                'institutionType': { 'name': editData.product_type },
                'timeZone': { 'name': editData.timeZone },
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
        EditAccount: (url, getUrl, data) => dispatch(EditAccount(url, getUrl, data)),
        DropdownList: (url) => dispatch(DropdownList(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtremeForm);