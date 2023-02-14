import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, EditAccount, DropdownList, FolderPathList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/reseller-extreme-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';

const ExtremeForm = ({
    CreateAccount,
    isLoadingCreate,
    isLoadingEdit,
    editData,
    EditAccount,
    DropdownList,
    FolderPathList,
    dpList,
    folderList
}) => {
    const [formJsonField, setFormJsonField] = useState(FormJson);
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        DropdownList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DROPDOWN_LIST);
        FolderPathList();
    }, []);

    useEffect(() => {
        let InstitutionTypes = [];
        let timeZoneLists = [];
        let folderTypes = [];
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
            if (formItem.name === 'folpath') {
                folderList && Object.entries(folderList)?.map(([key, val] = entry) => {
                    folderTypes.push({ 'name': val });
                });
                formItem['options'] = folderTypes;
            }
            return formItem;
        });
        setFormJsonField(formList);
    }, [dpList, folderList]);

    const onSubmit = (data) => {
        if (editOperation) {
            let DetailedData = {
                ...data,
                'endDate': convertDate(data?.endDate),
                'startDate': convertDate(data?.startDate),
                'grammarAccess': data?.grammarAccess?.name,
                'folpath': data?.folpath?.name,
                'institutionType': data?.institutionType?.name,
                'licenseType': data?.licenseType?.name,
                'timeZone': data?.timeZone?.name,
                'updateExpiryDateToAll': data?.updateExpiryDateToAll?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            EditAccount(END_POINTS.RESELLER_EXTREME_LICENSES + '/license/' + editData?.lid, END_POINTS.RESELLER_EXTREME_LICENSES, requestData);
        } else {
            let DetailedData = {
                ...data,
                'endDate': convertDate(data?.endDate),
                'startDate': convertDate(data?.startDate),
                'grammarAccess': data?.grammarAccess?.name,
                'folpath': data?.folpath?.name,
                'institutionType': data?.institutionType?.na0me,
                'licenseType': data?.licenseType?.name,
                'timeZone': data?.timeZone?.name,
                'updateExpiryDateToAll': data?.updateExpiryDateToAll?.name,
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
            if (field.name === 'folpath') {
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
                'documentlength': editData.document_type,
                'folpath': { 'name': editData.folpath },
                'department': editData.department,
                'grammarAccess': { 'name': editData.grammar },
                'grammar': editData.grammar_documents,
                'institutionType': { 'name': editData.product_type },
                'licenseType': { 'name': editData.license_type },
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
                'folpath',
                'department',
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
    folderList: state?.superAdmin?.folderListSuccess,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAccount: (url, data) => dispatch(CreateAccount(url, data)),
        EditAccount: (url, getUrl, data) => dispatch(EditAccount(url, getUrl, data)),
        DropdownList: (url) => dispatch(DropdownList(url)),
        FolderPathList: () => dispatch(FolderPathList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtremeForm);