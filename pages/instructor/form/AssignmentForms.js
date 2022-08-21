import React, { useState } from 'react';
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { AddImageIcon } from '../../../assets/icon';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import InputDatePicker from '../../../components/form/elements/InputDatePicker';
import InputToggleButton from '../../../components/form/elements/InputToggleButton';
import InputTextField from '../../../components/form/elements/InputTextField';
import InputFileType from '../../../components/form/elements/InputFileType';
import InputAutoComplete from '../../../components/form/elements/InputAutoComplete';
import InputButton from '../../../components/form/elements/InputButton';
import { CreateAssignment, EditAssignment } from '../../../redux/action/instructor/InstructorAction';
import { convertDate } from '../../../utils/RegExp'

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
    const [questionList, setQuestionList] = React.useState([{
        "question": ""
    }]);
    const [phrasesList, setPhrasesList] = React.useState([{
        "phrases": ""
    }]);


    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('datadatadata', data);
        let bodyFormData = new FormData();
        if (showSetting) {
            bodyFormData.append('assignment_name', data.assignment_name);
            bodyFormData.append('start_date', convertDate(data.start_date));
            bodyFormData.append('end_date', convertDate(data.end_date));
            if (data.file !== undefined) {
                bodyFormData.append('file', data?.file[0]);
            }
            bodyFormData.append('exclude_references', excludeRefBib ? 'Yes' : 'No');
            bodyFormData.append('exclude_quotes', excludeQuote ? 'Yes' : 'No');
            bodyFormData.append('exclude_small_sources', excludeSmallSource ? 'Yes' : 'No');
            bodyFormData.append('assignment_grading', allowAssGrade ? 'Yes' : 'No');
            bodyFormData.append('marks', allowAssGrade ? data.marks : '');
            bodyFormData.append('exclude_include_sources', excludeIncludeSource ? 'Yes' : 'No');
            bodyFormData.append('save_to_repository', saveToRepo ? 'Yes' : 'No');
            bodyFormData.append('allow_resubmissions', allowSubmission ? 'Yes' : 'No');
            bodyFormData.append('allow_submissions_after_due_date', allowSubmissionDueDate ? 'Yes' : 'No');
            bodyFormData.append('grammar_check', grammarCheck ? 'Yes' : 'No');
            bodyFormData.append('choice_of_email_notifications', choiceEmailNotification ? 'Yes' : 'No');
            bodyFormData.append('add_questions', addQuestion ? 'Yes' : 'No');
            bodyFormData.append('exclude_phrases', excludePhrases ? 'Yes' : 'No');
            bodyFormData.append('repository_scope', data?.repository_scope);
            bodyFormData.append('report_access', reportAccess ? 'Yes' : 'No');
            bodyFormData.append('db_studentpaper', studentPaper ? 'Yes' : 'No');
            bodyFormData.append('db_publications', publication ? 'Yes' : 'No');
            bodyFormData.append('db_internet', internet ? 'Yes' : 'No');
            bodyFormData.append('institution_repository', repository ? 'Yes' : 'No');
            bodyFormData.append('daily_submissions_limit', data?.daily_submissions_limit);
            CreateAssignment(router.query.clasId, bodyFormData);
        } else {
            bodyFormData.append('assignment_name', data.assignment_name);
            bodyFormData.append('start_date', convertDate(data.start_date));
            bodyFormData.append('end_date', convertDate(data.end_date));
            if (data.file !== undefined) {
                bodyFormData.append('file', data?.file[0]);
            }
            bodyFormData.append('exclude_references', showSetting && 'Yes');
            bodyFormData.append('exclude_quotes', showSetting && 'Yes');
            bodyFormData.append('exclude_small_sources', showSetting && 'Yes');
            bodyFormData.append('assignment_grading', showSetting && 'Yes');
            bodyFormData.append('exclude_include_sources', showSetting && 'Yes');
            bodyFormData.append('save_to_repository', showSetting && 'Yes');
            bodyFormData.append('allow_resubmissions', showSetting && 'Yes');
            bodyFormData.append('allow_submissions_after_due_date', showSetting && 'Yes');
            bodyFormData.append('grammar_check', showSetting && 'Yes');
            bodyFormData.append('choice_of_email_notifications', showSetting && 'Yes');
            bodyFormData.append('add_questions', showSetting && 'Yes');
            bodyFormData.append('exclude_phrases', showSetting && 'Yes');
            bodyFormData.append('repository_scope', showSetting && 'Yes');
            bodyFormData.append('report_access', showSetting && 'Yes');
            bodyFormData.append('db_studentpaper', showSetting && 'Yes');
            bodyFormData.append('db_publications', showSetting && 'Yes');
            bodyFormData.append('db_internet', showSetting && 'Yes');
            bodyFormData.append('institution_repository', showSetting && 'Yes');
            bodyFormData.append('daily_submissions_limit', showSetting && 'Yes');
            CreateAssignment(router.query.clasId, bodyFormData);
        }

    }


    const handleSwitchChange = (event) => {
        setShowSetting(event.target.checked);
    }

    const handleAllowAssgnmtGrade = (e, newAlignment) => {
        e.preventDefault();
        setAllowAssGrade(newAlignment);
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
        e.preventDefault();
        setQuestionList([...questionList, { question: "" }]);
    }

    const handleAddQuestionRemove = (e, index) => {
        e.preventDefault();
        const list = [...questionList];
        list.splice(index, 1);
        setQuestionList(list);
    }

    const handlePhrases = (e) => {
        e.preventDefault();
        setPhrasesList([...phrasesList, { phrases: "" }]);
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
                        Assignment Name
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
                        "label": "Select Start Date",
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
                        "label": "Select End Date",
                        "minDate": true,
                        "required": "Select End Date",
                        "validationMsg": "Select End Date"
                    }}
                />

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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>

                                </Grid>
                            </Grid>

                            {allowAssGrade === 'yes' && <>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>

                        </div>

                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Save To Institution Repository
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={saveToRepo}
                                        exclusive
                                        onChange={handleSaveToRepo}
                                    >
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            {/* {allowSubmission === 'yes' && <>
                                <InputTextField
                                    control={control}
                                    field={{
                                        "field_type": "input",
                                        "id": "no_of_resubmission",
                                        "name": "no_of_resubmission",
                                        "size": 'small',
                                        "label": "Enter no. of submission",
                                        "required": "Enter number of submission"
                                    }} />
                            </>
                            } */}
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>

                            {addQuestion === 'yes' &&
                                questionList?.map((item, index) => (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item md={9}>
                                                <InputTextField
                                                    control={control}
                                                    field={{
                                                        "field_type": "input",
                                                        "id": "question",
                                                        "value": item?.questionList,
                                                        "name": "question" + index,
                                                        "size": 'small',
                                                        "label": "Enter question " + (index + 1),
                                                        "required": "Enter question"
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                                {questionList.length !== 1 &&
                                                    <Button
                                                        sx={{ marginTop: '35px' }}
                                                        variant="contained"
                                                        onClick={(e) => handleAddQuestionRemove(e, index)}
                                                    >
                                                        Remove
                                                    </Button>}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={12}>
                                                {questionList.length - 1 === index && <Button
                                                    sx={{ marginTop: '14px' }}
                                                    variant="contained"
                                                    onClick={handleMoreAddQuestion}
                                                >
                                                    Add Questions
                                                </Button>}
                                            </Grid>
                                        </Grid>
                                    </>
                                ))
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            {excludePhrases === 'yes' &&
                                phrasesList?.map((item, index) => (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item md={9}>
                                                <InputTextField
                                                    control={control}
                                                    field={{
                                                        "field_type": "input",
                                                        "id": "phrases",
                                                        "value": item?.phrases,
                                                        "name": "phrases" + index,
                                                        "size": 'small',
                                                        "label": "Enter phrases " + (index + 1),
                                                        "required": "Enter phrases"
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={2}>
                                                {phrasesList.length !== 1 &&
                                                    <Button
                                                        sx={{ marginTop: '35px' }}
                                                        variant="contained"
                                                        onClick={(e) => handleRemovePhrases(e, index)}
                                                    >
                                                        Remove
                                                    </Button>}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={12}>
                                                {phrasesList.length - 1 === index && <Button
                                                    sx={{ marginTop: '14px' }}
                                                    variant="contained"
                                                    onClick={handlePhrases}
                                                >
                                                    Add Phrases
                                                </Button>}
                                            </Grid>
                                        </Grid>
                                    </>
                                ))
                            }
                        </div>
                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Report Access
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={reportAccess}
                                        exclusive
                                        onChange={handleReportAccess}
                                    >
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Student Paper
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={studentPaper}
                                        exclusive
                                        onChange={handleStudentPaper}
                                    >
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Publication
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={publication}
                                        exclusive
                                        onChange={handlePublications}
                                    >
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container>
                                <Grid item md={8}>
                                    <InputLabel style={{ margin: '22px 0px' }}>
                                        Internet
                                    </InputLabel>
                                </Grid>
                                <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={internet}
                                        exclusive
                                        onChange={handleInternet}
                                    >
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
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
                                        <ToggleButton value="yes">Yes</ToggleButton>
                                        <ToggleButton value="no">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container>
                                <Grid item md={12} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                    <InputAutoComplete
                                        control={control}
                                        field={{
                                            "field_type": "dropdown",
                                            "id": "repoScope",
                                            "label": "Repository Scope",
                                            "name": "repository_scope",
                                            "required": "Choose repository scope",
                                            "validationMsg": "Please select repository scope",
                                            "options": [{
                                                "name": "Local"
                                            }, {
                                                "name": "Global"
                                            }]
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <InputTextField
                            control={control}
                            field={{
                                "field_type": "input",
                                "id": "daily_submissions_limit",
                                "name": "daily_submissions_limit",
                                "label": "Daily submission limit",
                                "required": "Enter Daily submissin limit"
                            }} />
                    </>
                }

                <InputButton field={{
                    "field_type": "button",
                    "type": "submit",
                    "label": "Submit"
                }} />

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