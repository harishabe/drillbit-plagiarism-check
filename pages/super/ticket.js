import React, { useState, useEffect } from 'react';
import SuperAdmin from '../../layouts/SuperAdmin';
import { TicketTable, BreadCrumb } from '../../components';
import { Box, Grid } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const columns = [
    { id: 'ticket_id', label: 'Ticket ID', maxWidth: 90 },
    { id: 'name', label: 'Customer name', maxWidth: 120 },
    { id: 'username', label: 'Email', maxWidth: 150 },
    { id: 'role', label: 'Role', maxWidth: 150 },
    { id: 'contact', label: 'Contact details', maxWidth: 105 },
    { id: 'location', label: 'Location', maxWidth: 105 },
    { id: 'description', label: 'Description', maxWidth: 150 },
    { id: 'attachment', label: 'Attachment', maxWidth: 150 },
    { id: 'raised_date', label: 'Raised Date', maxWidth: 150 },
    { id: 'status', label: 'Status', maxWidth: 100 },
    { id: 'resolutions', label: 'Resolution', maxWidth: 120 },
    { id: 'resolved_date', label: 'Resolved Date', maxWidth: 150 },
    { id: 'action', label: 'Actions', maxWidth: 100 },
];

function createData(ticket_id, name, username, role, contact, location, description, attachment, raised_date, status, resolutions, resolved_date, action
) {
    return {
        ticket_id, name, username, role, contact, location, description, attachment, raised_date, status, resolutions, resolved_date, action
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
    'ticket_id': '132461',
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
}]

const Ticket = () => {
    const [rows, setRows] = useState([]);

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
                    data.status,
                    data.resolutions,
                    data.resolved_date,
                    [
                        { 'component': <ArrowForwardOutlinedIcon />, 'type': 'submit', 'title': 'Submit' }
                    ]
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, []);
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
            />
        </>
    );
};

Ticket.layout = SuperAdmin;

export default Ticket;