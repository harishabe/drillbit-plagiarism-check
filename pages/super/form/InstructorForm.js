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
    const [superAdminPlagiarism, setSuperAdminPlagiarism] = useState(editData?.superadminplagairism[0]?.props?.children?.props?.children?.[0]?.props?.children?.props?.children);
    const [superAdminPlagiarismUsed, setSuperAdminPlagiarismUsed] = useState(editData?.superadminplagairism[0]?.props?.children?.props?.children?.[1]?.props?.children?.props?.children);
    const [superAdminGrammar, setSuperAdminGrammar] = useState(editData?.superadmingrammar[0]?.props?.children?.props?.children?.[0]?.props?.children?.props?.children);
    const [superAdminGrammarUsed, setSuperAdminGrammarUsed] = useState(editData?.superadmingrammar[0]?.props?.children?.props?.children?.[1]?.props?.children?.props?.children);

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

    const phoneNumber = useWatch({
        control,
        name: 'phone_number',
    });

    useEffect(() => {
        if ((superAdminLicenseExpiryDate) !== undefined) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['minDate'] = new Date();
                    item['maxDate'] = new Date(superAdminLicenseExpiryDate);
                }
                return item;
            });
            setFormJsonField(fields);
        }

        if (allocationDocs > (editData ? superAdminRemainingDocuments + superAdminPlagiarism : superAdminRemainingDocuments)) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism') {
                    item['errorMsg'] = FORM_VALIDATION.REMAINING_DOCUMENTS;
                }
                if (item?.field_type === 'button') {
                    item['isDisabledAllocDocs'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if (allocationDocs < superAdminPlagiarismUsed) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism' && superAdminPlagiarismUsed > 0) {
                    item['errorMsg'] = `Already ${superAdminPlagiarismUsed} submission uploaded, please choose upto ${superAdminRemainingDocuments + superAdminPlagiarism} documents`;
                }
                if (item?.field_type === 'button') {
                    item['isDisabledAllocDocs'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism') {
                    item['errorMsg'] = '';
                }
                if (item?.field_type === 'button') {
                    item['isDisabledAllocDocs'] = false;
                }
                return item;
            });
            setFormJsonField(fields);
        }

    }, [allocationDocs, superAdminRemainingDocuments])

    useEffect(() => {
        if (grammarDocs > (editData ? (superAdminRemainingGrammar + superAdminGrammar) : superAdminRemainingGrammar)) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                    item['errorMsg'] = FORM_VALIDATION.REMAINING_GRAMMAR;
                }
                if (item?.field_type === 'button') {
                    item['isDisabledGrammarDoc'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if (grammarDocs < superAdminGrammarUsed) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'grammar' && superAdminGrammarUsed > 0) {
                    item['errorMsg'] = `Already ${superAdminGrammarUsed} grammer submission uploaded, please choose upto ${superAdminRemainingGrammar + superAdminGrammar} documents`;
                }
                if (item?.field_type === 'button') {
                    item['isDisabledGrammarDoc'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                    item['errorMsg'] = '';
                }
                if (item?.field_type === 'button') {
                    item['isDisabledGrammarDoc'] = false;
                }
                return item;
            });
            setFormJsonField(fields);
        }
    }, [grammarDocs, superAdminRemainingGrammar])

    useEffect(() => {
        if ((new Date(expiryDate) > new Date(superAdminLicenseExpiryDate))) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = FORM_VALIDATION.EXPIRY_DATE_GREATER;
                }
                if (item?.field_type === 'button') {
                    item['isDisabledDate'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if ((new Date() > new Date(expiryDate)) && !(new Date(expiryDate) > new Date(superAdminLicenseExpiryDate))) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = FORM_VALIDATION.EXPIRY_DATE_LESSER;
                }
                if (item?.field_type === 'button') {
                    item['isDisabledDate'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = '';
                }
                if (item?.field_type === 'button') {
                    item['isDisabledDate'] = false;
                }
                return item;
            });
            setFormJsonField(fields);
        }
    }, [expiryDate])

    useEffect(() => {
        if (phoneNumber !== undefined) {
            if ((phoneNumber?.length >= 1 && phoneNumber?.length < 10) || phoneNumber?.length > 15) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone_number') {
                        item['errorMsg'] = FORM_VALIDATION.PHONE_NUMBER;
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabledPhoneNo'] = true;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone_number') {
                        item['errorMsg'] = '';
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabledPhoneNo'] = false;
                    }
                    return item;
                });
                setFormJsonField(fields);
            }
        }
    }, [phoneNumber])

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
                field['info'] = '* Note : Document remaining: ' + (editData ? superAdminRemainingGrammar + superAdminGrammar : superAdminRemainingGrammar) + (superAdminGrammarUsed !== undefined ? ', Grammar submission uploaded: ' + superAdminGrammarUsed : '');
            }
            if (field.name === 'plagiarism') {
                field['info'] = '* Note : Document remaining: ' + (editData ? superAdminRemainingDocuments + superAdminPlagiarism : superAdminRemainingDocuments) + (superAdminPlagiarismUsed !== undefined ? ', Submission uploaded: ' + superAdminPlagiarismUsed : '');
            }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        if (editData) {
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

    useEffect(() => {
        if (editData) {
            modifyFormField('Edit Instructor', true);
        } else {
            modifyFormField('Create Instructor', false);
        }
    }, [superAdminRemainingDocuments, superAdminRemainingGrammar])

    useEffect(() => {
        let formField = formJsonField?.map((item) => {
            if (item?.field_type === 'button') {
                if (((item?.isDisabledAllocDocs === true) || (item?.isDisabledGrammarDoc === true) ||
                    (item?.isDisabledDate === true) || (item?.isDisabledPhoneNo === true))) {
                    item['isDisabled'] = true;
                } else {
                    item['isDisabled'] = false;
                }
            }
            return item;
        })
        setFormJsonField(formField);
    }, [formJsonField])

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