import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button } from '@mui/material';
import { EllipsisText } from '..';
import {
    UPLOAD_FILE_AUTHOR_NAME,
    UPLOAD_FILE_PAPER_TITLE,
    UPLOAD_FILE_YEAR,
    UPLOAD_FILE_REPOSITORY_TYPE,
    UPLOAD_FILE_LANGUAGE,
} from '../../constant/data/ErrorMessage';
import InputAutoComplete from '../form/elements/InputAutoComplete'

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
    isLoading
}) => {
    const classes = useStyles();
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
                                    error={ errors['authorName' + index] }
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
                                    error={ errors['title' + index] }
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
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    error={ errors['year' + index] }
                                    { ...register('year' + index, { required: true }) }
                                    helperText={ errors['year' + index] && UPLOAD_FILE_YEAR }
                                    FormHelperTextProps={ {
                                        className: classes.helperText
                                    } }
                                />
                            </Grid>
                            <Grid item md={ 2 } xs={ 12 }>
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

                            <Grid item md={ 2 } xs={ 12 }>
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