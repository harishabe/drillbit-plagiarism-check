import React, { useState, useEffect } from 'react';
import SuperAdmin from '../../layouts/SuperAdmin';
import styled from 'styled-components';
import { TicketTable, BreadCrumb, CreateDrawer } from '../../components';
import { Box, Grid, Pagination } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import TicketResolutionForm from './form/ticketResolutionForm';

export const PaginationContainer = styled.div`
    margin-top:25px;
    display:flex;
    justify-content:center;
`

const columns = [
    { id: 'ticket_id', label: 'Ticket ID', maxWidth: 110 },
    { id: 'name', label: 'Name', maxWidth: 100 },
    { id: 'username', label: 'Email', maxWidth: 150 },
    { id: 'role', label: 'Role', maxWidth: 150 },
    { id: 'contact', label: 'Contact details', maxWidth: 150 },
    { id: 'location', label: 'Location', maxWidth: 105 },
    { id: 'description', label: 'Description', maxWidth: 140 },
    { id: 'attachment', label: 'Attachment', maxWidth: 140 },
    { id: 'raised_date', label: 'Raised Date', maxWidth: 140 },
    { id: 'status', label: 'Status', maxWidth: 100 },
    { id: 'resolved_date', label: 'Resolved Date', maxWidth: 150 },
    { id: 'action', label: 'Action', minWidth: 90 },
];

function createData(ticket_id, name, username, role, contact, location, description, attachment, raised_date, status, resolved_date, action
) {
    return {
        ticket_id, name, username, role, contact, location, description, attachment, raised_date, status, resolved_date, action
    };
}

const SuperAdminBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/super/dashboard',
        active: false,
    },
    {
        name: 'Ticket',
        link: '',
        active: true,
    },
];

const Data = [{
    'ticket_id': '132232',
    'name': 'Akshay',
    'username': 'gowda.akshay27@gmail.com',
    'role': 'Admin',
    'contact': '7624803666',
    'location': 'India',
    'description': 'Facing some issue',
    'attachment': 'Dummy.pdf',
    'raised_date': '04-05-2023 16:34:22',
    'status': 'Active',
    'resolutions': 'Issue fixed',
    'resolved_date': '29-06-2023 12:42:02',
},
{
    'ticket_id': '132461',
    'name': 'Akshay',
    'username': 'testing123@gmail.com',
    'role': 'Pro Admin',
    'contact': '7624803666',
    'location': 'India',
    'description': 'Facing some issue',
    'attachment': 'Dummy.pdf',
    'raised_date': '04-05-2023 16:34:22',
    'status': 'Active',
    'resolutions': 'Issue fixed',
    'resolved_date': '29-06-2023 12:42:02',
}]

const Ticket = () => {
    const [rows, setRows] = useState([]);
    const [resolutionUserData, setResolutionUserData] = useState('');
    const [resolutionUser, setResolutionUser] = useState(false);

    useEffect(() => {
        let row = '';
        let arr = [];
        Data?.map((data) => {
            row =
                createData(
                    data.ticket_id,
                    data.name,
                    data.username,
                    data.role,
                    data.contact,
                    data.location,
                    data.description,
                    data.attachment,
                    data.raised_date,
                    data.resolved_date,
                    data.status,
                    [
                        { 'component': <ReplyIcon fontSize='small' />, 'type': 'resolution', 'title': 'Add Resolution' }
                    ],
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, []);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'resolution') {
            setResolutionUser(true);
            setResolutionUserData(rowData);
        }
    }

    const handleCloseDrawer = (drawerClose) => {
        setResolutionUser(drawerClose);
    };

    return (
        <>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 10 }>
                        <BreadCrumb item={ SuperAdminBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <TicketTable
                isCheckbox={ false }
                isSorting={ true }
                tableHeader={ columns }
                tableData={ rows }
                handleAction={ handleAction }
            />

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

            {
                resolutionUser &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ resolutionUser }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <TicketResolutionForm
                        editData={ resolutionUserData }
                        />
                </CreateDrawer>
            }
        </>
    );
};

Ticket.layout = SuperAdmin;

export default Ticket;