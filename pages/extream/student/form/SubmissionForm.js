import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormComponent } from '../../../../components';
import FormJson from '../../../../constant/form/student-submission-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { NewSubmission } from '../../../../redux/action/student/StudentAction';
import { UploadNonEnglish, LanguageList } from '../../../../redux/action/common/UploadFile/UploadFileAction';
import { getItemSessionStorage } from '../../../../utils/RegExp';
import { BASE_URL_UPLOAD } from '../../../../utils/BaseUrl'

const SubmissionForm = ({
    NewSubmission,
    UploadNonEnglish,
    LanguageList,
    isLoadingNewSubmission,
    isLoadingNonEng,
    assignmentName,
    dpList
}) => {
    const router = useRouter();
    const [formJsonField, setFormJsonField] = useState(FormJson);
    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const Language = useWatch({
        control,
        name: 'language',
    });



    useEffect(() => {
        if (Language?.name === "Non English") {
            formJsonField.splice(3, 0, {
                "field_type": "dropdown",
                "id": "non_english",
                "name": "non_english",
                "label": "Non English Language *",
                "required": "Language",
                "validationMsg": "Please choose language",
                "options": []
            });
            // setFormJsonField(formList);
            LanguageList();
        }
    }, [Language?.name === "Non English"]);


    useEffect(() => {
        if (Language?.name === "English") {
            let formList = formJsonField.splice(3, 1);
            setFormJsonField(formList);
        }

        // let formField = FormJson?.map((field) => {

        // })
    }, [Language?.name === "English"]);

    useEffect(() => {
        if (dpList !== undefined) {
            let langList = [];
            let formList = FormJson?.map((formItem) => {
                if (formItem.name === 'non_english') {
                    dpList?.map((item) => {
                        langList.push({ 'name': item });
                    });
                    formItem['options'] = langList;
                }
                return formItem;
            });
            setFormJsonField(formList);
        }
    }, [dpList]);

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        if (data?.language?.name === "English") {
            bodyFormData.append('authorName', getItemSessionStorage('name'));
            bodyFormData.append('title', assignmentName);
            bodyFormData.append('language', data?.language?.name);
            bodyFormData.append('file', data.file[0]);
            NewSubmission(bodyFormData, router.query.clasId, router.query.assId);
        } else {
            bodyFormData.append('authorName', getItemSessionStorage('name'));
            bodyFormData.append('title', assignmentName);
            bodyFormData.append('language', data?.non_english?.name);
            bodyFormData.append('file', data.file[0]);
            UploadNonEnglish(BASE_URL_UPLOAD + `/files/classes/${router.query.clasId}/assignments/${router.query.assId}/studentNonEnglishFile`, bodyFormData)
        }
    };

    const modifyFormField = () => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'file') {
                field['info'] = 'Supported files: pdf, doc, docx, txt, rtf, dot, dotx, html, odt, pptx';
            }
            // {
            //     dpList &&
            //     (field.name === 'non_english') ? field['disabled'] = true : field['disabled'] = false
            // }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        let a = {
            'name': getItemSessionStorage('name'),
            'title': assignmentName,
        };
        const fields = [
            'name',
            'title',
        ];
        fields.forEach(field => setValue(field, a[field]));
        // modifyFormField();
    }, []);

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
                                isLoading={ isLoadingNewSubmission || isLoadingNonEng }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingNewSubmission: state?.studentClasses?.isLoadingNewSubmission,
    isLoadingNonEng: state?.uploadFile?.isLoadingNonEng,
    assignmentName: state?.studentClasses?.headerData?.assignmentName,
    dpList: state?.uploadFile?.nonEnglishLang?.non_english_languages,
});

const mapDispatchToProps = (dispatch) => {
    return {
        NewSubmission: (data, class_id, folder_id) => dispatch(NewSubmission(data, class_id, folder_id)),
        UploadNonEnglish: (url, data) => dispatch(UploadNonEnglish(url, data)),
        LanguageList: () => dispatch(LanguageList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);