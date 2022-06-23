import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { SubTitle, SubTitle1, EllipsisText } from '../index';
import { IconButton, Skeleton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TableSkeleton } from '../../components';

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: '0 0 4px 4px'
    },
    customTableContainer: {
        overflowX: 'initial'
    }
}))

const CommonTable = ({
    tableHeader,
    tableData,
    isCheckbox,
    path,
    charLength,
    handleAction,
    handleTableSort,
    isLoading
}) => {
    const router = useRouter();
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);

    const sortHandle = (e, column) => {
        let a = !toggle
        setToggle(a);
        handleTableSort(e, column, toggle);
    }

    return (
        <TableContainer classes={{ root: classes.customTableContainer }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {isCheckbox ?
                            <TableCell padding="checkbox" className={classes.padding}>
                                <Checkbox />
                            </TableCell> : ''}
                        {tableHeader.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                <TableSortLabel
                                    onClick={((e) => sortHandle(e, column))}
                                    IconComponent={() => <div style={{ marginTop: '2px' }}>
                                        {
                                            toggle ?
                                                <ArrowDownwardIcon style={{ fontSize: '18px' }} /> :
                                                <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                                        }
                                    </div>
                                    }>
                                    <EllipsisText value={column.label} />
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ?
                        <TableSkeleton />
                        : tableData.map((row) => (
                            <TableRow hover key={row.id} onClick={(e) => router.push(path)}>
                                {isCheckbox ?
                                    <TableCell padding="checkbox" className={classes.padding}>
                                        <Checkbox />
                                    </TableCell> : ''}
                                {tableHeader.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <>
                                            {
                                                column.id === 'action' || column.id === 'stats' ?
                                                    <TableCell>
                                                        {value.map((icon) => (<IconButton onClick={(e) => handleAction(e, icon.type, row)}>{icon.component}</IconButton>))}
                                                    </TableCell> :
                                                    <TableCell key={column.id} align={column.align}>
                                                        {typeof (value) === 'string' ?
                                                            <EllipsisText value={value} charLength={charLength} /> :
                                                            <SubTitle title={value} />}
                                                    </TableCell>
                                            }
                                        </>
                                    )
                                })}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CommonTable
