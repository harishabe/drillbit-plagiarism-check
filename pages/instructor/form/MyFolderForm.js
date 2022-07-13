import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateFolder, EditFolder } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/myfolders-form.json';
import { AddImageIcon } from '../../../assets/icon';
import { convertDate } from '../../../utils/RegExp';

const MyFoldersForm = ({
    isLoading,
    CreateFolder,
    clasId,
    EditFolder,
    editData,
}) => {

    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log("data", data)
        console.log("editData", editData)
        if (editOperation) {
            data['expiry_date'] = convertDate(data.expiry_date);
            data['exclude_refernces'] = "no";
            data['exclude_quotes'] = "no";
            data['exclude_small_sources'] = "no";
            data['exclude_include_sources'] = "yes";
            data['grammar_check'] = "no";
            data['exclude_phrases'] = "no";
            EditFolder(clasId, editData?.folder_id, data);
        } else {
            let Detaileddata = {
                ...data,
                "expiry_date": convertDate(data.expiry_date),
                "exclude_refernces": "no",
                "exclude_quotes": "no",
                "exclude_small_sources": "no",
                "exclude_include_sources": "yes",
                "grammar_check": "no",
                "exclude_phrases": "no",
            }
            CreateFolder(clasId, Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'expiry_date') {
                field.minDate = false;
            }
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            return field;
        });
        setFormJsonField(formField);
    }

    useEffect(() => {
        if (editData) {
            let a = {
                'name': editData.folder_name,
                'expiry_date': convertDate(editData.end_date),
                "exclude_refernces": "no",
                "exclude_quotes": "no",
                "exclude_small_sources": "no",
                "exclude_include_sources": "yes",
                "grammar_check": "no",
                "exclude_phrases": "no",
            };
            const fields = [
                'name',
                'expiry_date',
                "exclude_refernces",
                "exclude_quotes",
                "exclude_small_sources",
                "exclude_include_sources",
                "grammar_check",
                "exclude_phrases",
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Edit Folder');
            setEditOperation(true);
        } else {
            modifyFormField('Create Folder');
        }
    }, [editData]);

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
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
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        CreateFolder: (clasId, data) => dispatch(CreateFolder(clasId, data)),
        EditFolder: (clasId, folderId, requestPayload) => dispatch(EditFolder(clasId, folderId, requestPayload)),
    };
};

export default connect(null, mapDispatchToProps)(MyFoldersForm);