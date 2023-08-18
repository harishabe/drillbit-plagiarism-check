import * as React from "react";
import { Skeleton } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const TableSkeleton = ({ isCheckbox, tableDataCount }) => {
  const skeletonCells = new Array(
    isCheckbox ? tableDataCount + 1 : tableDataCount
  )
    .fill(null)
    .map((_, index) => (
      <TableCell key={index}>
        <Skeleton />
      </TableCell>
    ));

  return (
    <TableRow>
      {skeletonCells}
    </TableRow>
  );
};

export default TableSkeleton;
