import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { SubTitle, SubTitle1 } from '../index';

const RecentSubmissionTable = ({
    tableData
}) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableBody>
                    {tableData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell style={{ width: '45px' }}>
                                <Avatar
                                    alt={item.name}
                                    sx={{ width: 50, height: 50, background: item.color, color: '#fff' }}
                                >{item.name.charAt(0)}
                                </Avatar>
                            </TableCell>
                            <TableCell align='left'>
                                <SubTitle1
                                    title={item.name} />
                                <SubTitle
                                    title={item.course} />
                            </TableCell>
                            <TableCell>
                                <SubTitle1
                                    title={item.feedback} />
                                <SubTitle
                                    title={item.percent} />
                            </TableCell>
                            <TableCell>
                                <SubTitle
                                    title={item.status} />
                            </TableCell>
                            <TableCell align='right'>
                                <Button variant="contained" color="primary">Review</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default RecentSubmissionTable;
