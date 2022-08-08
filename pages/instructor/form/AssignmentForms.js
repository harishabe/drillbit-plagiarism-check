import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { AddImageIcon } from '../../../assets/icon';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';


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

const AssignmentForms = () => {

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

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form>
                <LabelContainer>
                    <InputLabel>
                        Assignment Name
                    </InputLabel>
                </LabelContainer>
                <TextField
                    fullWidth
                    margin="normal"
                    name="assignment_name"
                    type="text"
                    variant="outlined"
                />
                <LabelContainer>
                    <InputLabel style={{ marginBottom: '10px' }}>
                        Start Date
                    </InputLabel>
                </LabelContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DatePicker
                            style={{ margin: '10px 0px' }}
                            fullWidth
                            margin="normal"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <LabelContainer>
                    <InputLabel style={{ margin: '10px 0px' }}>
                        End Date
                    </InputLabel>
                </LabelContainer>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DatePicker
                            style={{ marginTop: '10px' }}
                            fullWidth
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
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
                                <LabelContainer>
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
                                />
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
                            {allowSubmission === 'yes' && <>
                                <LabelContainer>
                                    <InputLabel style={{ marginTop: '10px' }}>
                                        Number of re-submissions
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="no_of_resubmission"
                                    type="text"
                                    variant="outlined"
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
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                            <TextField
                                                margin="normal"
                                                name="assignment_name"
                                                type="text"
                                                label="Question 1"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                margin="normal"
                                                label="Question 2"
                                                name="assignment_name"
                                                type="text"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                margin="normal"
                                                name="assignment_name"
                                                type="text"
                                                label="Question 3"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                margin="normal"
                                                label="Question 4"
                                                name="assignment_name"
                                                type="text"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                margin="normal"
                                                name="assignment_name"
                                                type="text"
                                                label="Question 5"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                margin="normal"
                                                label="Question 6"
                                                name="assignment_name"
                                                type="text"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </>}
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
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <TextField
                                            margin="normal"
                                            name="assignment_name"
                                            type="text"
                                            label="Phrase 1"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            margin="normal"
                                            name="assignment_name"
                                            type="text"
                                            label="Phrase 1"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            margin="normal"
                                            name="assignment_name"
                                            type="text"
                                            label="Phrase 1"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                            margin="normal"
                                            name="assignment_name"
                                            type="text"
                                            label="Phrase 1"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>}
                        </div>
                    </>
                }
                <Button
                    style={{ padding: '12px', margin: '20px 0px' }}
                    fullWidth
                    size="large"
                    margin="normal"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        </div>
    )
};

export default AssignmentForms;