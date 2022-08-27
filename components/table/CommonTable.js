import * as React from 'react';
import _ from 'lodash';
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
import { IconButton, Skeleton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { SubTitle, TableSkeleton, EllipsisText } from '../../components';

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: '0 0 4px 4px'
    },
    customTableContainer: {
        overflowX: 'initial'
    },
    customArrowContainer: {
        marginTop: '14px'
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
    handleCheckboxSelect,
    handleSingleSelect,
    isNextPath,
    isLoading,
    isSorting
}) => {

    const router = useRouter();
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);
    const [allSelected, setAllSelected] = React.useState(false);

    const sortHandle = (e, column) => {
        let a = !toggle
        setToggle(a);
        handleTableSort(e, column, toggle);
    }

    React.useEffect(() => {
        let selected = _.find(tableData, function (o) { return o.isSelected === true });
        setAllSelected(selected);
    }, [tableData]);

    return (
        <TableContainer classes={{ root: classes.customTableContainer }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {isCheckbox &&
                            <TableCell padding="checkbox" className={classes.padding}>
                                <Checkbox checked={allSelected} onChange={handleCheckboxSelect} />
                            </TableCell>}
                        {tableHeader?.map((column) => (
                            <>
                                {(isSorting) &&
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.id === 'action' || column.id === 'stats' || column.id === 'feedback' ?
                                            <EllipsisText value={column.label} charLength={charLength} />
                                            : <TableSortLabel
                                                onClick={((e) => sortHandle(e, column))}
                                                IconComponent={
                                                    () =>
                                                        <div style={{ marginTop: '2px' }}>
                                                            {
                                                                toggle ?
                                                                    <ArrowDownwardIcon style={{ fontSize: '18px' }} /> :
                                                                    <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                                                            }
                                                        </div>
                                                }
                                            >
                                                <EllipsisText value={column.label} charLength={charLength} />
                                            </TableSortLabel>}

                                    </TableCell>
                                }
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ?
                        <TableSkeleton />
                        : tableData?.map((row) => (

                            < TableRow hover key={row.id}>
                                {isCheckbox &&
                                    <TableCell padding="checkbox" className={classes.padding}>
                                        <Checkbox onChange={(e) => handleSingleSelect(e, row)} checked={row.isSelected} />
                                    </TableCell>}
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
                                                            <EllipsisText value={ value !== null ? value : '--' } charLength={ charLength } /> :
                                                            <SubTitle title={ value !== null ? value : '--' } /> }
                                                    </TableCell>
                                            }
                                        </>
                                    )
                                })}
                                {isNextPath &&
                                    <IconButton className={classes.customArrowContainer}
                                        onClick={(e) => {
                                            if (path && path?.query?.isAssignment) {
                                                path.query['assId'] = row?.id
                                                router.push(path)
                                            } else {
                                                router.push(path);
                                            }
                                        }}
                                    >
                                        <ArrowForwardOutlinedIcon />
                                    </IconButton>
                                }
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CommonTable
