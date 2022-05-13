import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { SubTitle, SubTitle1 } from '../index'

const CommonTable = ({ tableData }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell colspan="2">
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
          {tableData.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: '45px' }}>
                <Avatar
                  alt={item.name}
                  sx={{
                    width: 50,
                    height: 50,
                    background: item.color,
                    color: '#fff',
                  }}
                >
                  {item.name.charAt(0)}
                </Avatar>
              </TableCell>
              <TableCell style={{ minWidth: 320 }}>
                <SubTitle1 title={item.name} />
                <SubTitle title={item.course} />
              </TableCell>
              <TableCell style={{ minWidth: 300 }}>
                <SubTitle title={item.marks} />
              </TableCell>
              <TableCell style={{ minWidth: 300 }}>
                <SubTitle title={item.percent} />
              </TableCell>
              <TableCell style={{ minWidth: 200 }}>
                <SubTitle title={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CommonTable
