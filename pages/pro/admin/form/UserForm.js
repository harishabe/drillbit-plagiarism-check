import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateInstructorData, EditData } from '../../../../redux/action/admin/AdminAction';
import FormJson from '../../../../constant/form/instructor-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { convertDate } from '../../../../utils/RegExp';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
import { BASE_URL_PRO, BASE_URL_SUPER } from '../../../../utils/BaseUrl';
import { FORM_VALIDATION } from '../../../../constant/data/Constant';

const UserForm = ({
    CreateInstructorData,
    isLoading,
    licenseExpiryDate,
    editData,
    EditData,
    remainingDocuments,
    remainingGrammar,
    licenseId
}) => {

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
        if (licenseExpiryDate?.license_expiry_date !== undefined) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['minDate'] = new Date();
                    item['maxDate'] = new Date(licenseExpiryDate?.license_expiry_date);
                }
                return item;
            });
            setFormJsonField(fields);
        }

        if (allocationDocs !== undefined) {
            if (allocationDocs > (editData ? remainingDocuments + editData?.total_submissions : remainingDocuments)) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism') {
                        item['errorMsg'] = FORM_VALIDATION.REMAINING_DOCUMENTS;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else if (allocationDocs <= editData?.used_submissions) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism' && editData?.used_submissions > 0) {
                        item['errorMsg'] = `Already ${editData?.used_submissions} submission uploaded, please choose more than that`;
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
            if (grammarDocs > (editData ? remainingGrammar + editData?.total_grammar : remainingGrammar)) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                        item['errorMsg'] = FORM_VALIDATION.REMAINING_GRAMMAR;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else if (grammarDocs <= editData?.used_grammar) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar' && editData?.used_grammar > 0) {
                        item['errorMsg'] = `Already ${editData?.used_grammar} grammer submission uploaded, please choose more than that`;
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

        if ((new Date(expiryDate) > new Date(licenseExpiryDate?.license_expiry_date))) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = FORM_VALIDATION.EXPIRY_DATE_GREATER;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if ((new Date() > new Date(expiryDate)) && !(new Date(expiryDate) > new Date(licenseExpiryDate?.license_expiry_date))) {
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

        if (allocationDocs <= (editData ? remainingDocuments + editData?.total_submissions : remainingDocuments) && grammarDocs <= (editData ? remainingGrammar + editData?.total_grammar : remainingGrammar) && (new Date(expiryDate) <= new Date(licenseExpiryDate?.license_expiry_date) && (new Date() < new Date(expiryDate)))) {
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

        // if (editData) {
        //     if (allocationDocs > (editData?.used_submissions) && grammarDocs > (editData?.used_grammar)) {
        //         let fields = FormJson?.map((item) => {
        //             if (item?.field_type === 'button') {
        //                 item['isDisabled'] = false;
        //             }
        //             return item;
        //         });
        //         setFormJsonField(fields);
        //     } else {
        //         let fields = FormJson?.map((item) => {
        //             if (item?.field_type === 'button') {
        //                 item['isDisabled'] = true;
        //             }
        //             return item;
        //         });
        //         setFormJsonField(fields);
        //     }
        // }

    }, [allocationDocs, grammarDocs, expiryDate]);

    const onSubmit = (data) => {
        if (editOperation) {
            let Detaileddata = { ...data, 'expiry_date': convertDate(data.expiry_date) };
            let requestData = Object.entries(Detaileddata).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});
            if (licenseId) {
                EditData(BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${licenseId}/users/${editData?.user_id}`, requestData, 'superUser');
            } else {
                EditData(BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER_EDIT_DATA + editData?.user_id, requestData, 'user');
            }
        } else {
            let Detaileddata = { ...data, 'expiry_date': convertDate(data.expiry_date) };
            let requestData = Object.entries(Detaileddata).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)),{});
            if (licenseId) {
                CreateInstructorData(BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${licenseId}/user`, requestData);
            } else {
                CreateInstructorData(BASE_URL_PRO + END_POINTS_PRO.CREATE_USER, requestData);
            }
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
                field['info'] = '* Note : Document remaining: ' + (editData ? remainingGrammar + editData?.total_grammar : remainingGrammar) + (editData?.used_grammar !== undefined ? ', Grammar submission uploaded: ' + editData?.used_grammar : '');
            }
            if (field.name === 'plagiarism') {
                field['info'] = '* Note : Document remaining: ' + (editData ? remainingDocuments + editData?.total_submissions : remainingDocuments) + (editData?.used_submissions !== undefined ? ', Submission uploaded: ' + editData?.used_submissions : '');
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
                'plagiarism': editData.total_submissions,
                'grammar': editData.total_grammar
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
            modifyFormField('Edit User', true);
            setEditOperation(true);
        } else {
            let a = {
                'expiry_date': convertDate(licenseExpiryDate?.license_expiry_date),
            };
            const fields = [
                'expiry_date',
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Create User', false);
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
    remainingDocuments: state?.detailsData?.instructorData?.remainingDocuments,
    remainingGrammar: state?.detailsData?.instructorData?.remainingGrammar,
    licenseExpiryDate: state?.detailsData?.instructorData
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateInstructorData: (url, data) => dispatch(CreateInstructorData(url, data)),
        EditData: (url, data, API_END_POINT) => dispatch(EditData(url, data, API_END_POINT)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);