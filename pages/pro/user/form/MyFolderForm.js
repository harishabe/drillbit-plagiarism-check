import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateFolder, EditFolder } from '../../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../../constant/form/pro-user-myfolders-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { BASE_URL_PRO } from '../../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
import { ErrorMessageContainer } from '../../../style/index';
import { DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK } from '../../../../constant/data/ErrorMessage';

const MyFoldersForm = ({
    isLoadingFolder,
    CreateFolder,
    EditFolder,
    editData,
}) => {
    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const [errorMsgDBCheck, setErrorMsgDBCheck] = useState('');

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
            EditFolder(BASE_URL_PRO + END_POINTS_PRO.USER_FOLDER_EDIT_AND_DELETE_DATA + '/' + editData?.folder_id, data);
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
            CreateFolder(BASE_URL_PRO + END_POINTS_PRO.CREATE_FOLDER, Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'folder_name') {
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
                'folder_name': editData.folder_name,
                'exclude_reference': editData?.excludeReferences?.toUpperCase(),
                'exclude_quotes': editData?.excludeQuotes?.toUpperCase(),
                'exclude_small_sources': editData?.excludeSmallSources?.toUpperCase(),
                'grammar_check': editData?.grammarCheck?.toUpperCase(),
                'exclude_phrases': editData?.excludePhrases?.toUpperCase(),
                'db_studentpaper': editData?.db_studentpaper?.toUpperCase(),
                'db_publications': editData?.db_publications?.toUpperCase(),
                'db_internet': editData?.db_internet?.toUpperCase(),
                'institution_repository': editData?.institution_repository?.toUpperCase(),
            };
            const fields = [
                'folder_name',
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

    const db_studentpaper = useWatch({
        control,
        name: "db_studentpaper",
    });

    const db_publications = useWatch({
        control,
        name: "db_publications",
    });

    const db_internet = useWatch({
        control,
        name: "db_internet",
    });

    const institution_repository = useWatch({
        control,
        name: "institution_repository",
    });

    useEffect(() => {
        if (editData) {
            if (editData.db_studentpaper === 'YES' || editData.db_publications === 'YES' || editData.db_internet === 'YES' || editData.institution_repository === 'YES') {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = false;
                    }
                    return item;
                });
                setErrorMsgDBCheck('');
                setFormJsonField(fields);
            }
        } else {
            if (db_studentpaper === 'YES' || db_publications === 'YES' || db_internet === 'YES' || institution_repository === 'YES') {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = false;
                    }
                    return item;
                });
                setErrorMsgDBCheck('');
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = true;
                    }
                    return item;
                });
                setErrorMsgDBCheck(DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK);
                setFormJsonField(fields);
            }
        }
    }, [db_studentpaper, db_publications, db_internet, institution_repository]);

    useEffect(() => {
        if (editData === undefined) {
            let a = {
                'exclude_reference': 'NO',
                'exclude_quotes': 'NO',
                'exclude_small_sources': 'NO',
                'grammar_check': 'NO',
                'exclude_phrases': 'NO',
                'db_studentpaper': 'YES',
                'db_publications': 'YES',
                'db_internet': 'YES',
                'institution_repository': 'YES',
            };
            const fields = [
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
        }
    }, []);

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {FormJson?.map((field, i) => (
                        <>
                            <Grid md={12} style={{ marginLeft: '8px' }}>
                                <FormComponent
                                    key={i}
                                    field={field}
                                    control={control}
                                    isLoading={isLoadingFolder}
                                />
                            </Grid>
                        </>
                    ))}
                </Grid>
            </form>
            <div style={{ marginBottom: '15px' }}>
                {errorMsgDBCheck !== '' ? <ErrorMessageContainer>{errorMsgDBCheck}</ErrorMessageContainer> : ''}
            </div>
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