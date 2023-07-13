import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { SubTitle1, SimilarityStatus, EllipsisText } from '../index';
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
                                        <TableCell style={ { width: '45px', maxWidth: 150 } }>
                                        <Avatar
                                            alt={ item.name }
                                            sx={ { width: 50, height: 50, background: item.color, color: '#fff' } }
                                            >{ item?.name?.charAt(0)?.toUpperCase() }
                                        </Avatar>
                                    </TableCell>
                                        <TableCell align='left' style={ { maxWidth: 150 } }>
                                            <EllipsisText value={ item?.name !== null ? item?.name : 'NA' } />
                                            <EllipsisText value={ item?.title !== null ? item?.title : 'NA' } variant={ 'body2' } />
                                    </TableCell>

                                        <TableCell style={ { maxWidth: 150 } }>
                                        <SubTitle1 title={ item.paper_id } />
                                    </TableCell>
                                        <TableCell style={ { maxWidth: 150 } }>
                                            <EllipsisText value={ formatDate(item.date_up) } variant="h5" />
                                    </TableCell>
                                        <TableCell style={ { maxWidth: 150 } }>
                                        <SimilarityStatus
                                            percent={ item.percent }
                                                flag={ item.flag }
                                        />
                                    </TableCell>
                                        <TableCell style={ { maxWidth: 150 } }>
                                        <StatusDot color="#69C886" title={ item.status } />
                                    </TableCell>
                                        <TableCell align='right' style={ { maxWidth: 150 } }>
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
                                        <TableCell style={ { width: '45px', maxWidth: 60 } }>
                                        <Avatar
                                            alt={ item.name }
                                            sx={ { width: 50, height: 50, background: item.color, color: '#fff' } }
                                        >{ item.name.charAt(0).toUpperCase() }
                                        </Avatar>
                                    </TableCell>
                                        <TableCell align='left' style={ { maxWidth: 90 } }>
                                            <EllipsisText
                                                value={ item.name } variant='h5' />
                                            <EllipsisText
                                                value={ item.class_name } variant='h4' />
                                    </TableCell>
                                        <TableCell style={ { maxWidth: 70 } }>
                                        <SimilarityStatus
                                            percent={ item.percent }
                                        />
                                    </TableCell>
                                        <TableCell style={ { maxWidth: 70 } }>
                                        <StatusDot color="#69C886" title={ item.status } />
                                    </TableCell>
                                        <TableCell align='right' style={ { maxWidth: 60 } }>
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
