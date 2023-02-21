import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, EditAccount, DropdownList, FolderPathList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/reseller-ref-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';

const RefForm = ({
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
            EditAccount(END_POINTS.RESELLER_PRO_LICENSES + '/' + editData?.lid, END_POINTS.RESELLER_PRO, requestData);
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
            CreateAccount(END_POINTS.RESELLER_PRO_LICENSES, END_POINTS.RESELLER_PRO, requestData);
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
                'department': editData.department,
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
                'department',
                'grammarAccess',
                'grammar',
                'institutionType',
                'timeZone',
            ];
            fields.forEach(field => { setValue(field, a[field]); });
            modifyFormField('Edit Pro Account', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Pro Account', false);
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
    folderList: state?.superAdmin?.folderListSuccess,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAccount: (url, getUrl, data) => dispatch(CreateAccount(url, getUrl, data)),
        EditAccount: (url, getUrl, data) => dispatch(EditAccount(url, getUrl, data)),
        DropdownList: (url) => dispatch(DropdownList(url)),
        FolderPathList: () => dispatch(FolderPathList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefForm);