import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { AddImageIcon } from '../../../../assets/icon';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import InputDatePicker from '../../../../components/form/elements/InputDatePicker';
import InputToggleButton from '../../../../components/form/elements/InputToggleButton';
import InputTextField from '../../../../components/form/elements/InputTextField';
import InputFileType from '../../../../components/form/elements/InputFileType';
import InputAutoComplete from '../../../../components/form/elements/InputAutoComplete';
import InputButton from '../../../../components/form/elements/InputButton';
import LabelCaption from '../../../../components/form/elements/LabelCaption';
import { CreateAssignment, EditAssignment } from '../../../../redux/action/instructor/InstructorAction';
import { convertDate } from '../../../../utils/RegExp';
import { ASSIGNMENT_SETTING_VALUE_YES, ASSIGNMENT_SETTING_VALUE_NO } from '../../../../constant/data/Constant';
import { DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK } from '../../../../constant/data/ErrorMessage';
import { ErrorMessageContainer } from '../../../style/index';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#3672FF'
    }
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const useStyles = makeStyles((theme) => ({
    helperText: {
        marginLeft: 0
    }
}));

const AssignmentForms = ({
    CreateAssignment,
    EditAssignment,
    isLoading,
}) => {
    const classes = useStyles();
    const router = useRouter();

    const [value, setValue] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [showSetting, setShowSetting] = React.useState(false);
    const [allowAssGrade, setAllowAssGrade] = React.useState(false);
    const [excludeRefBib, setExcludeRefBib] = React.useState(false);
    const [excludeQuote, setExcludeQuote] = React.useState(false);
    const [excludeSmallSource, setExcludeSmallSource] = React.useState(false);
    const [excludeIncludeSource, setExcludeIncludeSource] = React.useState(false);
    const [saveToRepo, setSaveToRepo] = React.useState(false);
    const [allowSubmission, setAllowSubmission] = React.useState(false);
    const [allowSubmissionDueDate, setAllowSubmissionDueDate] = React.useState(false);
    const [grammarCheck, setGrammarCheck] = React.useState(false);
    const [choiceEmailNotification, setChoiceEmailNotification] = React.useState(false);
    const [addQuestion, setAddQuestion] = React.useState(false);
    const [excludePhrases, setExcludePhrases] = React.useState(false);
    const [reportAccess, setReportAccess] = React.useState(false);
    const [studentPaper, setStudentPaper] = React.useState(false);
    const [publication, setPublication] = React.useState(false);
    const [internet, setInternet] = React.useState(false);
    const [repository, setRepository] = React.useState(false);
    const [phrasesData, setPhrasesData] = React.useState('');
    const [questionData, setQuestionData] = React.useState('');
    const [questionList, setQuestionList] = React.useState([]);
    const [phrasesList, setPhrasesList] = React.useState([]);
    const [dailySubmissionLimit, setDailySubmissionLimit] = React.useState(0);
    const [disabledButton, setDisabledButton] = React.useState(false);
    const [errorMsgDBCheck, setErrorMsgDBCheck] = useState('');

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
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
                bodyFormData.append('repository_scope', data?.repository_scope?.name.toUpperCase());
            }
            bodyFormData.append('allow_resubmissions', allowSubmission === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
            if (allowSubmission === ASSIGNMENT_SETTING_VALUE_YES) {
                bodyFormData.append('resubmission_count', data?.no_of_resubmission);
            }
            bodyFormData.append('allow_submissions_after_due_date', allowSubmissionDueDate === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('grammar_check', grammarCheck === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('choice_of_email_notifications', choiceEmailNotification === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
            bodyFormData.append('add_questions', addQuestion === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
            if (addQuestion === ASSIGNMENT_SETTING_VALUE_YES) {
                let questionObj = {};
                questionList?.map((item, index) => {
                    questionObj['q' + (index + 1)] = item;
                });
                bodyFormData.append('questions', JSON.stringify(questionObj));
            }
            bodyFormData.append('exclude_phrases', excludePhrases === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO);
            if (excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
                let phrasesObj = {};
                phrasesList?.map((item, index) => {
                    phrasesObj['p' + (index + 1)] = item;
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
            bodyFormData.append('db_studentpaper', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
            bodyFormData.append('db_publications', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
            bodyFormData.append('db_internet', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
            bodyFormData.append('institution_repository', !showSetting ? ASSIGNMENT_SETTING_VALUE_NO : '');
            bodyFormData.append('daily_submissions_limit', 0);
            CreateAssignment(router.query.clasId, bodyFormData);
        }

    }

    useEffect(() => {
        if (internet === 'YES' || publication === 'YES' || repository === 'YES' || internet === 'YES') {
            setDisabledButton(false);
            setErrorMsgDBCheck('');
        } else {
            setDisabledButton(true);
            setErrorMsgDBCheck(DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK);
        }
    }, [internet, repository, publication, studentPaper])

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


    const handleSwitchChange = (event) => {
        setShowSetting(event.target.checked);
    }

    const handleAllowAssgnmtGrade = (e, value) => {
        e.preventDefault();
        setAllowAssGrade(value);
    }

    const handleExcludeRef = (e, value) => {
        e.preventDefault();
        setExcludeRefBib(value)
    }

    const handleExcludeQuote = (e, value) => {
        e.preventDefault();
        setExcludeQuote(value)
    }

    const handleExcludeSmallSource = (e, value) => {
        e.preventDefault();
        setExcludeSmallSource(value)
    }

    const handleExcludeIncludeSource = (e, value) => {
        e.preventDefault();
        setExcludeIncludeSource(value)
    }

    const handleSaveToRepo = (e, value) => {
        e.preventDefault();
        setSaveToRepo(value);
    }

    const handleAllowSubmission = (e, value) => {
        e.preventDefault();
        setAllowSubmission(value);
    }

    const handleAllowSubmissionDueDate = (e, value) => {
        e.preventDefault();
        setAllowSubmissionDueDate(value);
    }

    const handleGrammarCheck = (e, value) => {
        e.preventDefault();
        setGrammarCheck(value);
    }

    const handleChoiceEmailNotification = (e, value) => {
        e.preventDefault();
        setChoiceEmailNotification(value);
    }

    const handleAddQuestion = (e, value) => {
        e.preventDefault();
        setAddQuestion(value);
    }

    const handleExcludePhrases = (e, value) => {
        e.preventDefault();
        setExcludePhrases(value);
    }

    const handleStudentPaper = (e, value) => {
        e.preventDefault();
        setStudentPaper(value);
    }

    const handlePublications = (e, value) => {
        e.preventDefault();
        setPublication(value);
    }

    const handleInternet = (e, value) => {
        e.preventDefault();
        setInternet(value);
    }

    const handleRepository = (e, value) => {
        e.preventDefault();
        setRepository(value);
    }

    const handleReportAccess = (e, value) => {
        e.preventDefault();
        setReportAccess(value);
    }

    const handleMoreAddQuestion = (e) => {
        let r = [...questionList];
        r.push(questionData);
        setQuestionList(r);
    }

    const handleAddQuestionRemove = (e, index) => {
        e.preventDefault();
        const list = [...questionList];
        list.splice(index, 1);
        setQuestionList(list);
    }

    const handlePhrases = (e) => {
        let r = [...phrasesList];
        r.push(phrasesData);
        setPhrasesList(r);
    }

    const handleRemovePhrases = (e, index) => {
        e.preventDefault();
        const list = [...phrasesList];
        list.splice(index, 1);
        setPhrasesList(list);
    }



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

                {/* <TextField
                    fullWidth
                    margin="normal"
                    name={"assignment_name"}
                    type="text"
                    variant="outlined"
                    {...register("assignment_name", { required: true })}
                    helperText={errors['assignment_name'] && 'Required'}
                    FormHelperTextProps={{
                        className: classes.helperText
                    }}
                /> */}

                <InputTextField
                    control={control}
                    field={{
                        "field_type": "text",
                        "id": "assignment_name",
                        "name": "assignment_name",
                        "required": "Enter assignment name",
                        "validationMsg": "Enter assignment name"
                    }}
                />

                <InputDatePicker
                    control={control}
                    field={{
                        "field_type": "datepicker",
                        "id": "start_date",
                        "name": "start_date",
                        "label": "Select start date *",
                        "minDate": true,
                        "required": "Select Start Date",
                        "validationMsg": "Select Start Date"
                    }}
                />

                <InputDatePicker
                    control={control}
                    field={{
                        "field_type": "datepicker",
                        "id": "end_date",
                        "name": "end_date",
                        "label": "Select end date *",
                        "minDate": true,
                        "required": "Select End Date",
                        "validationMsg": "Select End Date"
                    }}
                />
                <label style={{ color: 'gray' }}>Instructions</label>
                <InputFileType
                    control={control}
                    field={{
                        "field_type": "file",
                        "id": "file",
                        "name": "file",
                        "label": "Choose File",
                        "required": "Choose File",
                        "validationMsg": "Please choose file"
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

                            {allowAssGrade === ASSIGNMENT_SETTING_VALUE_YES && <>
                                {/* <LabelContainer>
                                    <InputLabel style={{ marginTop: '10px' }}>
                                        Enter Max Assignment Marks
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="assignment_name"
                                    type="text"
                                    variant="outlined"
                                /> */}
                                <InputTextField
                                    control={control}
                                    field={{
                                        "field_type": "input",
                                        "id": "marks",
                                        "size": "small",
                                        "name": "marks",
                                        "label": "Enter Max Assignment Marks",
                                        "required": "Enter max assignment marks"
                                    }} />
                            </>
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
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Exclude small sources
                                    </InputLabel>
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

                        {/* <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Option To Exclude/Include Sources
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={excludeIncludeSource}
                                        exclusive
                                        onChange={handleExcludeIncludeSource}
                                    >
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_YES}>Yes</ToggleButton>
                                        <ToggleButton value={ASSIGNMENT_SETTING_VALUE_NO}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>

                        </div> */}

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
                                                "field_type": "dropdown",
                                                "id": "repoScope",
                                                "label": "Repository Scope",
                                                "name": "repository_scope",
                                                "required": "Choose repository scope",
                                                "validationMsg": "Please select repository scope",
                                                "size": "small",
                                                "options": [{
                                                    "name": "Institution"
                                                }, {
                                                    "name": "Global"
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
                                <InputTextField
                                    control={control}
                                    field={{
                                        "field_type": "input",
                                        "id": "no_of_resubmission",
                                        "name": "no_of_resubmission",
                                        "size": 'small',
                                        "label": "Enter no. of resubmission",
                                        "required": "Enter number of submission"
                                    }} />
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
                                    <>
                                        <Grid container spacing={2} sx={{ marginBottom: '15px' }}>
                                            <Grid item md={9}>
                                                <TextField
                                                    id="q"
                                                    label={"Enter question 1"}
                                                    size="small"
                                                    name={"q1"}
                                                    onChange={(e) => setQuestionData(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                            </Grid>
                                        </Grid>
                                    </>
                                    {questionList?.map((item, index) => (
                                        <>
                                            <Grid container spacing={2} sx={{ marginBottom: '15px' }}>
                                                <Grid item md={9}>
                                                    <TextField
                                                        id="q"
                                                        size="small"
                                                        label={"Enter question " + (index + 2)}
                                                        name={"q" + index + 1}
                                                        onChange={(e) => setQuestionData(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={(e) => handleAddQuestionRemove(e, index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </>
                                    ))}
                                    <Button
                                        sx={{ marginTop: '14px' }}
                                        variant="contained"
                                        onClick={handleMoreAddQuestion}
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
                                <div>
                                    <>
                                        <Grid container spacing={2} sx={{ marginBottom: '15px' }}>
                                            <Grid item md={9}>
                                                <TextField
                                                    id="p"
                                                    label={"Enter pharses 1"}
                                                    size="small"
                                                    name={"p1"}
                                                    onChange={(e) => setPhrasesData(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                            </Grid>
                                        </Grid>
                                    </>
                                    {phrasesList?.map((item, index) => (
                                        <>
                                            <Grid container spacing={2} sx={{ marginBottom: '15px' }}>
                                                <Grid item md={9}>
                                                    <TextField
                                                        id="p"
                                                        size="small"
                                                        label={"Enter pharses " + (index + 2)}
                                                        name={"p" + index + 1}
                                                        onChange={(e) => setPhrasesData(e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={(e) => handleRemovePhrases(e, index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </>
                                    ))}
                                    <Button
                                        sx={{ marginTop: '14px' }}
                                        variant="contained"
                                        onClick={handlePhrases}
                                    >
                                        Add Phrases
                                    </Button>
                                </div>
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
                                    name="daily_submissions_limit"
                                    size="small"
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
                    "field_type": "button",
                    "type": "submit",
                    "label": "Submit",
                    "isDisabled": disabledButton
                }}
                    isLoading={isLoading}
                />
            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAssignment: (ClasId, data) => dispatch(CreateAssignment(ClasId, data)),
        EditAssignment: (ClasId, assId) => dispatch(EditAssignment(ClasId, assId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForms);