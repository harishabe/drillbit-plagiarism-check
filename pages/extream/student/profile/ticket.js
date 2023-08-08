import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Box, Skeleton, Pagination } from '@mui/material';
import Student from './../../../../layouts/Student';
import { CardView, TicketTable, MainHeading } from '../../../../components';
import { GetProfile } from '../../../../redux/action/profile/ProfileAction';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { getItemSessionStorage } from '../../../../utils/RegExp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export const PaginationContainer = styled.div`
    margin-top:25px;
    display:flex;
    justify-content:center;
`

const columns = [
    { id: 'ticket_id', label: 'Ticket ID', maxWidth: 100 },
    { id: 'raised_date', label: 'Raised Date', maxWidth: 140 },
    { id: 'description', label: 'Description', maxWidth: 140 },
    { id: 'resolutions', label: 'Resolution', maxWidth: 120 },
    { id: 'attachment', label: 'Attachment', maxWidth: 140 },
    { id: 'resolved_date', label: 'Resolved Date', maxWidth: 140 },
    { id: 'status', label: 'Status', maxWidth: 100 },
    { id: 'action', label: 'Actions', maxWidth: 100 },
];

const Data = [{
    'ticket_id': '132461',
    'description': 'Facing some issue',
    'attachment': 'Dummy.pdf',
    'raised_date': '04-05-2023 16:34:22',
    'status': 'Active',
    'resolutions': 'Issue fixed',
    'resolved_date': '29-06-2023 12:42:02',
},
{
    'ticket_id': '132461',
    'description': 'Facing some issue',
    'attachment': 'Dummy.pdf',
    'raised_date': '04-05-2023 16:34:22',
    'status': 'Active',
    'resolutions': 'Issue fixed',
    'resolved_date': '29-06-2023 12:42:02',
}]

function createData(ticket_id, raised_date, description, resolutions, attachment, resolved_date, status, action
) {
    return {
        ticket_id, raised_date, description, resolutions, attachment, resolved_date, status, action
    };
}

const Ticket = ({
    GetProfile,
    isLoading,
}) => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        let roleEndpoint = (getItemSessionStorage('switchRole') !== null ? getItemSessionStorage('switchRole') : getItemSessionStorage('role'));
        GetProfile(BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + roleEndpoint + '/accountInformation');
    }, []);

    useEffect(() => {
        let row = '';
        let arr = [];
        Data?.map((data) => {
            row =
                createData(
                    data.ticket_id,
                    data.raised_date,
                    data.description,
                    data.resolutions,
                    data.attachment,
                    data.resolved_date,
                    data.status,
                    [
                        { 'component': <ThumbUpIcon sx={ { color: '#68C886' } } fontSize='small' />, 'type': 'resolved', 'title': 'Issue resolved' },
                        { 'component': <ThumbDownIcon sx={ { color: '#FF3D3A' } } fontSize='small' />, 'type': 'notResolved', 'title': 'Re-open the issue' }
                    ]
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, []);


    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 }>
                        <MainHeading title='Ticket History' />
                    </Grid>
                </Grid>
            </Box>


            <CardView>
                { isLoading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <TicketTable
                        isCheckbox={ false }
                        isSorting={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        path=''
                    />
                ) }

            </CardView>
            <PaginationContainer>
                <Pagination
                    count={ 1 }
                    page={ 1 }
                    // onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </React.Fragment >
    );
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

Ticket.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);