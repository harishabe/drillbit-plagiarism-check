import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button, Autocomplete } from '@mui/material';
import { EllipsisText, SubTitle } from '..';
import {
    UPLOAD_FILE_AUTHOR_NAME,
    UPLOAD_FILE_PAPER_TITLE,
    UPLOAD_FILE_YEAR,
    UPLOAD_FILE_REPOSITORY_TYPE,
    UPLOAD_FILE_LANGUAGE,
} from '../../constant/data/ErrorMessage';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

const useStyles = makeStyles((theme) => ({
    helperText: {
        marginLeft: 0
    }
}));

const repoType = [
    {
        'label': 'Global'
    },
    {
        'label': 'Institution'
    }
];

const languageType = [
    {
        'label': 'English'
    },
    {
        'label': 'Non-English'
    }
];

const RepositoryFileForm = ({
    files,
    handleSubmitRepository,
    btnTitle,
    isLoading
}) => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        handleSubmitRepository(data);
    };

    return (
        <div style={ { marginTop: '10px' } }>
            <form onSubmit={ handleSubmit(onSubmit) }>
                { files && files?.map((item, index) => {
                    return (
                        <Grid container spacing={ 1 } key={ item[1]?.name }>
                            <Grid item md={ 2 } xs={ 12 }>
                                <div style={ { marginTop: '25px' } }>
                                    <EllipsisText value={ item[1]?.name || item.name || item } charLength={ 10 } />
                                </div>
                            </Grid>
                            <Grid item md={ 2 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Author Name *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={ { marginTop: '0px' } }
                                    fullWidth
                                    margin="normal"
                                    name={ 'authorName' + index }
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    { ...register('authorName' + index, { required: true }) }
                                    helperText={ errors['authorName' + index] && UPLOAD_FILE_AUTHOR_NAME }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                />
                            </Grid>
                            <Grid item md={ 2 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Title *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={ { marginTop: '0px' } }
                                    fullWidth
                                    margin="normal"
                                    name={ 'title' + index }
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    { ...register('title' + index, { required: true }) }
                                    helperText={ errors['title' + index] && UPLOAD_FILE_PAPER_TITLE }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                />
                            </Grid>
                            <Grid item md={ 2 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Year *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={ { marginTop: '0px' } }
                                    fullWidth
                                    margin="normal"
                                    name={ 'year' + index }
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    { ...register('year' + index, { required: true }) }
                                    helperText={ errors['year' + index] && UPLOAD_FILE_YEAR }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                />
                            </Grid>
                            <Grid item md={ 2 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Repository *
                                    </InputLabel>
                                </LabelContainer>
                                <Autocomplete
                                    disablePortal
                                    id={ 'repository' + index }
                                    name={ 'repository' + index }
                                    options={ repoType }
                                    size="small"
                                    renderInput={
                                        (params) =>
                                            <TextField
                                                { ...register('repository' + index, { required: true }) } { ...params }
                                                helperText={ errors['repository' + index] && UPLOAD_FILE_REPOSITORY_TYPE }
                                                FormHelperTextProps={ {
                                                    className: classes.helperText
                                                } }
                                            />
                                    }
                                />
                            </Grid>
                            <Grid item md={ 2 } xs={ 12 }>
                                <LabelContainer>
                                    <InputLabel>
                                        Language *
                                    </InputLabel>
                                </LabelContainer>
                                <Autocomplete
                                    disablePortal
                                    id={ 'language' + index }
                                    name={ 'language' + index }
                                    options={ languageType }
                                    size="small"
                                    renderInput={
                                        (params) =>
                                            <TextField
                                                { ...register('language' + index, { required: true }) } { ...params }
                                                helperText={ errors['language' + index] && UPLOAD_FILE_LANGUAGE }
                                                FormHelperTextProps={ {
                                                    className: classes.helperText
                                                } }
                                            />
                                    }
                                />
                            </Grid>
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