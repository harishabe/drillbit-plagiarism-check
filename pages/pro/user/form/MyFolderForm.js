import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateFolder, EditFolder } from '../../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../../constant/form/pro-user-myfolders-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { convertDate } from '../../../../utils/RegExp';
import { BASE_URL_PRO } from '../../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../../utils/EndPointPro';

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
            data['end_date'] = convertDate(data.expiry_date);
            data['exclude_reference'] = data.exclude_reference;
            data['exclude_quotes'] = data.exclude_quotes;
            data['exclude_small_sources'] = data.exclude_small_sources;
            data['grammar_check'] = data.grammar_check;
            data['exclude_phrases'] = data.exclude_phrases;
            data['db_studentpaper'] = data.db_studentpaper;
            data['db_publications'] = data.db_publications;
            data['db_internet'] = data.db_internet;
            data['institution_repository'] = data.institution_repository;
            delete data.expiry_date;
            EditFolder(BASE_URL_PRO + END_POINTS_PRO.USER_FOLDER_EDIT_AND_DELETE_DATA + '/' + editData?.folder_id, data);
        } else {
            let Detaileddata = {
                ...data,
                'end_date': convertDate(data.expiry_date),
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
            delete Detaileddata.expiry_date;
            CreateFolder(BASE_URL_PRO + END_POINTS_PRO.CREATE_FOLDER, Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'folder_name') {
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
            console.log("editData", editData)
            let a = {
                'folder_name': editData.folder_name,
                'expiry_date': convertDate(editData.end_date),
                'exclude_reference': editData.ex_references,
                'exclude_quotes': editData.ex_quotes,
                'exclude_small_sources': editData.small_sources,
                'grammar_check': editData.grammar,
                'exclude_phrases': editData.ex_phrases,
                'db_studentpaper': editData.db_studentpaper,
                'db_publications': editData.db_publications,
                'db_internet': editData.db_internet,
                'institution_repository': editData.institution_repository,
            };
            const fields = [
                'folder_name',
                'expiry_date',
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