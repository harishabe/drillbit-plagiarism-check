import * as React from 'react'
import { makeStyles } from '@mui/styles'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { SubTitle, SubTitle1 } from '../index'
import { IconButton } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: '0 0 4px 4px'
    },
    customTableContainer: {
        overflowX: 'initial'
    }
}))

const CommonTable = ({ tableHeader, tableData, isCheckbox, actionIcon, isActionIcon }) => {
    const classes = useStyles()
    return (
        <TableContainer classes={{ root: classes.customTableContainer }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {isCheckbox ? <TableCell padding="checkbox" className={classes.padding}>
                            <Checkbox />
                        </TableCell> : ''}
                        {tableHeader.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                <SubTitle1 title={column.label} />
                            </TableCell>
                        ))}
                        {isActionIcon ?
                            <TableCell>
                                <SubTitle1 title='Action' />
                            </TableCell> : ''}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow hover key={row.id}>
                            {isCheckbox ?
                                <TableCell padding="checkbox" className={classes.padding}>
                                    <Checkbox />
                                </TableCell> : ''}

                            {tableHeader.map((column) => {
                                const value = row[column.id]
                                return (
                                    <>
                                        <TableCell key={column.id} align={column.align}>
                                            <SubTitle title={value} />
                                        </TableCell>
                                    </>
                                )
                            })}
                            {isActionIcon ?
                                <TableCell>
                                    {actionIcon.map((icon) => (
                                        <IconButton>
                                            {icon}
                                        </IconButton>
                                    ))}
                                </TableCell> : ''}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CommonTable
