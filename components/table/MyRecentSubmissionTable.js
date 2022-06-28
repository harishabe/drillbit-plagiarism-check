import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { SubTitle, SubTitle1, EllipsisText } from '../index'

const MyRecentSubmissionTable = ({ tableData }) => {
    return (
        <TableContainer>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="2">
                            <SubTitle1 title="My assignments" />
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
                        <TableRow key={index}>
                            <TableCell style={ { width: '45px' } }>
                                <Avatar
                                    alt={item.name}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        background: item.bgcolor,
                                        color: '#fff',
                                    }}
                                >
                                    { item.lang1.charAt(0) }
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <SubTitle1 title={ item.lang1 } />
                                <EllipsisText value={ item.ass_name } charLength={ 25 } />
                            </TableCell>
                            <TableCell>
                                <SubTitle title={ item.feedback?.marks } />
                            </TableCell>
                            <TableCell>
                                <SubTitle title={item.percent} />
                            </TableCell>
                            <TableCell>
                                <SubTitle title={item.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyRecentSubmissionTable
