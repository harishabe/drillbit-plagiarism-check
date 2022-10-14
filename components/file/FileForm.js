import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button, Autocomplete, Skeleton } from '@mui/material';
import { EllipsisText } from '../../components';
import {
    UPLOAD_FILE_AUTHOR_NAME,
    UPLOAD_FILE_AUTHOR_TITLE,
    UPLOAD_FILE_TYPE,
    UPLOAD_FILE_LANGUAGE
} from '../../constant/data/ErrorMessage';
import {
    LanguageList
} from '../../redux/action/common/UploadFile/UploadFileAction';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

const SkeletonContainer = styled.div`
    margin-top:20px;
`;

const useStyles = makeStyles(() => ({
    helperText: {
        marginLeft: 0
    }
}));

const FileForm = ({
    files,
    handleSubmitFile,
    btnTitle,
    nonEnglishLang,
    isLoading,
    isLoadingLang,
    document_type,
    LanguageList,
    langType,
    isRegionalFile,
    regional_languages
}) => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log('adfadfadfs',data);
        handleSubmitFile(data);
    };

    useEffect(() => {
        LanguageList();
    }, []);

    return (
        console.log('errorserrorserrorserrorserrors',errors),
        <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {files && files?.map((item, index) => {
                    return (
                        <Grid container spacing={1} key={item[1]?.name || item.name}>
                            {langType === 'English' && <Grid item md={2}></Grid>}
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
                                {isLoadingLang ?
                                    <SkeletonContainer>
                                        <Skeleton />    
                                    </SkeletonContainer> :
                                    <>
                                        <LabelContainer>
                                            <InputLabel>
                                                File type *
                                            </InputLabel>
                                        </LabelContainer>
                                        <Autocomplete
                                            disablePortal
                                            id={'documentType' + index}
                                            name={'documentType' + index}
                                            options={document_type}
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
                                    </>}
                            </Grid>

                            {langType === 'Non English' &&
                                <Grid item md={3} xs={12}>
                                    {
                                        isLoadingLang ? <SkeletonContainer><Skeleton /></SkeletonContainer> :
                                            <>
                                                <LabelContainer>
                                                    <InputLabel>
                                                        Select Language *
                                                    </InputLabel>
                                                </LabelContainer>
                                                <Autocomplete
                                                    disablePortal
                                                    id='Language'
                                                    name='nonEnglishLang'
                                                    options={nonEnglishLang}
                                                    size="small"
                                                    renderInput={
                                                        (params) =>
                                                            <TextField
                                                                {...register('nonEnglishLang', { required: true })} {...params}
                                                                helperText={errors['nonEnglishLang'] && UPLOAD_FILE_LANGUAGE}
                                                                FormHelperTextProps={{
                                                                    className: classes.helperText
                                                                }}
                                                            />
                                                    }
                                                />
                                            </>
                                    }
                                </Grid>}

                            { isRegionalFile &&
                                <Grid item md={ 3 } xs={ 12 }>
                                    {
                                        isLoadingLang ? <SkeletonContainer><Skeleton /></SkeletonContainer> :
                                            <>
                                                <LabelContainer>
                                                    <InputLabel>
                                                        Select Language *
                                                    </InputLabel>
                                                </LabelContainer>
                                                <Autocomplete
                                                    disablePortal
                                                    id='Language'
                                                    name='regionalLanguage'
                                                    options={ regional_languages }
                                                    size="small"
                                                    renderInput={
                                                        (params) =>
                                                            <TextField
                                                                { ...register('regionalLanguage', { required: true }) } { ...params }
                                                                helperText={ errors['regionalLanguage'] && UPLOAD_FILE_LANGUAGE }
                                                                FormHelperTextProps={ {
                                                                    className: classes.helperText
                                                                } }
                                                            />
                                                    }
                                                />
                                            </>
                                    }
                                </Grid> }

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

const mapStateToProps = (state) => ({
    nonEnglishLang: state?.uploadFile?.nonEnglishLang?.non_english_languages,
    document_type: state?.uploadFile?.nonEnglishLang?.document_type,
    regional_languages: state?.uploadFile?.nonEnglishLang?.regional_languages,
    isLoadingLang: state?.uploadFile?.isLoadingLang,
});

const mapDispatchToProps = (dispatch) => {
    return {
        LanguageList: () => dispatch(LanguageList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileForm);
