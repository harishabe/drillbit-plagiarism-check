import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button, Autocomplete } from '@mui/material';
import { EllipsisText } from '..';
import {
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

const RepositoryFileFormZip = ({
    files,
    handleSubmitRepositoryZip,
    btnTitle,
    isLoading
}) => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        handleSubmitRepositoryZip(data);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {files &&
                    <Grid container spacing={1} key={files?.name}>
                        <Grid item md={2} xs={12}>
                            <div style={{ marginTop: '25px' }}>
                                <EllipsisText value={files?.name || item} charLength={15} />
                            </div>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <LabelContainer>
                                <InputLabel>
                                    Repository *
                                </InputLabel>
                            </LabelContainer>
                            <Autocomplete
                                disablePortal
                                id={'repository'}
                                name={'repository'}
                                options={repoType}
                                size="small"
                                renderInput={
                                    (params) =>
                                        <TextField
                                            {...register('repository', { required: true })} {...params}
                                            helperText={errors['repository'] && UPLOAD_FILE_REPOSITORY_TYPE}
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                        />
                                }
                            />
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <LabelContainer>
                                <InputLabel>
                                    Language *
                                </InputLabel>
                            </LabelContainer>
                            <Autocomplete
                                disablePortal
                                id={'language'}
                                name={'language'}
                                options={languageType}
                                size="small"
                                renderInput={
                                    (params) =>
                                        <TextField
                                            {...register('language', { required: true })} {...params}
                                            helperText={errors['language'] && UPLOAD_FILE_LANGUAGE}
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                        />
                                }
                            />
                        </Grid>
                    </Grid>

                }
                <div style={ { textAlign: 'center', marginTop: '10px' } }>
                    <Button type="submit" variant="contained" size="large">
                        { isLoading ? <BeatLoader color="#fff" /> : btnTitle }
                    </Button>
                </div>
            </form>
        </div>
    );
};

RepositoryFileFormZip.propTypes = {
    fileData: propTypes.object,
    // btnTitle: propTypes.string,
    handleSubmitRepository: propTypes.func,
    // isLoading: propTypes.bool
};

export default RepositoryFileFormZip;