import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import propTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import { EllipsisText } from '..';
import {
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

const RepositoryFileFormZip = ({
    files,
    handleSubmitRepositoryZip,
    btnTitle,
    isLoading,
    isUploadInProgress
}) => {
    const { control, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        let reqPayload = {};
        Object.entries(data).map((key) => {
            if (typeof (key[1]) === 'object') {
                reqPayload[key[0]] = key[1].name;
            } else {
                reqPayload[key[0]] = key[1]
            }
        });
        handleSubmitRepositoryZip(reqPayload);
    };

    useEffect(() => {
        if (files && isUploadInProgress){
            let resetValues = {
                "repository" : '',
                "language" : ''
            }
            
            reset(resetValues);
        }
    }, [files, reset])
    
    return (
        <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {files &&
                    <Grid container spacing={1} key={files?.name}>
                        <Grid item md={2} xs={12}>
                            <div style={{ marginTop: '25px' }}>
                                <EllipsisText value={ files?.name || item } />
                            </div>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <InputAutoComplete
                                control={ control }
                                field={ {
                                    'field_type': 'dropdown',
                                    'style': { marginTop: '0px' },
                                    'id': 'repository',
                                    'label': 'Repository *',
                                    'name': 'repository',
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
                        <Grid item md={5} xs={12}>
                            <InputAutoComplete
                                control={ control }
                                field={ {
                                    'field_type': 'dropdown',
                                    'style': { marginTop: '0px' },
                                    'id': 'language',
                                    'label': 'Language *',
                                    'name': 'language',
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

                }
                <div style={ { textAlign: 'center', marginTop: '10px' } }>
                    <Button color='primary' disabled={ isLoading } type="submit" variant="contained" size="large">
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