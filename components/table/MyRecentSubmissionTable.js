import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { SubTitle, SubTitle1, EllipsisText } from '../index';
import { StatusDot } from '../index';

const MarginTop = styled.div`
    marginTop:'7px';
`

const MyRecentSubmissionTable = ({ tableData }) => {
    return (
        <TableContainer>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="2">
                            <SubTitle1 title="Assignments" />
                        </TableCell>
                        <TableCell>
                            <SubTitle1 title="Marks" />
                        </TableCell>
                        <TableCell>
                            <SubTitle1 title="Similarity" />
                        </TableCell>
                        <TableCell>
                            <SubTitle1 title="Status" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { tableData?.map((item, index) => (
                        <TableRow key={ index }>
                            <TableCell style={ { width: '45px' } }>
                                <Avatar
                                    alt={ item.name }
                                    sx={ {
                                        width: 50,
                                        height: 50,
                                        background: item.bgcolor,
                                        color: '#fff',
                                    } }
                                >
                                    { item.lang1.charAt(0) }
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <SubTitle1 title={ item.lang1 } />
                                <EllipsisText value={ item.ass_name } charLength={ 25 } />
                            </TableCell>
                            <TableCell>
                                <SubTitle title={ item.feedback?.marks ? item.feedback?.marks : "NA" } />
                            </TableCell>
                            <TableCell>
                                <SubTitle title={ item.percent } />
                            </TableCell>
                            <TableCell>
                                <MarginTop>
                                    <StatusDot color={ item.status === 'active' ? '#38BE62' : '#E9596F' } title={ item.status } />
                                </MarginTop>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyRecentSubmissionTable
