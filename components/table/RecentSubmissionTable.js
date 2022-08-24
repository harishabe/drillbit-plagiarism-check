import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { SubTitle, SubTitle1 } from '../index';

import { StatusDot } from '../../components';

const Colors = ['#7B68C8', '#68C886', '#34C2FF', '#3491FF', '#8D34FF', '#7B68C8'];

const RecentSubmissionTable = ({
    tableData,
    handlePage
}) => {
    return (
        <TableContainer>
            <Table sx={ { minWidth: 350 } } aria-label="simple table">
                <TableBody>
                    { tableData?.map((item, index) => (
                        item['color'] = Colors[index],
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
                                        title={ item.class_name } />
                            </TableCell>
                                <TableCell>
                                <SubTitle
                                        title={ item.percent === '--' ? "--" : `${item.percent}%` } />
                            </TableCell>
                            <TableCell>
                                <StatusDot color="#69C886" title="Active" />                                
                            </TableCell>
                            <TableCell align='right'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={ (e) => handlePage(e, item) }
                                    >Review</Button>
                            </TableCell>
                        </TableRow>
                    )) } 
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RecentSubmissionTable
