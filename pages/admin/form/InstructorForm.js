import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { Skeleton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateInstructorData } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/instructor-form.json';

const InstructorForm = ({
    CreateInstructorData
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {FormJson?.map((field, i) => (
                        <Grid md={12} style={{ marginLeft: '8px' }}>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                            />

                        </Grid>
                    ))}
                </Grid>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        CreateInstructorData: (data) => dispatch(CreateInstructorData(data)),
    };
};

export default connect(null, mapDispatchToProps)(InstructorForm);