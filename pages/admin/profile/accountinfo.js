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
    { id: 'name', label: '' },
    { id: 'details', label: '' },
];

function createData(name, details) {
    return { name, details }
};

const AccountInfo = ({
    GetProfile,
    ProfileLogo,
    isLoading,
    accountInfo
}) => {
    console.log('accountInfo', accountInfo);
    const [formData, setFormData] = useState();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetProfile();
    }, []);

    useEffect(() => {
        let row = [
            createData("Institution Name", accountInfo?.institutionName),
            createData("Admin Username", accountInfo?.adminUsername),
            createData("Account ID", accountInfo?.accountId),
            createData("Date Of Activation", accountInfo?.dateOfActivation),
            createData("Instructor Account", accountInfo?.instructorAccount),
            createData("Student Account", accountInfo?.studentAccount),
            createData("Number Of Documents", accountInfo?.numberOfDocuments),
            createData("One Document Length", accountInfo?.oneDocumentLength),
            createData("Date of Expiry", accountInfo?.dateOfExpiry),
            createData("Grammer", accountInfo?.grammar),
            createData("Product Name", accountInfo?.productName),
            createData("Time Zone", accountInfo?.timeZone),
        ];
        setRows([...row])

    }, [accountInfo]);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        console.log('datadatadata',data);
        ProfileLogo(data);
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
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <CommonTable
                        isCheckbox={false}
                        tableHeader={columns}
                        tableData={rows}
                        charLength={50}
                        path=''
                    />
                )}

            </CardView>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    accountInfo: state?.profile?.profileData,
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