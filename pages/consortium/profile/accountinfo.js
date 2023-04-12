import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from '@mui/material';
import Admin from './../../../layouts/Admin';
import propTypes from 'prop-types';
import { CardView, CommonTable, MainHeading } from '../../../components';
import { GetProfile } from '../../../redux/action/profile/ProfileAction';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'details', label: 'Details' },
];

function createData(name, details) {
    return { name, details };
};

const AccountInfo = ({
    GetProfile,
    isLoading,
    accountInfo
}) => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetProfile(BASE_URL_SUPER + END_POINTS.CONSORTIUM_ACCOUNT_INFORMATION);
    }, []);

    useEffect(() => {
        let row = [
            createData('Institution Name', accountInfo?.name ? accountInfo?.name : '-'),
            createData('Country', accountInfo?.country ? accountInfo?.country : '-'),
            createData('Username', accountInfo?.email ? accountInfo?.email : '-'),
            createData('Start date', accountInfo?.created_date ? accountInfo?.created_date : '-'),
            createData('End date', accountInfo?.expiry_date ? accountInfo?.expiry_date : '-'),
            createData('No. of submission alloted', accountInfo?.submissions ? accountInfo?.submissions : '-'),
            createData('No. of institution', accountInfo?.institutions ? accountInfo?.institutions : '-'),
        ];
        setRows([...row]);
    }, [accountInfo]);


    return (
        <React.Fragment>
            <MainHeading title='Account Information' />
            <CardView>
                { isLoading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <CommonTable
                        isCheckbox={ false }
                        tableHeader={ columns }
                        tableData={ rows }
                        charLength={ 50 }
                        path=''
                    />
                ) }

            </CardView>
        </React.Fragment >
    );
};

AccountInfo.propTypes = {
    GetProfile: propTypes.func,
    accountInfo: propTypes.object,
    isLoading: propTypes.bool,
};

const mapStateToProps = (state) => ({
    accountInfo: state?.profile?.profileData,
    isLoading: state?.profile?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetProfile: (role) => dispatch(GetProfile(role))
    };
};

AccountInfo.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);