import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import Admin from './../../../layouts/Admin';
import { Skeleton } from '@mui/material';
import { CardView, CommonTable, MainHeading, FormComponent } from '../../../components';
import FormJson from '../../../constant/form/profile-accountinfo-form.json';
import { GetProfile, ProfileLogo } from '../../../redux/action/profile/ProfileAction';

const columns = [
    { id: 'name', label: ''},
    { id: 'details', label: ''},
]

function createData(name, details) {
    return { name, details }
};

const rows = [
    createData("Institution Name", "XYZ"),
    createData("Admin Username", "XYZ"),
    createData("Account ID", "XYZ"),
    createData("Date Of Activation", "XYZ"),
    createData("Instructor Account", "XYZ"),
    createData("Student Account", "XYZ"),
    createData("Number Of Documents", "XYZ"),
    createData("One Document Length", "XYZ"),
    createData("Date of Expiry", "XYZ"),
    createData("Grammer", "XYZ"),
    createData("Product Name", "XYZ"),
    createData("Time Zone", "XYZ"),
]

const AccountInfo = ({
    GetProfile, 
    ProfileLogo, 
    isLoading
}) => {

    const [formData, setFormData] = useState();

     useEffect(() => {
        GetProfile();
    }, []);

   const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        console.log('datadatadata',data);
         ProfileLogo();
    }


    return (
        <React.Fragment>           
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Account Information' />
                    </Grid>
                </Grid>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        {
                            FormJson?.map((field, i) =>
                            <>
                                <Grid md={3} xs={12}>
                                    <FormComponent
                                        key={i}
                                        field={field}
                                        control={control}
                                    />
                                </Grid>
                            </>)
                        }
                    </Grid>
            </form>
                                
            <CardView>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <CommonTable
                        isCheckbox={false}
                        tableHeader={columns}
                        tableData={rows}    
                        charLength={20}
                    />
                )}
                    
            </CardView>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    profileData: state?.profile?.reportData,
    isLoading: state?.profile?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetProfile: () => dispatch(GetProfile()),
        ProfileLogo: (data) => dispatch(ProfileLogo(data)),
    };
};

AccountInfo.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);