import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateStudent } from '../../../redux/action/instructor/InstructorAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/instructor-student-form.json';

const StudentForm = ({
    CreateStudent,
    isLoadingCreate
}) => {

    const router = useRouter();

    const ClasId = router.query.clasId;

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        CreateStudent(ClasId, data);
    };

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
                                isLoading={ isLoadingCreate }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoadingCreate: state?.instructorClasses?.isLoadingCreate,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateStudent: (ClasId, data) => dispatch(CreateStudent(ClasId, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);