import React from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import FormJson from '../../../../constant/form/admin-repositary-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { RepoUpload } from '../../../../redux/action//admin/AdminAction';

const RepositaryForm = ({
    RepoUpload,
    isLoadingUpload,
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('name', data.name);
        bodyFormData.append('title', data.title);
        bodyFormData.append('year', data.year);
        bodyFormData.append('repository', data.repository.name === 'Institution' ? 'LOCAL' : 'GLOBAL');
        bodyFormData.append('language', data.language.name);
        bodyFormData.append('file', data.file[0]);
        RepoUpload(bodyFormData)
    }

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoadingUpload }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoadingUpload: state?.detailsData?.isLoadingUpload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        RepoUpload: (data) => dispatch(RepoUpload(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositaryForm);