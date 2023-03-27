import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount, EditAccount, DropdownList, FolderPathList } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/ref-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { FORM_VALIDATION } from '../../../constant/data/Constant';

const RefForm = ({
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
    const [reseller, setReseller] = useState('');
    const [resellerId, setResellerId] = useState('');
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const phoneNumber = useWatch({
        control,
        name: 'phone',
    });

    const grammarAccess = useWatch({
        control,
        name: 'grammarAccess',
    });

    useEffect(() => {
        DropdownList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DROPDOWN_LIST);
        FolderPathList();
    }, []);

    useEffect(() => {
        let InstitutionTypes = [];
        let timeZoneLists = [];
        let folderTypes = [];
        let resellerList = [];
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
            if (formItem.name === 'folpath') {
                folderList && Object.entries(folderList)?.map(([key, val] = entry) => {
                    folderTypes.push({ 'name': val });
                });
                formItem['options'] = folderTypes;
            }
            if (formItem.name === 'reseller') {
                dpList?.resellerList?.map((item) => {
                    resellerList.push({ 'id': item?.lid, 'name': item?.organisation_name });
                });
                formItem['options'] = resellerList;
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
    }, [dpList, folderList, editData]);

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
                'reseller': data?.reseller?.id ? data?.reseller?.id : resellerId,
                'folpath': data?.folpath?.name,
                'institutionType': data?.institutionType?.name,
                'licenseType': data?.licenseType?.name,
                'timeZone': data?.timeZone?.name,
                'updateExpiryDateToAll': data?.updateExpiryDateToAll?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            EditAccount(END_POINTS.SUPER_ADMIN_REF + '/' + editData?.lid, END_POINTS.SUPER_ADMIN_REF_LICENSE, requestData);
        } else {
            let DetailedData = {
                ...data,
                'endDate': convertDate(data?.endDate),
                'startDate': convertDate(data?.startDate),
                'grammarAccess': data?.grammarAccess?.name,
                'documentlength': data?.documentlength?.name,
                'reseller': data?.reseller?.id,
                'folpath': data?.folpath?.name,
                'institutionType': data?.institutionType?.name,
                'licenseType': data?.licenseType?.name,
                'timeZone': data?.timeZone?.name,
                'updateExpiryDateToAll': data?.updateExpiryDateToAll?.name,
            };
            let requestData = Object.entries(DetailedData).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            CreateAccount(END_POINTS.SUPER_ADMIN_REF, END_POINTS.SUPER_ADMIN_REF_LICENSE, requestData);
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

    const resellerName = (id) => {
        dpList?.resellerList?.map((item) => {
            if (id === item?.lid) {
                setReseller(item?.organisation_name)
                setResellerId(item?.lid)
            }
        });
    }

    useEffect(() => {
        if (editData) {
            resellerName(editData.reseller)
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
                'submissions': editData.documents,
                'documentlength': { 'name': editData.document_type },
                'folpath': { 'name': editData.folpath },
                'department': editData.department,
                'grammarAccess': { 'name': editData.grammar.toUpperCase() },
                'grammar': editData.grammar_documents,
                'acc_manager': editData.acc_manager,
                'reseller': { 'name': reseller },
                'institutionType': { 'name': editData.institution_type },
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
                'submissions',
                'documentlength',
                'folpath',
                'department',
                'grammarAccess',
                'grammar',
                'acc_manager',
                'reseller',
                'institutionType',
                'licenseType',
                'timeZone',
            ];
            fields.forEach(field => { setValue(field, a[field]); });
            modifyFormField('Edit Ref Account', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Ref Account', false);
        }
    }, [editData, reseller]);

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formJsonField?.map((field, i) => (
                        <Grid key={field?.name} md={12} style={{ marginLeft: '8px' }}>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                                isLoading={isLoadingCreate || isLoadingEdit}
                            />
                        </Grid>
                    ))}
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