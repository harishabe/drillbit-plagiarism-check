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
        if (editOperation) {
            data['end_date'] = convertDate(data.expiry_date);
            data['exclude_refernces'] = data.exclude_refernces;
            data['exclude_quotes'] = data.exclude_quotes;
            data['exclude_small_sources'] = data.exclude_small_sources;
            data['exclude_include_sources'] = data.exclude_include_sources;
            data['grammar_check'] = data.grammar_check;
            data['exclude_phrases'] = data.exclude_phrases;
            data['db_studentpaper'] = data.db_studentpaper;
            data['db_publications'] = data.db_publications;
            data['db_internet'] = data.db_internet;
            data['institution_repository'] = data.institution_repository;
            data['repository_scope'] = data.repository_scope.name;
            delete data.expiry_date;
            EditFolder(clasId, editData?.folder_id, data);
        } else {
            let Detaileddata = {
                ...data,
                "end_date": convertDate(data.expiry_date),
                'exclude_refernces': data.exclude_refernces,
                'exclude_quotes': data.exclude_quotes,
                'exclude_small_sources': data.exclude_small_sources,
                'exclude_include_sources': data.exclude_include_sources,
                'grammar_check': data.grammar_check,
                'exclude_phrases': data.exclude_phrases,
                'db_studentpaper': data.db_studentpaper,
                'db_publications': data.db_publications,
                'db_internet': data.db_internet,
                'institution_repository': data.institution_repository,
                'repository_scope': data.repository_scope.name
            }
            delete Detaileddata.expiry_date;
            CreateFolder(clasId, Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'assignment_name') {
                field.disabled = isNameDisabled;
            }
            if (field.name === 'end_date') {
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
                'assignment_name': editData.folder_name,
                'expiry_date': convertDate(editData.end_date),
                'exclude_refernces': editData.exclude_refernces,
                'exclude_quotes': editData.exclude_quotes,
                'exclude_small_sources': editData.exclude_small_sources,
                'exclude_include_sources': editData.exclude_include_sources,
                'grammar_check': editData.grammar_check,
                'exclude_phrases': editData.exclude_phrases,
                'db_studentpaper': editData.db_studentpaper,
                'db_publications': editData.db_publications,
                'db_internet': editData.db_internet,
                'institution_repository': data.institution_repository,
                'repository_scope': data.repository_scope.name
            };
            const fields = [
                'assignment_name',
                'expiry_date',
                "exclude_refernces",
                "exclude_quotes",
                "exclude_small_sources",
                "exclude_include_sources",
                "grammar_check",
                "exclude_phrases",
                "db_studentpaper",
                "db_publications",
                "db_internet",
                "institution_repository",
                "repository_scope",
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