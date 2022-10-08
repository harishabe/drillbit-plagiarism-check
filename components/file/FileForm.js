import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button, Autocomplete } from '@mui/material';
import { EllipsisText } from '../../components';
import {
    UPLOAD_FILE_AUTHOR_NAME,
    UPLOAD_FILE_AUTHOR_TITLE,
    UPLOAD_FILE_TYPE
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

const fileType = [
    {
        'label': 'Thesis'
    },
    {
        'label': 'Dissertation'
    },
    {
        'label': 'Article'
    },
    {
        'label': 'e-Book'
    },
    {
        'label': 'Synopsis'
    },
    {
        'label': 'Assignment'
    },
    {
        'label': 'Project Work'
    },
    {
        'label': 'Research Paper'
    },
    {
        'label': 'Technical Report'
    },
    {
        'label': 'White Paper'
    },
    {
        'label': 'Chapter In Books'
    },
    {
        'label': 'Analytical/Business Report'
    },
    {
        'label': 'Blogs'
    },
    {
        'label': 'Web Page'
    },
    {
        'label': 'Others'
    }
];

const FileForm = ({
    files,
    handleSubmitFile,
    btnTitle,
    isLoading
}) => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        handleSubmitFile(data);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {files && files?.map((item, index) => {
                    return (
                        <Grid container spacing={1} key={item[1]?.name || item.name}>
                            <Grid item md={3} xs={12}>
                                <div style={{ marginTop: '25px' }}>
                                    <EllipsisText value={item[1]?.name || item.name || item} charLength={22} />
                                </div>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <LabelContainer>
                                    <InputLabel>
                                        Author Name *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={{ marginTop: '0px' }}
                                    fullWidth
                                    margin="normal"
                                    name={'authorName' + index}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register('authorName' + index, { required: true })}
                                    helperText={errors['authorName' + index] && UPLOAD_FILE_AUTHOR_NAME}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <LabelContainer>
                                    <InputLabel>
                                        Title *
                                    </InputLabel>
                                </LabelContainer>
                                <TextField
                                    sx={{ marginTop: '0px' }}
                                    fullWidth
                                    margin="normal"
                                    name={'title' + index}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register('title' + index, { required: true })}
                                    helperText={errors['title' + index] && UPLOAD_FILE_AUTHOR_TITLE}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <LabelContainer>
                                    <InputLabel>
                                        File type *
                                    </InputLabel>
                                </LabelContainer>
                                <Autocomplete
                                    disablePortal
                                    id={'documentType' + index}
                                    name={'documentType' + index}
                                    options={fileType}
                                    size="small"
                                    renderInput={
                                        (params) =>
                                            <TextField
                                                {...register('documentType' + index, { required: true })} {...params}
                                                helperText={errors['documentType' + index] && UPLOAD_FILE_TYPE}
                                                FormHelperTextProps={{
                                                    className: classes.helperText
                                                }}
                                            />
                                    }
                                />
                            </Grid>
                        </Grid>
                    );
                })}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button color='primary' disabled={isLoading} type="submit" variant="contained" size="large">
                        {isLoading ? <BeatLoader color="#fff" /> : btnTitle}
                    </Button>
                </div>
            </form>
        </div>
    );
};

FileForm.propTypes = {
    fileData: propTypes.object,
    btnTitle: propTypes.string,
    handleSubmitFile: propTypes.func,
    isLoading: propTypes.bool
};

export default FileForm;