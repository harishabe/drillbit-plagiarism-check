import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAssignment } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/instructor-assignment-form.json';

const AssignmentForm = ({
    CreateAssignment
}) => {

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const convertData = (str) => {
        let date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), month, day].join("-");
    }

    const onSubmit = (data) => {
        let Detaileddata = { ...data, "expiry_date": convertData(data.expiry_date) }
        CreateAssignment(Detaileddata);
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
        CreateAssignment: (data) => dispatch(CreateAssignment(data)),
    };
};

export default connect(null, mapDispatchToProps)(AssignmentForm);