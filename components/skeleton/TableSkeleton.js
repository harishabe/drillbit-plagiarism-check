import * as React from 'react';
import { Skeleton } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const TableSkeleton = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
            <TableCell>
                <Skeleton />
            </TableCell>
        </TableRow>
    );
};

export default TableSkeleton;