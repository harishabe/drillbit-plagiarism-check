import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import FormJson from '../../../constant/form/instructor-form.json';

function InstructorForm(){
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log('testtesttest',data);  
    };

    return(
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
export default InstructorForm;