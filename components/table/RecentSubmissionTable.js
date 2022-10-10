import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { SubTitle, SubTitle1, SimilarityStatus, EllipsisText, SubTitle2 } from '../index';
import { StatusDot } from '../../components';
import { formatDate } from '../../utils/RegExp';

const Colors = ['#7B68C8', '#68C886', '#34C2FF', '#3491FF', '#8D34FF', '#7B68C8'];

const RecentSubmissionTable = ({
    isUser,
    tableData,
    handlePage
}) => {
    return (
        <>
            { isUser ?
                <TableContainer>
                    <Table sx={ { minWidth: 350 } } aria-label="simple table">
                        <TableBody>
                            { tableData?.map((item, index) => (
                                item['color'] = Colors[index],
                                <TableRow key={ index }>
                                    <TableCell style={ { width: '45px' } }>
                                        <Avatar
                                            alt={ item.name }
                                            sx={ { width: 50, height: 50, background: item.color, color: '#fff' } }
                                        >{ item.name.charAt(0).toUpperCase() }
                                        </Avatar>
                                    </TableCell>
                                    <TableCell align='left'>
                                        <EllipsisText value={ item.name } charLength={ 15 } />
                                        <SubTitle2 title={ item.title } />
                                    </TableCell>

                                    <TableCell>
                                        <SubTitle1 title={ item.paper_id } />
                                    </TableCell>
                                    <TableCell>
                                        <SubTitle1 title={ formatDate(item.date_up) } />
                                    </TableCell>
                                    <TableCell>
                                        <SimilarityStatus
                                            percent={ item.percent }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <StatusDot color="#69C886" title={ item.status } />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={ (e) => handlePage(e, item) }
                                        >Review</Button>
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <TableContainer>
                    <Table sx={ { minWidth: 350 } } aria-label="simple table">
                        <TableBody>
                            { tableData?.map((item, index) => (
                                item['color'] = Colors[index],
                                <TableRow key={ index }>
                                    <TableCell style={ { width: '45px' } }>
                                        <Avatar
                                                alt={ item.name }
                                                sx={ { width: 50, height: 50, background: item.color, color: '#fff' } }
                                            >{ item.name.charAt(0).toUpperCase() }
                                            </Avatar>
                                        </TableCell>
                                        <TableCell align='left'>
                                            <SubTitle1
                                                title={ item.name } />
                                            <SubTitle
                                                title={ item.class_name } />
                                        </TableCell>
                                        <TableCell>
                                            <SimilarityStatus
                                                percent={ item.percent }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <StatusDot color="#69C886" title={ item.status } />
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={ (e) => handlePage(e, item) }
                                            >Review</Button>
                                        </TableCell>
                                    </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
};

export default RecentSubmissionTable;
