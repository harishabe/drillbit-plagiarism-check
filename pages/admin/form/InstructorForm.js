import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateInstructorData } from '../../../redux/action/admin/AdminAction';
import AddImageIcon from '../../../assets/icon/AddImageIcon';
import FormJson from '../../../constant/form/instructor-form.json';

const InstructorForm = ({
    CreateInstructorData,
    isLoading
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
        CreateInstructorData(Detaileddata);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                {FormJson?.map((field, i) => (
                    <Grid md={12} style={{ marginLeft: '8px' }}>
                        <FormComponent
                            key={i}
                            field={field}
                            control={control}
                            isLoading={isLoading}
                        />
                    </Grid>
                ))}
            </Grid>
        </form>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state?.adminCrud?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateInstructorData: (data) => dispatch(CreateInstructorData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorForm);