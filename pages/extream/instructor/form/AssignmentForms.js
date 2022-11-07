import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { AddImageIcon } from '../../../../assets/icon';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import InputDatePicker from '../../../../components/form/elements/InputDatePicker';
import InputTextField from '../../../../components/form/elements/InputTextField';
import InputNumberField from '../../../../components/form/elements/InputNumberField';
import InputFileType from '../../../../components/form/elements/InputFileType';
import InputAutoComplete from '../../../../components/form/elements/InputAutoComplete';
import InputButton from '../../../../components/form/elements/InputButton';
import { CreateAssignment, EditAssignment } from '../../../../redux/action/instructor/InstructorAction';
import { convertDate } from '../../../../utils/RegExp';
import { ASSIGNMENT_SETTING_VALUE_YES, ASSIGNMENT_SETTING_VALUE_NO } from '../../../../constant/data/Constant';
import { DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK } from '../../../../constant/data/ErrorMessage';
import { ErrorMessageContainer } from '../../../../style/index';
import { Tooltip } from '@mui/material';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#fff !important',
        backgroundColor: '#3672FF !important    '
    }
});

const useStyles = makeStyles(() => ({
    helperText: {
        marginLeft: 0
    }
}));

const AssignmentForms = ({
    CreateAssignment,
    EditAssignment,
    editData,
    isLoading,
}) => {
    const router = useRouter();

    const [showSetting, setShowSetting] = React.useState(false);
    const [allowAssGrade, setAllowAssGrade] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludeRefBib, setExcludeRefBib] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludeQuote, setExcludeQuote] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludeSmallSource, setExcludeSmallSource] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [saveToRepo, setSaveToRepo] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [allowSubmission, setAllowSubmission] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [allowSubmissionDueDate, setAllowSubmissionDueDate] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [grammarCheck, setGrammarCheck] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [choiceEmailNotification, setChoiceEmailNotification] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [addQuestion, setAddQuestion] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludePhrases, setExcludePhrases] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [reportAccess, setReportAccess] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [studentPaper, setStudentPaper] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);
    const [publication, setPublication] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);
    const [internet, setInternet] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);
    const [repository, setRepository] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);

    const [questionList, setQuestionList] = React.useState([{
        'q': ''
    }]);

    const [phrasesList, setPhrasesList] = React.useState([{
        'p': ''
    }]);

    const [dailySubmissionLimit, setDailySubmissionLimit] = React.useState(0);
    const [disabledButton, setDisabledButton] = React.useState(false);
    const [errorMsgDBCheck, setErrorMsgDBCheck] = useState('');
    const [btnLabel, setBtnLabel] = useState('Submit');
    const [editOperation, setEditOperation] = useState(false);


    const { control, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        if (editOperation) {
            editAssignments(data);
        } else {
            let bodyFormData = new FormData();
            if (showSetting) {
                bodyFormData.append('assignment_name', data.assignment_name);
                bodyFormData.append('start_date', convertDate(data.start_date));
                bodyFormData.append('end_date', convertDate(data.end_date));
                if (data.file !== undefined) {
                    bodyFormData.append('file', data?.file[0]);
                }
                bodyFormData.append('exclude_references', excludeRefBib === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('exclude_quotes', excludeQuote === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('exclude_small_sources', excludeSmallSource === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('assignment_grading', allowAssGrade === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                if (allowAssGrade === ASSIGNMENT_SETTING_VALUE_YES) {
                    bodyFormData.append('marks', allowAssGrade ? data.marks : '');
                }
                //bodyFormData.append('exclude_include_sources', excludeIncludeSource === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('save_to_repository', saveToRepo === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                if (saveToRepo === ASSIGNMENT_SETTING_VALUE_YES) {
                    bodyFormData.append('repository_scope', data?.repository_scope?.name === 'Institution' ? 'LOCAL' : 'GLOBAL');
                }
                bodyFormData.append('allow_resubmissions', allowSubmission === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                if (allowSubmission === ASSIGNMENT_SETTING_VALUE_YES) {
                    bodyFormData.append('resubmission_count', data?.no_of_resubmission);
                }
                bodyFormData.append('allow_submissions_after_due_date', allowSubmissionDueDate === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);

                if (allowSubmissionDueDate === ASSIGNMENT_SETTING_VALUE_YES) {
                    bodyFormData.append('extra_days', allowAssGrade ? data.extra_days : '');
                }

                bodyFormData.append('grammar_check', grammarCheck === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('choice_of_email_notifications', choiceEmailNotification === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('add_questions', addQuestion === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                if (addQuestion === ASSIGNMENT_SETTING_VALUE_YES) {
                    let questionObj = {};
                    questionList?.map((item, index) => {
                        questionObj['q' + (index + 1)] = item.q;
                    });
                    bodyFormData.append('questions', JSON.stringify(questionObj));
                }
                bodyFormData.append('exclude_phrases', excludePhrases === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                if (excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
                    let phrasesObj = {};
                    phrasesList?.map((item, index) => {
                        phrasesObj['p' + (index + 1)] = item.p;
                    });
                    bodyFormData.append('phrases', JSON.stringify(phrasesObj));
                }
                bodyFormData.append('report_access', reportAccess === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('db_studentpaper', studentPaper === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('db_publications', publication === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('db_internet', internet === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('institution_repository', repository === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
                bodyFormData.append('daily_submissions_limit', dailySubmissionLimit);
                CreateAssignment(router.query.clasId, bodyFormData);
            } else {
                bodyFormData.append('assignment_name', data.assignment_name);
                bodyFormData.append('start_date', convertDate(data.start_date));
                bodyFormData.append('end_date', convertDate(data.end_date));
                if (data.file !== undefined) {
                    bodyFormData.append('file', data?.file[0]);
                }
                bodyFormData.append('exclude_references', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('exclude_quotes', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('exclude_small_sources', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('assignment_grading', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                //bodyFormData.append('exclude_include_sources', showSetting && ASSIGNMENT_SETTING_VALUE_YES);
                bodyFormData.append('save_to_repository', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('allow_resubmissions', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('allow_submissions_after_due_date', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('grammar_check', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('choice_of_email_notifications', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('add_questions', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('exclude_phrases', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('repository_scope', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
                bodyFormData.append('report_access', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');

                bodyFormData.append('db_studentpaper', !showSetting ? ASSIGNMENT_SETTING_VALUE_YES : '');
                bodyFormData.append('db_publications', !showSetting ? ASSIGNMENT_SETTING_VALUE_YES : '');
                bodyFormData.append('db_internet', !showSetting ? ASSIGNMENT_SETTING_VALUE_YES : '');
                bodyFormData.append('institution_repository', !showSetting ? ASSIGNMENT_SETTING_VALUE_YES : '');
                bodyFormData.append('daily_submissions_limit', 1);
                CreateAssignment(router.query.clasId, bodyFormData);
            }
        }

    };

    const editAssignments = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('assignment_name', data.assignment_name);
        bodyFormData.append('start_date', convertDate(data.start_date));
        bodyFormData.append('end_date', convertDate(data.end_date));

        if (editData.assignmentData.attachment !== null) {
            bodyFormData.append('file', editData.assignmentData.attachment);
        }

        if (editData.assignmentData.ex_references === ASSIGNMENT_SETTING_VALUE_YES) {
            //setExcludeRefBib(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('exclude_references', excludeRefBib);
        } else {
            //setExcludeRefBib(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('exclude_references', excludeRefBib);
        }

        if (editData.assignmentData.ex_quotes === ASSIGNMENT_SETTING_VALUE_YES) {
            //setExcludeQuote(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('exclude_quotes', excludeQuote);
        } else {
            //setExcludeQuote(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('exclude_quotes', excludeQuote);
        }

        if (editData.assignmentData.ex_smallSources === ASSIGNMENT_SETTING_VALUE_YES) {
            //setExcludeSmallSource(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('exclude_small_sources', excludeSmallSource);
        } else {
            //setExcludeSmallSource(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('exclude_small_sources', excludeSmallSource);
        }

        if (editData.assignmentData.save_to_repository === ASSIGNMENT_SETTING_VALUE_YES) {
            //setSaveToRepo(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('save_to_repository', saveToRepo);
        } else {
            //setSaveToRepo(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('save_to_repository', saveToRepo);
        }

        if (editData.assignmentData.report_access === ASSIGNMENT_SETTING_VALUE_YES) {
            //setReportAccess(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('report_access', reportAccess);
        } else {
            //setReportAccess(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('report_access', reportAccess);
        }


        if (saveToRepo === ASSIGNMENT_SETTING_VALUE_YES) {
            bodyFormData.append('repository_scope', data?.repository_scope?.name === 'Institution' ? 'LOCAL' : 'GLOBAL');
        }

        if (editData.assignmentData.assignment_grading === ASSIGNMENT_SETTING_VALUE_YES) {
            //setAllowAssGrade(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('assignment_grading', allowAssGrade);
        } else {
            //setAllowAssGrade(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('assignment_grading', allowAssGrade);
        }

        if (allowAssGrade === ASSIGNMENT_SETTING_VALUE_YES) {
            bodyFormData.append('marks', editData.assignmentData.marks === data.marks ? editData.assignmentData.marks : data.marks);
        }

        if (allowSubmissionDueDate === ASSIGNMENT_SETTING_VALUE_YES) {
            bodyFormData.append('extra_days', editData.assignmentData.extra_days === data.extra_days ? editData.assignmentData.extra_days : data.extra_days);
        }

        if (editData.assignmentData.allow_resubmission === ASSIGNMENT_SETTING_VALUE_YES) {
            //setAllowSubmission(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('allow_resubmissions', allowSubmission);

        } else {
            //setAllowSubmission(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('allow_resubmissions', allowSubmission);
        }

        if (allowSubmission === ASSIGNMENT_SETTING_VALUE_YES) {
            bodyFormData.append('resubmission_count', editData?.assignmentData?.no_of_resubmission || data?.no_of_resubmission);
        }

        if (editData.assignmentData.allow_submission_after_due === ASSIGNMENT_SETTING_VALUE_YES) {
            //setAllowSubmissionDueDate(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('allow_submissions_after_due_date', allowSubmissionDueDate);

        } else {
            //setAllowSubmissionDueDate(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('allow_submissions_after_due_date', allowSubmissionDueDate);
        }


        if (editData.assignmentData.grammar === ASSIGNMENT_SETTING_VALUE_YES) {
            //setGrammarCheck(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('grammar_check', grammarCheck);

        } else {
            //setGrammarCheck(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('grammar_check', grammarCheck);
        }

        if (editData.assignmentData.choice_of_email === ASSIGNMENT_SETTING_VALUE_YES) {
            //setChoiceEmailNotification(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('choice_of_email_notifications', choiceEmailNotification);

        } else {
            //setChoiceEmailNotification(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('choice_of_email_notifications', choiceEmailNotification);
        }

        if (editData.assignmentData.questions === ASSIGNMENT_SETTING_VALUE_YES) {
            //setAddQuestion(ASSIGNMENT_SETTING_VALUE_YES);
            let questionObj = {};
            questionList?.map((item, index) => {
                questionObj['q' + (index + 1)] = item.q;
            });
            bodyFormData.append('add_questions', addQuestion);
            bodyFormData.append('questions', JSON.stringify(questionObj));
        } else if (addQuestion === ASSIGNMENT_SETTING_VALUE_YES) {
            let questionObj = {};
            questionList?.map((item, index) => {
                questionObj['q' + (index + 1)] = item.q;
            });
            bodyFormData.append('add_questions', addQuestion);
            bodyFormData.append('questions', JSON.stringify(questionObj));
        } else {
            //setAddQuestion(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('add_questions', addQuestion);
        }

        if (editData.assignmentData.ex_phrases === ASSIGNMENT_SETTING_VALUE_YES) {
            //setExcludePhrases(ASSIGNMENT_SETTING_VALUE_YES);
            let phraesObj = {};
            phrasesList?.map((item, index) => {
                phraesObj['p' + (index + 1)] = item.p;
            });
            bodyFormData.append('exclude_phrases', excludePhrases);
            bodyFormData.append('phrases', JSON.stringify(phraesObj));
        } else if (excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
            let phraesObj = {};
            phrasesList?.map((item, index) => {
                phraesObj['p' + (index + 1)] = item.p;
            });
            bodyFormData.append('exclude_phrases', excludePhrases);
            bodyFormData.append('phrases', JSON.stringify(phraesObj));
        } else {
            //setExcludePhrases(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('exclude_phrases', excludePhrases);
        }

        bodyFormData.append('daily_submissions_limit', dailySubmissionLimit);


        /** Databases */
        if (editData.assignmentData.db_publications === ASSIGNMENT_SETTING_VALUE_YES) {
            //setPublication(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('db_publications', publication);
        } else {
            //setPublication(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('db_publications', publication);
        }

        if (editData.assignmentData.db_internet === ASSIGNMENT_SETTING_VALUE_YES) {
            //setInternet(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('db_internet', internet);
        } else {
            //setInternet(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('db_internet', internet);
        }

        if (editData.assignmentData.db_studentpaper === ASSIGNMENT_SETTING_VALUE_YES) {
            //setStudentPaper(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('db_studentpaper', studentPaper);
        } else {
            //setStudentPaper(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('db_studentpaper', studentPaper);
        }

        if (editData.assignmentData.institution_repository === ASSIGNMENT_SETTING_VALUE_YES) {
            //setRepository(ASSIGNMENT_SETTING_VALUE_YES);
            bodyFormData.append('institution_repository', repository);
        } else {
            //setRepository(ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('institution_repository', repository);
        }
        /** End databases */
        EditAssignment(router.query.clasId, editData.id, bodyFormData);
    };

    useEffect(() => {
        if (studentPaper === 'YES' || publication === 'YES' || repository === 'YES' || internet === 'YES') {
            setDisabledButton(false);
            setErrorMsgDBCheck('');
        } else {
            setDisabledButton(true);
            setErrorMsgDBCheck(DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK);
        }
    }, [internet, repository, publication, studentPaper]);

    useEffect(() => {
        if ((excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) || (addQuestion === ASSIGNMENT_SETTING_VALUE_YES)) {
            if (phrasesList.length > 0 && phrasesList[0].p === '') {
                setDisabledButton(true);
                setErrorMsgDBCheck('Enter minimum one phrase');
            } else if (phrasesList.length === 0 && excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
                setDisabledButton(true);
                setErrorMsgDBCheck('Enter minimum one phrase');
            } else if (questionList.length > 0 && questionList[0].q === '') {
                setDisabledButton(true);
                setErrorMsgDBCheck('Enter minimum one question');
            } else if (questionList.length === 0 && addQuestion === ASSIGNMENT_SETTING_VALUE_YES) {
                setDisabledButton(true);
                setErrorMsgDBCheck('Enter minimum one question');
            } else {
                setDisabledButton(false);
                setErrorMsgDBCheck('');
            }
        } else {
            setDisabledButton(false);
            setErrorMsgDBCheck('');
        }
    }, [excludePhrases, addQuestion, phrasesList, questionList]);

    useEffect(() => {
        setAllowAssGrade(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludeRefBib(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludeQuote(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludeSmallSource(ASSIGNMENT_SETTING_VALUE_NO);
        setSaveToRepo(ASSIGNMENT_SETTING_VALUE_NO);
        setAllowSubmission(ASSIGNMENT_SETTING_VALUE_NO);
        setAllowSubmissionDueDate(ASSIGNMENT_SETTING_VALUE_NO);
        setGrammarCheck(ASSIGNMENT_SETTING_VALUE_NO);
        setChoiceEmailNotification(ASSIGNMENT_SETTING_VALUE_NO);
        setAddQuestion(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludePhrases(ASSIGNMENT_SETTING_VALUE_NO);
        setReportAccess(ASSIGNMENT_SETTING_VALUE_NO);
        setStudentPaper(ASSIGNMENT_SETTING_VALUE_YES);
        setPublication(ASSIGNMENT_SETTING_VALUE_YES);
        setInternet(ASSIGNMENT_SETTING_VALUE_YES);
        setRepository(ASSIGNMENT_SETTING_VALUE_YES);
    }, []);

    useEffect(() => {
        if (editData !== undefined) {
            setShowSetting(true);
            let a = {
                'assignment_name': editData.assignment_name,
                'end_date': editData.assignmentData?.end_date,
                'start_date': editData.assignmentData?.start_date,
                'marks': editData.assignmentData.marks,
                'extra_days': editData.assignmentData.extra_days,
                'repository_scope': { 'name': (editData.assignmentData.repository_scope === null ? '' : editData.assignmentData.repository_scope === 'LOCAL' ? 'Institution' : 'Global') },
                'no_of_resubmission': editData.assignmentData.resubmission_count,
                'resubmission_count': editData.assignmentData.resubmission_count,
                'file': editData.assignmentData.attachment
            };
            const fields = [
                'assignment_name',
                'end_date',
                'start_date',
                'marks',
                'extra_days',
                'repository_scope',
                'no_of_resubmission',
                'resubmission_count',
                'file'
            ];
            fields.forEach(field => setValue(field, a[field]));

            setDailySubmissionLimit(editData?.assignmentData?.submissions_limit);

            setAllowAssGrade(editData?.assignmentData?.assignment_grading?.toUpperCase());
            setExcludeRefBib(editData?.assignmentData?.ex_references?.toUpperCase());
            setExcludeQuote(editData?.assignmentData?.ex_quotes?.toUpperCase());
            setExcludeSmallSource(editData?.assignmentData?.ex_smallSources?.toUpperCase());
            setSaveToRepo(editData?.assignmentData?.save_to_repository?.toUpperCase());
            setAllowSubmission(editData?.assignmentData?.allow_resubmission?.toUpperCase());
            setAllowSubmissionDueDate(editData?.assignmentData?.allow_submission_after_due?.toUpperCase());
            setGrammarCheck(editData?.assignmentData?.grammar?.toUpperCase());
            setChoiceEmailNotification(editData?.assignmentData?.choice_of_email?.toUpperCase());
            setAddQuestion(editData?.assignmentData?.questions?.toUpperCase());
            setExcludePhrases(editData?.assignmentData?.ex_phrases?.toUpperCase());
            setReportAccess(editData?.assignmentData?.report_access?.toUpperCase());
            setStudentPaper(editData?.assignmentData?.db_studentpaper?.toUpperCase());
            setPublication(editData?.assignmentData?.db_publications?.toUpperCase());
            setInternet(editData?.assignmentData?.db_internet?.toUpperCase());
            setRepository(editData?.assignmentData?.institution_repository?.toUpperCase());

            let editQus = [];
            delete editData.assignmentData.questionsList.date;
            delete editData.assignmentData.questionsList.qId;
            Object.entries(editData?.assignmentData?.questionsList).map((item) => {
                let obj = {};
                if (item[1] !== null) {
                    obj['q'] = item[1];
                    editQus.push(obj);
                }
            });
            setQuestionList(editQus);
            let editPhrases = [];
            delete editData.assignmentData.phrases.pId;
            Object.entries(editData?.assignmentData?.phrases).map((item) => {
                let phrasesObj = {};
                if (item[1] !== null) {
                    phrasesObj['p'] = item[1];
                    editPhrases.push(phrasesObj);
                }
            });
            setPhrasesList(editPhrases);
            setBtnLabel('Assignment Edit');
            setEditOperation(true);
        }
    }, [editData]);


    const handleSwitchChange = (event) => {
        setShowSetting(event.target.checked);
    };

    const handleAllowAssgnmtGrade = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setAllowAssGrade(value);
        }
    };

    const handleExcludeRef = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setExcludeRefBib(value);
        }
    };

    const handleExcludeQuote = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setExcludeQuote(value);
        }
    };

    const handleExcludeSmallSource = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setExcludeSmallSource(value);
        }
    };

    const handleSaveToRepo = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setSaveToRepo(value);
        }
    };

    const handleAllowSubmission = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setAllowSubmission(value);
        }
    };

    const handleAllowSubmissionDueDate = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setAllowSubmissionDueDate(value);
        }
    };

    const handleGrammarCheck = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setGrammarCheck(value);
        }
    };

    const handleChoiceEmailNotification = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setChoiceEmailNotification(value);
        }
    };

    const handleAddQuestion = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setAddQuestion(value);
        }
    };

    const handleExcludePhrases = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setExcludePhrases(value);
        }
    };

    const handleStudentPaper = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setStudentPaper(value);
        }
    };

    const handlePublications = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setPublication(value);
        }
    };

    const handleInternet = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setInternet(value);
        }
    };

    const handleRepository = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setRepository(value);
        }
    };

    const handleReportAccess = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setReportAccess(value);
        }
    };

    const handleAddQuestionRemove = (e, index) => {
        e.preventDefault();
        const list = [...questionList];
        list.splice(index, 1);
        setQuestionList(list);
    };

    const addInput = () => {
        setQuestionList((s) => {
            return [
                ...s,
                {
                    'q': ''
                }
            ];
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        const index = e.target.id;
        setQuestionList((s) => {
            const newArr = s.slice();
            newArr[index].q = e.target.value;
            return newArr;
        });
    };

    const addPhrasesInput = () => {
        setPhrasesList((s) => {
            return [
                ...s,
                {
                    'p': ''
                }
            ];
        });
    };

    const handlePharsesChange = (e) => {
        e.preventDefault();
        const index = e.target.id;
        setPhrasesList((s) => {
            const newArr = s.slice();
            newArr[index].p = e.target.value;
            return newArr;
        });
    };

    const handlePhrasesRemove = (e, index) => {
        e.preventDefault();
        const list = [...phrasesList];
        list.splice(index, 1);
        setPhrasesList(list);
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LabelContainer>
                    <InputLabel>
                        Assignment name *
                    </InputLabel>
                </LabelContainer>

                <InputTextField
                    control={control}
                    field={{
                        'field_type': 'text',
                        'id': 'assignment_name',
                        'name': 'assignment_name',
                        'required': 'Enter assignment name',
                        'validationMsg': 'Enter assignment name'
                    }}
                />

                <InputDatePicker
                    control={control}
                    field={{
                        'field_type': 'datepicker',
                        'id': 'start_date',
                        'name': 'start_date',
                        'label': 'Select start date *',
                        'minDate': true,
                        'required': 'Select Start Date',
                        'validationMsg': 'Select Start Date'
                    }}
                />

                <InputDatePicker
                    control={control}
                    field={{
                        'field_type': 'datepicker',
                        'id': 'end_date',
                        'name': 'end_date',
                        'label': 'Select end date *',
                        'minDate': true,
                        'required': 'Select End Date',
                        'validationMsg': 'Select End Date'
                    }}
                />
                <label style={{ color: 'gray' }}>Instructions</label>
                <InputFileType
                    control={control}
                    field={{
                        'field_type': 'file',
                        'id': 'file',
                        'name': 'file',
                        'label': 'Choose File',
                    }}
                />

                <Grid container>
                    <Grid item md={6} style={{ marginLeft: '2px', marginTop: '5px' }}>
                        <InputLabel style={{ margin: '10px 0px' }}>
                            Assignment settings
                        </InputLabel>
                    </Grid>
                    <Grid item md={1} style={{
                        textAlign: 'right',
                        marginTop: '10px',
                        marginLeft: '15px'
                    }}>
                        <Switch
                            checked={showSetting}
                            onChange={handleSwitchChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>
                </Grid>
                {showSetting &&
                    <>
                        <div>

                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Allow Assignment Grading
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={allowAssGrade}
                                        exclusive
                                        onChange={handleAllowAssgnmtGrade}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>

                                </Grid>
                            </Grid>

                            {allowAssGrade === ASSIGNMENT_SETTING_VALUE_YES &&
                                <InputNumberField
                                    control={control}
                                    field={{
                                        'field_type': 'inputNumber',
                                        'id': 'marks',
                                        'size': 'small',
                                        'name': 'marks',
                                        'label': 'Enter Max Assignment Marks',
                                        'required': 'Enter max assignment marks'
                                    }} />
                            }
                        </div>

                        <div>

                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Exclude Reference / Bibliography
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={excludeRefBib}
                                        exclusive
                                        onChange={handleExcludeRef}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Exclude Quotes
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={excludeQuote}
                                        exclusive
                                        onChange={handleExcludeQuote}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <Tooltip title={'YES - 14 similarity words, NO - default settings'} arrow>
                                        <InputLabel style={{ margin: '22px 0px' }}>
                                            Exclude small sources
                                        </InputLabel>
                                    </Tooltip>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={excludeSmallSource}
                                        exclusive
                                        onChange={handleExcludeSmallSource}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Save to repository
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={saveToRepo}
                                        exclusive
                                        onChange={handleSaveToRepo}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            {saveToRepo === ASSIGNMENT_SETTING_VALUE_YES && <>
                                <Grid container>
                                    <Grid item md={12}>
                                        <InputAutoComplete
                                            control={control}
                                            field={{
                                                'field_type': 'dropdown',
                                                'id': 'repoScope',
                                                'label': 'Repository Scope',
                                                'name': 'repository_scope',
                                                'required': 'Choose repository scope',
                                                'validationMsg': 'Please select repository scope',
                                                'size': 'small',
                                                'options': [{
                                                    'name': 'Institution'
                                                }, {
                                                    'name': 'Global'
                                                }]
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </>}
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Allow Resubmission
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={allowSubmission}
                                        exclusive
                                        onChange={handleAllowSubmission}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            {allowSubmission === ASSIGNMENT_SETTING_VALUE_YES && <>
                                <InputNumberField
                                    control={control}
                                    field={{
                                        'field_type': 'inputNumber',
                                        'id': 'no_of_resubmission',
                                        'name': 'no_of_resubmission',
                                        'size': 'small',
                                        'label': 'Enter no. of resubmission',
                                        'required': 'Enter number of submission'
                                    }}
                                />
                            </>
                            }
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Allow Submission After Due Date
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={allowSubmissionDueDate}
                                        exclusive
                                        onChange={handleAllowSubmissionDueDate}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            {allowSubmissionDueDate === ASSIGNMENT_SETTING_VALUE_YES && <>
                                <InputNumberField
                                    control={control}
                                    field={{
                                        'field_type': 'inputNumber',
                                        'id': 'extra_days',
                                        'size': 'small',
                                        'name': 'extra_days',
                                        'label': 'Enter extra days',
                                        'required': 'Enter extra days after due date'
                                    }} />
                            </>
                            }

                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Grammar Check
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={grammarCheck}
                                        exclusive
                                        onChange={handleGrammarCheck}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>


                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Choice Of Email Notifications
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={choiceEmailNotification}
                                        exclusive
                                        onChange={handleChoiceEmailNotification}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Add Questions
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={addQuestion}
                                        exclusive
                                        onChange={handleAddQuestion}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>

                            {addQuestion === ASSIGNMENT_SETTING_VALUE_YES &&
                                <div>
                                    {questionList.map((item, i) => {
                                        return (
                                            <>
                                                <Grid key={i} container spacing={2} sx={{ marginBottom: '15px' }}>
                                                    <Grid item md={9}>
                                                        <TextField
                                                            id={i}
                                                            size="small"
                                                            label={'Enter question ' + (i + 1)}
                                                            name={item}
                                                            value={item['q']}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid item md={2}>
                                                        <Button
                                                            variant="contained"
                                                            onClick={(e) => handleAddQuestionRemove(e, i)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        );
                                    })}
                                    <Button
                                        sx={{ marginTop: '14px' }}
                                        variant="contained"
                                        onClick={addInput}
                                        disabled={questionList.length === 5}
                                    >
                                        Add Questions
                                    </Button>
                                </div>
                            }
                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Exclude Phrases
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={excludePhrases}
                                        exclusive
                                        onChange={handleExcludePhrases}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            {excludePhrases === ASSIGNMENT_SETTING_VALUE_YES &&
                                <>
                                    {phrasesList.map((item, i) => {
                                        return (
                                            <>
                                                <Grid key={i} container spacing={2} sx={{ marginBottom: '15px' }}>
                                                    <Grid item md={9}>
                                                        <TextField
                                                            id={i}
                                                            size="small"
                                                            label={'Enter phrases ' + (i + 1)}
                                                            name={item}
                                                            value={item['p']}
                                                            onChange={handlePharsesChange}
                                                        />
                                                    </Grid>
                                                    <Grid item md={2}>
                                                        <Button
                                                            variant="contained"
                                                            onClick={(e) => handlePhrasesRemove(e, i)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        );
                                    })}
                                    <Button
                                        sx={{ marginTop: '14px' }}
                                        variant="contained"
                                        onClick={addPhrasesInput}
                                        disabled={phrasesList.length === 15}
                                    >
                                        Add Phrases
                                    </Button>
                                </>
                            }
                        </div>
                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Viewing of similarity % and report
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={reportAccess}
                                        exclusive
                                        onChange={handleReportAccess}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container>
                            <Grid item md={6}>
                                <InputLabel style={{ margin: '22px 0px' }}>
                                    Daily submission limit
                                </InputLabel>
                            </Grid>
                            <Grid item md={6} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                <TextField
                                    id="outlined-name"
                                    fullWidth
                                    type='number'
                                    name="daily_submissions_limit"
                                    size="small"
                                    value={dailySubmissionLimit}
                                    onChange={(e) => setDailySubmissionLimit(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <b>Compare against databases</b>
                        <Grid container>
                            <Grid item md={8}>
                                <InputLabel style={{ margin: '22px 0px' }}>
                                    Student Papers
                                </InputLabel>
                            </Grid>
                            <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={studentPaper}
                                    exclusive
                                    onChange={handleStudentPaper}
                                >
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={8}>
                                <InputLabel style={{ margin: '22px 0px' }}>
                                    Journals & publishers
                                </InputLabel>
                            </Grid>
                            <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={publication}
                                    exclusive
                                    onChange={handlePublications}
                                >
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={8}>
                                <InputLabel style={{ margin: '22px 0px' }}>
                                    Internet or Web
                                </InputLabel>
                            </Grid>
                            <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={internet}
                                    exclusive
                                    onChange={handleInternet}
                                >
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={8}>
                                <InputLabel style={{ margin: '22px 0px' }}>
                                    Institution Repository
                                </InputLabel>
                            </Grid>
                            <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={repository}
                                    exclusive
                                    onChange={handleRepository}
                                >
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                    <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </>
                }
                <div style={{ marginBottom: '15px' }}>
                    {errorMsgDBCheck !== '' ? <ErrorMessageContainer>{errorMsgDBCheck}</ErrorMessageContainer> : ''}
                </div>
                <InputButton field={{
                    'field_type': 'button',
                    'type': 'submit',
                    'label': btnLabel,
                    'isDisabled': disabledButton
                }}
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAssignment: (ClasId, data) => dispatch(CreateAssignment(ClasId, data)),
        EditAssignment: (ClasId, assId, reqPayload) => dispatch(EditAssignment(ClasId, assId, reqPayload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForms);