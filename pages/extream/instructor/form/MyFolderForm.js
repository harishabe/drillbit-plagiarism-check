import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateFolder, EditFolder } from '../../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../../constant/form/myfolders-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';

const MyFoldersForm = ({
    isLoading,
    CreateFolder,
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
            data['exclude_reference'] = data.exclude_reference;
            data['exclude_quotes'] = data.exclude_quotes;
            data['exclude_small_sources'] = data.exclude_small_sources;
            data['grammar_check'] = data.grammar_check;
            data['exclude_phrases'] = data.exclude_phrases;
            data['db_studentpaper'] = data.db_studentpaper;
            data['db_publications'] = data.db_publications;
            data['db_internet'] = data.db_internet;
            data['institution_repository'] = data.institution_repository;
            EditFolder(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA + '/' + editData?.folder_id, data);
        } else {
            let Detaileddata = {
                ...data,
                'exclude_reference': data.exclude_reference,
                'exclude_quotes': data.exclude_quotes,
                'exclude_small_sources': data.exclude_small_sources,
                'grammar_check': data.grammar_check,
                'exclude_phrases': data.exclude_phrases,
                'db_studentpaper': data.db_studentpaper,
                'db_publications': data.db_publications,
                'db_internet': data.db_internet,
                'institution_repository': data.institution_repository,
            }
            CreateFolder(BASE_URL_EXTREM + END_POINTS.CREATE_FOLDER, Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'assignment_name') {
                field.disabled = isNameDisabled;
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
                'exclude_reference': editData.excludeReferences,
                'exclude_quotes': editData.excludeQuotes,
                'exclude_small_sources': editData.excludeSmallSources,
                'grammar_check': editData.grammarCheck,
                'exclude_phrases': editData.excludePhrases,
                'db_studentpaper': editData.db_studentpaper,
                'db_publications': editData.db_publications,
                'db_internet': editData.db_internet,
                'institution_repository': editData.institution_repository,
            };
            const fields = [
                'assignment_name',
                "exclude_reference",
                "exclude_quotes",
                "exclude_small_sources",
                "grammar_check",
                "exclude_phrases",
                "db_studentpaper",
                "db_publications",
                "db_internet",
                "institution_repository",
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
        CreateFolder: (url, data) => dispatch(CreateFolder(url, data)),
        EditFolder: (url, requestPayload) => dispatch(EditFolder(url, requestPayload)),
    };
};

export default connect(null, mapDispatchToProps)(MyFoldersForm);