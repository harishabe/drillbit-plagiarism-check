import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, InputLabel, TextField, Button, Skeleton } from '@mui/material';
import { EllipsisText } from '../../components';
import {
    UPLOAD_FILE_AUTHOR_NAME,
    UPLOAD_FILE_AUTHOR_TITLE,
    UPLOAD_FILE_TYPE,
} from '../../constant/data/ErrorMessage';
import {
    LanguageList
} from '../../redux/action/common/UploadFile/UploadFileAction';
import InputAutoComplete from '../form/elements/InputAutoComplete'

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

const ZipFileForm = ({
    files,
    handleSubmitFile,
    btnTitle,
    isLoading,
    isLoadingLang,
    document_type,
    LanguageList,
    isStudent,
}) => {
    const classes = useStyles();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        let reqPayload = {};
        Object.entries(data).map((key) => {
            if (typeof (key[1]) === 'object') {
                reqPayload[key[0]] = key[1].name;
            } else {
                reqPayload[key[0]] = key[1]
            }
        });
        handleSubmitFile(reqPayload);
    };

    useEffect(() => {
        LanguageList();
    }, []);

    return (
        <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {files && files?.map((item, index) => {
                    return (
                        <Grid container spacing={1} key={item[1]?.name || item.name}>
                            <Grid item md={3} xs={12}>
                                <div style={{ marginTop: '25px' }}>
                                    <EllipsisText value={item[1]?.name || item.name} charLength={22} />
                                </div>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <LabelContainer>
                                    <InputLabel>
                                        Author Name 
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
                                        error={errors['authorName' + index]}
                                        helperText={errors['authorName' + index] && UPLOAD_FILE_AUTHOR_NAME}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                        inputProps={{
                                            minLength: 3,
                                        }}
                                    />
                                
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <LabelContainer>
                                    <InputLabel>
                                        Title 
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
                                        helperText={errors['title' + index] && UPLOAD_FILE_AUTHOR_TITLE}
                                        error={errors['title' + index]}
                                        FormHelperTextProps={{
                                            className: classes.helperText
                                        }}
                                        inputProps={{
                                            minLength: 3,
                                        }}
                                    />                                
                            </Grid>

                            {!isStudent &&
                                <Grid item md={3} xs={12}>
                                    {isLoadingLang ?
                                        <SkeletonContainer>
                                            <Skeleton />
                                        </SkeletonContainer> :
                                        <>
                                            <InputAutoComplete
                                                control={control}
                                                field={{
                                                    'field_type': 'dropdown',
                                                    'style': { marginTop: '0px' },
                                                    'id': 'documentType' + index,
                                                    'label': 'File type',
                                                    'name': 'documentType' + index,
                                                    'required': false,
                                                    'validationMsg': UPLOAD_FILE_TYPE,
                                                    'size': 'small',
                                                    'options': document_type !== undefined && document_type?.map((item) => ({ 'name': item }))
                                                }}
                                            />

                                        </>}
                                </Grid>
                            }
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

ZipFileForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ZipFileForm);
