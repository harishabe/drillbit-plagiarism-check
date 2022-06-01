import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Admin from './../../../layouts/Admin';
import { CardView, CommonTable, MainHeading } from '../../../components';

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

const AccountInfo = () => {
    return (
        <React.Fragment>           
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Account Information' />
                    </Grid>
                </Grid>
            </Box>
              <Button variant="contained" color="primary" sx= {{my:3}}>Upload institution logo</Button>
            <CardView>               
                    <CommonTable
                        isCheckbox={false}
                        tableHeader={columns}
                        tableData={rows}    
                        charLength={20}
                    />
            </CardView>
        </React.Fragment>
    )
}



AccountInfo.layout = Admin

export default AccountInfo;