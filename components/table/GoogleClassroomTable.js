import * as React from 'react';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { IconButton, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TableSkeleton, EllipsisText, ErrorBlock, Instructions } from '../../components';
import { getItemSessionStorage } from '../../utils/RegExp';
import { Role } from '../../constant/data';
import {
    TABLE_HEADER_SORT_DISABLE,
    TABLE_BODY_ALLOW_ICON,
    NO_DATA_PLACEHOLDER
} from '../../constant/data/Constant';

const useStyles = makeStyles(() => ({
    padding: {
        padding: '0 0 4px 4px'
    },
    customTableContainer: {
        overflowX: 'initial',
    },
    customArrowContainer: {
        marginTop: '14px'
    }
}));

const GoogleClassroomTable = ({
    tableHeader,
    tableData,
    charLength,
    handleAction,
    handleTableSort,
    isLoading,
    isSorting
}) => {
    const router = useRouter();
    const classes = useStyles();
    const role = getItemSessionStorage('role')
    const [toggle, setToggle] = React.useState(false);
    const [sortArrow, setSortArrow] = React.useState('');

    const sortHandle = (e, column) => {
        let a = !toggle;
        setToggle(a);
        setSortArrow(column.id);
        handleTableSort(e, column, toggle);
    };

    return (
        <Card>
            <CardContent style={ { padding: '15px 0px' } }>
                <TableContainer component={ Paper } classes={ { root: classes.customTableContainer } }>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                { tableHeader?.map((column, index) => (
                                    <>
                                        { (isSorting) &&
                                            <TableCell
                                                key={ index }
                                                align={ column.align }
                                                style={ { minWidth: column.minWidth, maxWidth: column.maxWidth } }
                                            >
                                                { TABLE_HEADER_SORT_DISABLE.includes(column.id) ?
                                                    <EllipsisText value={ column.label } charLength={ charLength } variant='body2_2' />
                                                    : <TableSortLabel
                                                        onClick={ ((e) => sortHandle(e, column)) }
                                                        IconComponent={
                                                            () =>
                                                                <div style={ { marginTop: '2px' } }>
                                                                    {
                                                                        (toggle && sortArrow === column.id) ?
                                                                            <ArrowDownwardIcon style={ { fontSize: '18px' } } /> :
                                                                            <ArrowUpwardIcon style={ { fontSize: '18px' } } />
                                                                    }
                                                                </div>
                                                        }
                                                    >
                                                        <EllipsisText value={ column.label } charLength={ charLength } variant='body2_2' />
                                                    </TableSortLabel> }

                                            </TableCell>
                                        }
                                    </>
                                )) }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { isLoading ?
                                <TableSkeleton />
                                : tableData?.map((row, index) => (
                                    <TableRow hover key={ index }>
                                        { tableHeader.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                    {
                                                        TABLE_BODY_ALLOW_ICON.includes(column.id) ?
                                                            <TableCell>
                                                                { value.map((icon, index) => (
                                                                    <>
                                                                        {
                                                                            (icon.type === 'lock' || icon.type === 'unlock') ?
                                                                                <Tooltip title={ icon.title } arrow>
                                                                                    <span onClick={ (e) => handleAction(e, icon.type, row) } >{ icon.component }</span>
                                                                                </Tooltip> :
                                                                                <>
                                                                                    <Tooltip title={ icon.title } arrow>
                                                                                        <IconButton onClick={ (e) => handleAction(e, icon.type, row) }>{ icon.component }
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </>
                                                                        }</>
                                                                )) }
                                                            </TableCell> :
                                                            <>
                                                                <TableCell align={ column.align }>
                                                                    { typeof (value) === 'string' ?
                                                                        <EllipsisText value={ value !== null ? value : NO_DATA_PLACEHOLDER } charLength={ charLength } variant='body2_3' /> :
                                                                        <Typography variant='body2_3' component="div">{ value !== null ? value : NO_DATA_PLACEHOLDER }</Typography> }
                                                                </TableCell>
                                                            </>

                                                    }
                                                </>
                                            );
                                        }) }
                                    </TableRow>
                                )) }
                        </TableBody>
                    </Table>
                    <>
                        { tableData?.length === 0 && !isLoading && <ErrorBlock message="No data found" /> }
                    </>
                </TableContainer>
            </CardContent>
        </Card>

    );
};

export default GoogleClassroomTable;
