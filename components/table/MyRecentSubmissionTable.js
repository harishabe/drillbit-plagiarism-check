import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { SubTitle, SubTitle1, SubTitle2, EllipsisText, SimilarityStatus } from '../index';
import { StatusDot } from '../index';
import { NO_DATA_PLACEHOLDER } from '../../constant/data/Constant';

const MarginTop = styled.div`
    marginTop:'7px';
`;

const MyRecentSubmissionTable = ({ tableData }) => {
    return (
        <TableContainer>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="2" style={ { maxWidth: 180 } }>
                            <SubTitle1 title="Assignments" />
                        </TableCell>
                        <TableCell style={ { maxWidth: 180 } }>
                            <SubTitle1 title="File Name" />
                        </TableCell>
                        <TableCell style={ { maxWidth: 180 } }>
                            <SubTitle1 title="Paper ID" />
                        </TableCell>
                        <TableCell style={ { maxWidth: 180 } }>
                            <SubTitle1 title="Marks" />
                        </TableCell>
                        <TableCell style={ { maxWidth: 180 } }>
                            <SubTitle1 title="Similarity" />
                        </TableCell>
                        <TableCell style={ { maxWidth: 180 } }>
                            <SubTitle1 title="Status" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell style={{ width: '45px' }}>
                                <Avatar
                                    alt={item.name}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        background: item.bgcolor,
                                        color: '#fff',
                                    }}
                                >
                                    {item.ass_name?.charAt(0)?.toUpperCase()}
                                </Avatar>
                            </TableCell>
                            <TableCell style={ { maxWidth: 180 } }>
                                <EllipsisText value={item.ass_name} charLength={15} />
                                <SubTitle2 title={item.lang1} />
                            </TableCell>
                            <TableCell style={ { maxWidth: 180 } }>
                                <EllipsisText value={item.original_fn} charLength={15} />
                            </TableCell>
                            <TableCell style={ { maxWidth: 180 } }>
                                <SubTitle title={item.paper_id} />
                            </TableCell>
                            <TableCell style={ { maxWidth: 180 } }>
                                <SubTitle title={ item.feedback !== null ? item.feedback?.marks : NO_DATA_PLACEHOLDER } />
                            </TableCell>
                            <TableCell style={ { maxWidth: 180 } }>
                                <SimilarityStatus percent={ item.percent } flag={ item.flag } />
                            </TableCell>
                            <TableCell style={ { maxWidth: 180 } }>
                                <MarginTop>
                                    <StatusDot color={item.status === 'active' ? '#38BE62' : '#E9596F'} title={item.status} />
                                </MarginTop>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyRecentSubmissionTable;
