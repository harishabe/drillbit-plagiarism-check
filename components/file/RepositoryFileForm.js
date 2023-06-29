import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button, Checkbox } from '@mui/material';
import FormControlLabel from "@mui/material/FormControlLabel";
import { EllipsisText } from '..';
import {
    UPLOAD_FILE_AUTHOR_NAME,
    UPLOAD_FILE_PAPER_TITLE,
    UPLOAD_FILE_YEAR,
    MIN_UPLOAD_FILE_YEAR,
    UPLOAD_FILE_REPOSITORY_TYPE,
    UPLOAD_FILE_LANGUAGE,
} from '../../constant/data/ErrorMessage';
import InputAutoComplete from '../form/elements/InputAutoComplete';
import { handleKeyPress } from '../../utils/RegExp';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

const useStyles = makeStyles(() => ({
    helperText: {
        marginLeft: 0
    }
}));

const RepositoryFileForm = ({
    files,
    handleSubmitRepository,
    btnTitle,
    isLoading,
    exemptCheck,
    handleExemptCheckChange,
    isGDrive
}) => {
    const classes = useStyles();
    const d = new Date();
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        let reqPayload = {};
        Object.entries(data).map((key) => {
            if (typeof (key[1]) === 'object') {
                reqPayload[key[0]] = key[1].name;
            } else {
                reqPayload[key[0]] = key[1]
            }
        });
        handleSubmitRepository(reqPayload);
    };

    return (
        <div style={ { marginTop: '10px' } }>
            <form onSubmit={ handleSubmit(onSubmit) }>
                { files && files?.map((item, index) => {
                    return (
                        <Grid container spacing={ 1 } key={ item[1]?.name }>
                            <Grid item md={ isGDrive ? 2 : 1.4 } xs={ 12 }>
                                <div style={ { marginTop: '25px' } }>
                                    <EllipsisText value={ item[1]?.name || item.name || item } charLength={ 10 } />
                                </div>
                            </Grid>
                            <Grid item md={ isGDrive ? 2 : 1.7 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Author Name *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={ { marginTop: '0px' } }
                                    fullWidth
                                    margin="normal"
                                    name={ 'authorName' + item[0] }
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={ errors['authorName' + item[0]] }
                                    { ...register('authorName' + item[0], { required: true }) }
                                    helperText={ errors['authorName' + item[0]] && UPLOAD_FILE_AUTHOR_NAME }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                    inputProps={ {
                                        minLength: 3,
                                    } }
                                />
                            </Grid>
                            <Grid item md={ isGDrive ? 2 : 1.7 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Title *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={ { marginTop: '0px' } }
                                    fullWidth
                                    margin="normal"
                                    name={ 'title' + item[0] }
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={ errors['title' + item[0]] }
                                    { ...register('title' + item[0], { required: true }) }
                                    helperText={ errors['title' + item[0]] && UPLOAD_FILE_PAPER_TITLE }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                    inputProps={ {
                                        minLength: 3,
                                    } }
                                />
                            </Grid>
                            <Grid item md={ isGDrive ? 2 : 1.7 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Year *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={ { marginTop: '0px' } }
                                    fullWidth
                                    margin="normal"
                                    name={ 'year' + item[0] }
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={ errors['year' + item[0]] }
                                    { ...register('year' + item[0], {
                                        required: { value: true, message: UPLOAD_FILE_YEAR },
                                        min: { value: 2000, message: MIN_UPLOAD_FILE_YEAR },
                                        max: { value: d.getFullYear(), message: `Value should be less than or equal to ${d.getFullYear()}` },
                                    }) }
                                    onKeyPress={ handleKeyPress }
                                    helperText={ errors['year' + item[0]] && errors['year' + item[0]].message }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                />
                            </Grid>
                            <Grid item md={ isGDrive ? 2 : 1.7 } xs={ 12 }>
                                <InputAutoComplete
                                    control={ control }
                                    field={ {
                                        'field_type': 'dropdown',
                                        'style': { marginTop: '0px' },
                                        'id': 'repository' + index,
                                        'label': 'Repository *',
                                        'name': 'repository' + index,
                                        'required': UPLOAD_FILE_REPOSITORY_TYPE,
                                        'validationMsg': UPLOAD_FILE_REPOSITORY_TYPE,
                                        'size': 'small',
                                        'options': [{
                                            'name': 'Global'
                                        }, {
                                            'name': 'Institution'
                                        }]
                                    } }
                                />
                            </Grid>

                            <Grid item md={ isGDrive ? 2 : 1.7 } xs={ 12 }>
                                <InputAutoComplete
                                    control={ control }
                                    field={ {
                                        'field_type': 'dropdown',
                                        'style': { marginTop: '0px' },
                                        'id': 'language' + index,
                                        'label': 'Language *',
                                        'name': 'language' + index,
                                        'required': UPLOAD_FILE_LANGUAGE,
                                        'validationMsg': UPLOAD_FILE_LANGUAGE,
                                        'size': 'small',
                                        'options': [{
                                            'name': 'English'
                                        }, {
                                            'name': 'Non-English'
                                        }]
                                    } }
                                />
                            </Grid>
                            { !isGDrive &&
                                <Grid item md={ 2.0 } xs={ 12 }>
                                    <FormControlLabel
                                        sx={ { marginTop: '18px' } }
                                        control={
                                            <Checkbox
                                                checked={ exemptCheck[item[1].id] }
                                                onChange={ (e) => handleExemptCheckChange(e, item) }
                                                name={ 'rep_ex' + item[0] }
                                                id={ 'rep_ex' + item[0] }
                                            />
                                        }
                                        label="Exempt similarity check"
                                        { ...register('rep_ex' + item[0], { required: false }) }
                                    />
                                </Grid>
                            }
                        </Grid>
                    );
                }) }
                <div style={ { textAlign: 'center', marginTop: '10px' } }>
                    <Button color='primary' disabled={ isLoading } type="submit" variant="contained" size="large">
                        { isLoading ? <BeatLoader color="#fff" /> : btnTitle }
                    </Button>
                </div>
            </form>
        </div>
    );
};

RepositoryFileForm.propTypes = {
    fileData: propTypes.object,
    btnTitle: propTypes.string,
    handleSubmitRepository: propTypes.func,
    isLoading: propTypes.bool
};

export default RepositoryFileForm;