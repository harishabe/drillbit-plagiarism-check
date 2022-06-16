import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateStudent } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/instructor-student-form.json';

const StudentForm = ({
    CreateStudent
}) => {

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        CreateStudent(data);
        console.log("first", data)
    };

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                            />

                        </Grid>
                    )) }
                </Grid>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        CreateStudent: (data) => dispatch(CreateStudent(data)),
    };
};

export default connect(null, mapDispatchToProps)(StudentForm);