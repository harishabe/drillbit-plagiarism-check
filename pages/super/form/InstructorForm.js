import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateInstructorData, EditData } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/instructor-form.json';
import { AddImageIcon } from '../../../assets/icon';
import { convertDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { FORM_VALIDATION } from '../../../constant/data/Constant';

const InstructorForm = ({
    CreateInstructorData,
    isLoading,
    editData,
    EditData,
    superAdminRemainingDocuments,
    superAdminRemainingGrammar,
    superAdminLicenseExpiryDate,
}) => {

    const router = useRouter();
    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const expiryDate = useWatch({
        control,
        name: 'expiry_date',
    });

    const allocationDocs = useWatch({
        control,
        name: 'plagiarism',
    });

    const grammarDocs = useWatch({
        control,
        name: 'grammar',
    });

    useEffect(() => {
        if (superAdminLicenseExpiryDate !== undefined) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['minDate'] = new Date();
                    item['maxDate'] = new Date(superAdminLicenseExpiryDate);
                }
                return item;
            });
            setFormJsonField(fields);
        }

        if (allocationDocs !== undefined) {
            if (allocationDocs > superAdminRemainingDocuments) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism') {
                        item['errorMsg'] = FORM_VALIDATION.REMAINING_DOCUMENTS;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism') {
                        item['errorMsg'] = '';
                    }
                    return item;
                });
                setFormJsonField(fields);
            }
        }

        if (grammarDocs !== undefined) {
            if (grammarDocs > superAdminRemainingGrammar) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                        item['errorMsg'] = FORM_VALIDATION.REMAINING_GRAMMAR;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                        item['errorMsg'] = '';
                    }
                    return item;
                });
                setFormJsonField(fields);
            }
        }

        if ((new Date(expiryDate) > new Date(superAdminLicenseExpiryDate))) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = FORM_VALIDATION.EXPIRY_DATE_GREATER;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if ((new Date() > new Date(expiryDate)) && !(new Date(expiryDate) > new Date(superAdminLicenseExpiryDate))) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = FORM_VALIDATION.EXPIRY_DATE_LESSER;
                }
                return item;
            });
            setFormJsonField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = '';
                }
                return item;
            });
            setFormJsonField(fields);
        }

        if (allocationDocs <= superAdminRemainingDocuments && grammarDocs <= superAdminRemainingGrammar && (new Date(expiryDate) <= new Date(superAdminLicenseExpiryDate) && (new Date() < new Date(expiryDate)))) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = false;
                }
                return item;
            });
            setFormJsonField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        }

    }, [allocationDocs, grammarDocs, expiryDate]);

    const onSubmit = (data) => {
        if (editOperation) {
            let Detaileddata = {
                ...data, 'expiry_date': convertDate(data.expiry_date),
            };
            let requestData = Object.entries(Detaileddata).reduce((newObj, [key, value]) => (value == '' || value == null ? newObj : (newObj[key] = value, newObj)), {});

            EditData(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/instructors/${editData?.user_id}`, requestData, 'superInstructor');
        } else {
            let Detaileddata = {
                ...data, 'expiry_date': convertDate(data.expiry_date),
            };
            let requestData = Object.entries(Detaileddata).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});

            CreateInstructorData(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/instructor`, requestData);
        }
    };

    const modifyFormField = (buttonLabel, isEmailDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            if (field.type === 'email') {
                field.disabled = isEmailDisabled;
            }
            if (field.name === 'grammar') {
                field['info'] = '* Note : Document remaining-' + superAdminRemainingGrammar;
            }
            if (field.name === 'plagiarism') {
                field['info'] = '* Note : Document remaining-' + superAdminRemainingDocuments;
            }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        if (editData) {
            let superAdminPlagiarism = editData?.superadminplagairism[0]?.props?.children?.props?.children?.[0]?.props?.children?.props?.children
            let superAdminGrammar = editData?.superadmingrammar[0]?.props?.children?.props?.children?.[0]?.props?.children?.props?.children

            let a = {
                'name': editData.name,
                'email': editData.username,
                'department': editData.department === '--' ? '' : editData.department,
                'designation': editData?.designation === null ? '' : editData?.designation,
                'phone_number': editData.phone_number,
                'expiry_date': convertDate(editData.expiry_date),
                'plagiarism': superAdminPlagiarism,
                'grammar': superAdminGrammar
            };
            const fields = [
                'name',
                'email',
                'department',
                'designation',
                'phone_number',
                'expiry_date',
                'plagiarism',
                'grammar'
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Edit Instructor', true);
            setEditOperation(true);
        } else {
            let a = {
                'expiry_date': convertDate(superAdminLicenseExpiryDate),
            };
            const fields = [
                'expiry_date',
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Create Instructor', false);
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
                                isLoading={ isLoading }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.adminCrud?.isLoading,
    superAdminRemainingDocuments: state?.superAdmin?.extInsList?.remainingDocuments,
    superAdminRemainingGrammar: state?.superAdmin?.extInsList?.remainingGrammar,
    superAdminLicenseExpiryDate: state?.superAdmin?.extInsList?.license_expiry_date,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateInstructorData: (url, data) => dispatch(CreateInstructorData(url, data)),
        EditData: (url, data, API_END_POINT) => dispatch(EditData(url, data, API_END_POINT)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorForm);