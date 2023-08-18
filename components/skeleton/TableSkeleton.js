import * as React from "react";
import { Skeleton } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const TableSkeleton = ({ tableDataCount }) => {
  console.log("tableDataCount", tableDataCount);
  const skeletonCells = new Array(tableDataCount).fill(null).map((_, index) => (
    <TableCell key={index}>
      <Skeleton />
    </TableCell>
  ));

  return <TableRow>{skeletonCells}</TableRow>;
};

export default TableSkeleton;
