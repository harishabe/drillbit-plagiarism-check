import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { AddImageIcon } from '../../../../assets/icon';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import InputTextField from '../../../../components/form/elements/InputTextField';
import InputButton from '../../../../components/form/elements/InputButton';
import { CreateFolder, EditFolder } from '../../../../redux/action/instructor/InstructorAction';
import { ASSIGNMENT_SETTING_VALUE_YES, ASSIGNMENT_SETTING_VALUE_NO } from '../../../../constant/data/Constant';
import { DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK } from '../../../../constant/data/ErrorMessage';
import { ErrorMessageContainer } from '../../../../style/index';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
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
        backgroundColor: '#3672FF !important'
    }
});

const MyFoldersForms = ({
    isLoadingFolder,
    isLoadingEdit,
    CreateFolder,
    EditFolder,
    editData,
    grammarSubscription
}) => {

    const [excludeRefBib, setExcludeRefBib] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludeQuote, setExcludeQuote] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludeSmallSource, setExcludeSmallSource] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [grammarCheck, setGrammarCheck] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [excludePhrases, setExcludePhrases] = React.useState(ASSIGNMENT_SETTING_VALUE_NO);
    const [studentPaper, setStudentPaper] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);
    const [publication, setPublication] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);
    const [internet, setInternet] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);
    const [repository, setRepository] = React.useState(ASSIGNMENT_SETTING_VALUE_YES);

    const [phrasesList, setPhrasesList] = React.useState([{
        'p': ''
    }]);

    const [disabledButton, setDisabledButton] = React.useState(false);
    const [errorMsgDBCheck, setErrorMsgDBCheck] = useState('');
    const [btnLabel, setBtnLabel] = useState('Submit');
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        if (editOperation) {
            editAssignments(data);
        } else {
            let Detaileddata = {
                ...data,
                'exclude_reference': excludeRefBib === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'exclude_quotes': excludeQuote === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'exclude_small_sources': excludeSmallSource === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'grammar_check': grammarCheck === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'exclude_phrases': excludePhrases === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,

                'db_studentpaper': studentPaper === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'db_publications': publication === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'db_internet': internet === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
                'institution_repository': repository === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            };

            if (excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
                let phrasesObj = {};
                phrasesList?.map((item, index) => {
                    phrasesObj['p' + (index + 1)] = item.p;
                });
                Detaileddata['phrases'] = phrasesObj;
            }
            CreateFolder(BASE_URL_EXTREM + END_POINTS.CREATE_FOLDER, Detaileddata);
        }
    };

    const editAssignments = (data) => {
        let editFolderPayload = {
            ...data,
            'exclude_reference': excludeRefBib === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'exclude_quotes': excludeQuote === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'exclude_small_sources': excludeSmallSource === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'grammar_check': grammarCheck === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'exclude_phrases': excludePhrases === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,

            'db_studentpaper': studentPaper === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'db_publications': publication === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'db_internet': internet === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
            'institution_repository': repository === ASSIGNMENT_SETTING_VALUE_YES ? ASSIGNMENT_SETTING_VALUE_YES : ASSIGNMENT_SETTING_VALUE_NO,
        };
        if (excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
            let phrasesObj = {};
            phrasesList?.map((item, index) => {
                phrasesObj['p' + (index + 1)] = item.p;
            });
            editFolderPayload['phrases'] = phrasesObj;
        }
        EditFolder(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA + '/' + (editData?.folder_id || editData?.ass_id), editFolderPayload);
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

    // useEffect(() => {
    //     if (studentPaper === null || publication === null || repository === null || internet === null) {
    //         setDisabledButton(true);
    //         setErrorMsgDBCheck(DB_LIST_ERROR_MESSAGE_PLAGIARISM_CHECK);
    //     } else {
    //         setDisabledButton(false);
    //         setErrorMsgDBCheck('');
    //     }
    // }, [internet, repository, publication, studentPaper]);

    useEffect(() => {
        if (excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
            if (phrasesList.length > 0 && phrasesList[0].p === '') {
                setDisabledButton(true);
                setErrorMsgDBCheck('Enter minimum one phrase');
            } else if (phrasesList.length === 0 && excludePhrases === ASSIGNMENT_SETTING_VALUE_YES) {
                setDisabledButton(true);
                setErrorMsgDBCheck('Enter minimum one phrase');
            } else {
                setDisabledButton(false);
                setErrorMsgDBCheck('');
            }
        } else {
            setDisabledButton(false);
            setErrorMsgDBCheck('');
        }
    }, [excludePhrases, phrasesList]);

    useEffect(() => {
        setExcludeRefBib(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludeQuote(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludeSmallSource(ASSIGNMENT_SETTING_VALUE_NO);
        setGrammarCheck(ASSIGNMENT_SETTING_VALUE_NO);
        setExcludePhrases(ASSIGNMENT_SETTING_VALUE_NO);
        setStudentPaper(ASSIGNMENT_SETTING_VALUE_YES);
        setPublication(ASSIGNMENT_SETTING_VALUE_YES);
        setInternet(ASSIGNMENT_SETTING_VALUE_YES);
        setRepository(ASSIGNMENT_SETTING_VALUE_YES);
    }, []);

    useEffect(() => {
        if (editData !== undefined) {
            let a = {
                'assignment_name': editData.folder_name || editData.assignment_name?.props?.title
            };
            const fields = [
                'assignment_name'
            ];
            fields.forEach(field => setValue(field, a[field]));

            setExcludeRefBib(editData?.excludeReferences?.toUpperCase());
            setExcludeQuote(editData?.excludeQuotes?.toUpperCase());
            setExcludeSmallSource(editData?.excludeSmallSources?.toUpperCase());
            setGrammarCheck(editData?.grammarCheck?.toUpperCase());
            setExcludePhrases(editData?.excludePhrases?.toUpperCase());
            setStudentPaper(editData?.db_studentpaper?.toUpperCase());
            setPublication(editData?.db_publications?.toUpperCase());
            setInternet(editData?.db_internet?.toUpperCase());
            setRepository(editData?.institution_repository?.toUpperCase());

            let editPhrases = [];
            delete editData.phrases.pId;
            Object.entries(editData?.phrases).map((item) => {
                let phrasesObj = {};
                if (item[1] !== null) {
                    phrasesObj['p'] = item[1];
                    editPhrases.push(phrasesObj);
                }
            });
            setPhrasesList(editPhrases);

            setBtnLabel('Edit Folder');
            setEditOperation(true);
        }
    }, [editData]);

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

    const handleGrammarCheck = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setGrammarCheck(value);
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
        <>
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LabelContainer>
                    <InputLabel>
                        Enter folder name *
                    </InputLabel>
                </LabelContainer>
                <InputTextField
                    control={control}
                    field={{
                        'field_type': 'text',
                        'id': 'name',
                        'name': 'assignment_name',
                        'required': 'Enter folder name',
                        'validationMsg': 'Enter folder name'
                    }}
                />
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

                { grammarSubscription?.toUpperCase() === 'YES' && 
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
                }

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
                                                    label={ 'Enter phrases ' + (i + 1) }
                                                    name={item}
                                                    value={item['p']}
                                                    required={ true }
                                                    onChange={handlePharsesChange}
                                                    inputProps={ {
                                                        minLength: 3,
                                                    } }
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
                                sx={{ marginBottom: '10px' }}
                                variant="contained"
                                onClick={addPhrasesInput}
                                disabled={phrasesList.length === 15}
                            >
                                Add Phrases
                            </Button>
                        </>
                    }
                </div>

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

                <div style={{ marginBottom: '15px' }}>
                    {errorMsgDBCheck !== '' ? <ErrorMessageContainer>{errorMsgDBCheck}</ErrorMessageContainer> : ''}
                </div>
                <InputButton field={{
                    'field_type': 'button',
                    'type': 'submit',
                    'label': btnLabel,
                    'isDisabled': disabledButton
                }}
                    isLoading={isLoadingEdit || isLoadingFolder}

                />
            </form>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        CreateFolder: (url, data) => dispatch(CreateFolder(url, data)),
        EditFolder: (url, requestPayload) => dispatch(EditFolder(url, requestPayload)),
    };
};

export default connect(null, mapDispatchToProps)(MyFoldersForms);