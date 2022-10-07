import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateInstructorData, EditData } from '../../../../redux/action/admin/AdminAction';
import FormJson from '../../../../constant/form/instructor-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { convertDate } from '../../../../utils/RegExp';
import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';

const InstructorForm = ({
    CreateInstructorData,
    isLoading,
    licenseExpiryDate,
    editData,
    EditData,
    remainingDocuments,
    remainingGrammar
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
        if (allocationDocs !== undefined) {
            if (allocationDocs > remainingDocuments) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'plagiarism') {
                        item['errorMsg'] = 'The entered documents should not be more than available documents';
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = true;
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
            if (grammarDocs > remainingGrammar) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'grammar') {
                        item['errorMsg'] = 'The entered documents should not be more than available documents';
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = true;
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

        if ((new Date(expiryDate).getTime() > new Date(licenseExpiryDate?.license_expiry_date).getTime())) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = 'The entered date should not be greater than the expiry date.';
                }
                if (item?.field_type === 'button') {
                    item['isDisabled'] = true;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if ((new Date().getTime() > new Date(expiryDate).getTime()) && !(new Date(expiryDate).getTime() > new Date(licenseExpiryDate?.license_expiry_date).getTime())) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'datepicker') {
                    item['info'] = 'The entered date should not less than the current date.';
                }
                if (item?.field_type === 'button') {
                    item['isDisabled'] = true;
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

        if (allocationDocs <= remainingDocuments && grammarDocs <= remainingGrammar &&
            new Date(expiryDate).getTime() <= new Date(licenseExpiryDate?.license_expiry_date).getTime()) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = new Date().getTime() > new Date(expiryDate).getTime() ? true : false;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if (allocationDocs <= remainingDocuments && grammarDocs <= remainingGrammar && (new Date().getTime() < new Date(expiryDate).getTime())) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = new Date(expiryDate).getTime() <= new Date(licenseExpiryDate?.license_expiry_date).getTime() ? true : false;
                }
                return item;
            });
            setFormJsonField(fields);
        }
    }, [allocationDocs, grammarDocs, expiryDate]);

    const onSubmit = (data) => {
        if (editOperation) {
            data['expiry_date'] = convertDate(data.expiry_date);
            EditData(BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR_EDIT_DATA + 'instructor/' + editData?.user_id, data, 'instructor');
        } else {
            let Detaileddata = { ...data, 'expiry_date': convertDate(data.expiry_date) };
            CreateInstructorData(BASE_URL_EXTREM + END_POINTS.CREATE_INSTRUCTOR, Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel, isEmailDisabled) => {
        let formField = formJsonField?.map((field) => {
            // if (field.name === 'expiry_date') {
            //     field.minDate = false;
            // }
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            if (field.type === 'email') {
                field.disabled = isEmailDisabled;
            }
            if (field.name === 'grammar') {
                field['info'] = '* Note : Document remaining-' + remainingGrammar;
            }
            if (field.name === 'plagiarism') {
                field['info'] = '* Note : Document remaining-' + remainingDocuments;
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
                'expiry_date': convertDate(editData.expiry_date),
                'plagiarism': editData.plagairism,
                'grammar': editData.grammar
            };
            const fields = [
                'name',
                'email',
                'expiry_date',
                'plagiarism',
                'grammar'
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Edit Instructor', true);
            setEditOperation(true);           
        } else {
            let a = {
                'expiry_date': convertDate(licenseExpiryDate?.license_expiry_date),
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
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formJsonField?.map((field, i) => (
                        <Grid md={12} style={{ marginLeft: '8px' }}>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                                isLoading={isLoading}
                            />
                        </Grid>
                    ))}
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.adminCrud?.isLoading,
    remainingDocuments: state?.detailsData?.instructorData?.remainingDocuments,
    remainingGrammar: state?.detailsData?.instructorData?.remainingGrammar,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateInstructorData: (url, data) => dispatch(CreateInstructorData(url, data)),
        EditData: (url, data, API_END_POINT) => dispatch(EditData(url, data, API_END_POINT)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorForm);