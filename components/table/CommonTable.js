import * as React from 'react';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';
import { StatusColor } from '../../pages/style/index';
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Skeleton } from '@mui/material';
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
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import BeatLoader from 'react-spinners/BeatLoader';
import { TableSkeleton, EllipsisText, ErrorBlock } from '../../components';
import { Role } from '../../constant/data';
import {
    TABLE_HEADER_SORT_DISABLE,
    TABLE_BODY_ALLOW_ICON,
    NO_DATA_PLACEHOLDER,
    TABLE_NEXT_PAGE
} from '../../constant/data/Constant';

const useStyles = makeStyles(() => ({
    padding: {
        padding: '0 0 4px 4px'
    },
    customTableContainer: {
        overflowX: 'initial'
    },
    customArrowContainer: {
        marginTop: '14px'
    }
}));

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
    isSorting,
    downloadSubmissionFile,
    showAnalysisPage,
    showGrammarReport,
    isLoadingGrammarReport
}) => {
    const router = useRouter();
    const classes = useStyles();
    const [toggle, setToggle] = React.useState(false);
    const [sortArrow, setSortArrow] = React.useState('');
    const [allSelected, setAllSelected] = React.useState(false);
    const [grammarPaperId, setGrammarPaperId] = React.useState('');


    const sortHandle = (e, column) => {
        let a = !toggle;
        setToggle(a);
        setSortArrow(column.id);
        handleTableSort(e, column, toggle);
    };

    const handleGrammarReport = (e, rowData) => {
        e.preventDefault();
        setGrammarPaperId(rowData?.paper_id);
        showGrammarReport(rowData?.grammar);
    }

    React.useEffect(() => {
        let selected = _.find(tableData, function (o) { return o.isSelected === true; });
        setAllSelected(selected?.isSelected ? true : false);
    }, [tableData]);

    return (
        <Card>
            <CardContent style={{ padding: '15px 0px' }}>
                <TableContainer component={Paper} classes={{ root: classes.customTableContainer }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {isCheckbox &&
                                    <TableCell padding="checkbox" className={classes.padding}>
                                        <Checkbox checked={allSelected} onChange={(e) => handleCheckboxSelect(e, allSelected)} />
                                    </TableCell>}
                                {tableHeader?.map((column) => (
                                    <>
                                        {(isSorting) &&
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {TABLE_HEADER_SORT_DISABLE.includes(column.id) ?
                                                    <EllipsisText value={column.label} charLength={charLength} variant='body2_2' />
                                                    : <TableSortLabel
                                                        onClick={((e) => sortHandle(e, column))}
                                                        IconComponent={
                                                            () =>
                                                                <div style={{ marginTop: '2px' }}>
                                                                    {
                                                                        (toggle && sortArrow === column.id) ?
                                                                            <ArrowDownwardIcon style={{ fontSize: '18px' }} /> :
                                                                            <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                                                                    }
                                                                </div>
                                                        }
                                                    >
                                                        <EllipsisText value={column.label} charLength={charLength} variant='body2_2' />
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
                                    <TableRow hover key={row.id}>
                                        {isCheckbox &&
                                            <TableCell padding="checkbox" className={classes.padding}>
                                                <Checkbox disabled={(row.role === Role.admin) || (row.role === Role.proAdmin)} onChange={(e) => handleSingleSelect(e, row)} checked={row.isSelected} />
                                            </TableCell>}
                                        {tableHeader.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                    {
                                                        TABLE_BODY_ALLOW_ICON.includes(column.id) ?
                                                            <TableCell key={index}>
                                                                {value.map((icon, index) => (
                                                                    <>
                                                                        {
                                                                            (icon.type === 'lock' || icon.type === 'unlock') ?
                                                                                <Tooltip key={index} title={icon.title} arrow>
                                                                                    <span onClick={(e) => handleAction(e, icon.type, row)} >{icon.component}</span>
                                                                                </Tooltip> :
                                                                                <>
                                                                                    <Tooltip key={index} title={icon.title} arrow>
                                                                                        <IconButton onClick={(e) => handleAction(e, icon.type, row)}>{icon.component}
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </>
                                                                        }</>
                                                                ))}
                                                            </TableCell> :
                                                            <>
                                                                {
                                                                    column.isDownload ?
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            <a href='#' style={{ textDecoration: 'underline', color: '#3672FF' }} onClick={(e) => downloadSubmissionFile(e, row)}>
                                                                                {typeof (value) === 'string' ?
                                                                                    <EllipsisText value={value !== null ? value : NO_DATA_PLACEHOLDER} charLength={charLength} variant='body2_3' /> :
                                                                                    <Typography variant='body2_3' component="div">{value !== null ? value : NO_DATA_PLACEHOLDER}</Typography>}
                                                                            </a>
                                                                        </TableCell>
                                                                        :
                                                                        <>
                                                                            {column.id === 'percent' &&
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    {value?.props?.percent === '--' ?
                                                                                        <StatusColor color='#ffe5e5'><BeatLoader size={10} color="#3672FF" /> </StatusColor>
                                                                                        :
                                                                                        <Tooltip title={'Similarity Report'} arrow>
                                                                                            <a style={{ fontWeight: '600' }} href='#' onClick={(e) => showAnalysisPage(e, row)}>
                                                                                                {value}
                                                                                            </a>
                                                                                        </Tooltip>}
                                                                                </TableCell>
                                                                            }
                                                                            {column.id === 'grammar_url' &&
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    {value === '--' && <BeatLoader size={10} color="#3672FF" />}
                                                                                    {(value !== '--' && value !== 'NA') &&
                                                                                        <>
                                                                                            {isLoadingGrammarReport && (row.paper_id === grammarPaperId) ? <Skeleton /> : <Tooltip key={index} title='Grammar Report' arrow>
                                                                                                <IconButton onClick={(e) => handleGrammarReport(e, row)}>
                                                                                                    <OpenInNewOutlinedIcon />
                                                                                                </IconButton>
                                                                                            </Tooltip>}
                                                                                        </>

                                                                                    }
                                                                                    {(value === 'NA') && value}
                                                                                </TableCell>
                                                                            }
                                                                            {(column.id !== 'percent' && column.id !== 'grammar_url') &&
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    {typeof (value) === 'string' ?
                                                                                        <EllipsisText value={value !== null ? value : NO_DATA_PLACEHOLDER} charLength={charLength} variant='body2_3' /> :
                                                                                        <Typography variant='body2_3' component="div">{value !== null ? value : NO_DATA_PLACEHOLDER}</Typography>}
                                                                                </TableCell>
                                                                            }
                                                                        </>
                                                                }
                                                            </>

                                                    }
                                                </>
                                            );
                                        })}
                                        {isNextPath &&
                                            <Tooltip title={TABLE_NEXT_PAGE} arrow>
                                                <IconButton className={classes.customArrowContainer}
                                                    onClick={() => {
                                                        if (path && path?.query?.isAssignment) {
                                                            console.log('rowrow', row);
                                                            path.query['assId'] = row?.id;
                                                            path.query['assName'] = row?.assignment_name,
                                                                path.query['grammar'] = row?.assignmentData?.grammar;
                                                            router.push(path);
                                                        } else {
                                                            router.push(path);
                                                        }
                                                    }}
                                                >
                                                    <ArrowForwardOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    <>
                        {(tableData?.length === 0 && !isLoading) && <ErrorBlock message="No data found" />}
                    </>
                </TableContainer>
            </CardContent>
        </Card>

    );
};

export default CommonTable;
