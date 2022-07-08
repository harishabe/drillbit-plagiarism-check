import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateClass } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/myclasses-form.json';
import { AddImageIcon } from '../../../assets/icon';
import { convertDate } from '../../../utils/RegExp';

const MyClassesForm = ({
    CreateClass,
    isLoading,
}) => {

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let Detaileddata = { ...data, "end_date": convertDate(data.end_date) }
        CreateClass(Detaileddata);
    };

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
                        <Grid item md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoading }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateClass: (data) => dispatch(CreateClass(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesForm);