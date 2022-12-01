import * as React from 'react';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import { StatusColor } from '../../style/index';
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
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import BeatLoader from 'react-spinners/BeatLoader';
import { TableSkeleton, EllipsisText, ErrorBlock } from '../../components';
import { DownloadIcon } from '../../assets/icon';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { getItemLocalStorage } from '../../utils/RegExp';
import { Role } from '../../constant/data';
import {
    TABLE_HEADER_SORT_DISABLE,
    TABLE_BODY_ALLOW_ICON,
    NO_DATA_PLACEHOLDER,
    NOT_APPLICABLE
} from '../../constant/data/Constant';

const SavedRepository = styled.div`
    color:#008000;
`;

const AlertMessage = styled.div`
    color:#ff0000;
`;

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
    charLength,
    handleAction,
    handleTableSort,
    handleCheckboxSelect,
    handleSingleSelect,
    isLoading,
    isSorting,
    downloadSubmissionFile,
    showAnalysisPage,
    showGrammarReport,
    isLoadingGrammarReport
}) => {
    const router = useRouter();
    const classes = useStyles();
    const role = getItemLocalStorage('role')
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
            <CardContent style={ { padding: '15px 0px' } }>
                <TableContainer component={ Paper } classes={ { root: classes.customTableContainer } }>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                { isCheckbox &&
                                    <TableCell padding="checkbox" className={ classes.padding }>
                                        <Checkbox checked={ allSelected } onChange={ (e) => handleCheckboxSelect(e, allSelected) } />
                                    </TableCell> }
                                { tableHeader?.map((column, index) => (
                                    <>
                                        { (isSorting) &&
                                            <TableCell
                                                key={ index }
                                                align={ column.align }
                                                style={ { minWidth: column.minWidth } }
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
                                        { isCheckbox &&
                                            <TableCell padding="checkbox" className={ classes.padding }>
                                                <Checkbox disabled={ (row.role === Role.admin) || (row.role === Role.proAdmin) } onChange={ (e) => handleSingleSelect(e, row) } checked={ row.isSelected } />
                                            </TableCell> }
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
                                                                {
                                                                    column.isDownload ?
                                                                        <TableCell align={ column.align }>
                                                                            { typeof (value) === 'string' ?
                                                                                <div style={ { display: 'flex' } }>
                                                                                    <div style={ { width: '20%' } }>
                                                                                        <Tooltip title='Download original file' arrow>
                                                                                            <a href='#' style={ { padding: '0px', color: '#8c8c8c' } } onClick={ (e) => downloadSubmissionFile(e, row) }>
                                                                                                <FileDownloadOutlinedIcon fontSize='small' />
                                                                                            </a>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                    <div style={ { width: '80%' } }>
                                                                                        <EllipsisText value={ value !== null ? value : NO_DATA_PLACEHOLDER } charLength={ charLength } />
                                                                                    </div>
                                                                                </div> :
                                                                                <Typography variant='body2_1' component="div">{ value !== null ? value : NO_DATA_PLACEHOLDER }</Typography> }
                                                                        </TableCell>
                                                                        :
                                                                        <>
                                                                            { column.id === 'percent' &&
                                                                                <TableCell align={ column.align }>


                                                                                    <div style={ { display: 'flex' } }>
                                                                                        {
                                                                                            ((role !== 'student') || (role === 'student' && router?.query?.rep?.toUpperCase() === 'YES')) ?
                                                                                                <>
                                                                                                    <div style={ ((row?.alert_msg !== null && row?.alert_msg !== "")) ? { width: '17%', marginTop: '5px' } : { marginTop: '5px' } }>
                                                                                                        { ((row?.alert_msg != null) && (row?.alert_msg !== "")) &&
                                                                                                            <Tooltip title={ row.alert_msg } arrow>
                                                                                                                <AlertMessage>
                                                                                                                    <ReportProblemOutlinedIcon fontSize='small' />
                                                                                                                </AlertMessage>
                                                                                                            </Tooltip> }
                                                                                                    </div>

                                                                                                    <div style={ (row?.alert_msg === null && row?.alert_msg === "" && row?.repository_status === "0") ? { width: '66%' } : { width: '100%' } }>
                                                                                                        { value?.props?.percent === '--' ?
                                                                                                            <StatusColor color='#E5E5E5'><BeatLoader size={ 10 } color="#3672FF" /> </StatusColor>
                                                                                                            :
                                                                                                            <>
                                                                                                                { (value?.props?.percent === 'NA') ? <StatusColor color='#E5E5E5'>{ NOT_APPLICABLE }</StatusColor> : <Tooltip title={ 'Similarity Report' } arrow>
                                                                                                                    <a style={ { fontWeight: '600' } } href='#' onClick={ (e) => showAnalysisPage(e, row) }>
                                                                                                                        { value }
                                                                                                                    </a>
                                                                                                                </Tooltip> }
                                                                                                            </>
                                                                                                        }
                                                                                                    </div>

                                                                                                    <div style={ row?.repository_status === "1" ? { width: '17%', marginTop: '5px' } : { marginTop: '5px' } }>
                                                                                                        { row?.repository_status === "1" &&
                                                                                                            <Tooltip title='Saved in repository' arrow>
                                                                                                                <SavedRepository>
                                                                                                                    <SaveOutlinedIcon fontSize='small' />
                                                                                                                </SavedRepository>
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    </div>
                                                                                                </> :
                                                                                                <Tooltip title='No access' arrow>
                                                                                                    <StatusColor color='#E5E5E5'>
                                                                                                        Submitted
                                                                                                    </StatusColor>
                                                                                                </Tooltip>
                                                                                        }                           
                                                                                    </div>
                                                                                </TableCell>
                                                                            }
                                                                            { column.id === 'grammar_url' &&
                                                                                <TableCell align={ column.align }>
                                                                                    { value === '--' && <StatusColor color='#E5E5E5'><BeatLoader size={ 10 } color="#3672FF" /></StatusColor> }
                                                                                    { (value !== '--' && value !== 'NA' && value !== null) &&
                                                                                        <>
                                                                                        { isLoadingGrammarReport && (row.paper_id === grammarPaperId) ? <Skeleton /> :
                                                                                                <StatusColor color='#E5E5E5'>
                                                                                                    <Tooltip title='Grammar Report' arrow>
                                                                                                    <div style={ { cursor: 'pointer' } } onClick={ (e) => handleGrammarReport(e, row) }>
                                                                                                            <OpenInNewOutlinedIcon fontSize='small' />
                                                                                                        </div>
                                                                                                    </Tooltip>
                                                                                            </StatusColor> }
                                                                                        </>
                                                                                    }
                                                                                    { (value === 'NA' || value === null) && <StatusColor color='#E5E5E5'>{ NOT_APPLICABLE }</StatusColor> }
                                                                                </TableCell>
                                                                            }
                                                                            { (column.id !== 'percent' && column.id !== 'grammar_url') &&
                                                                                <TableCell align={ column.align }>
                                                                                    { typeof (value) === 'string' ?
                                                                                        <EllipsisText value={ value !== null ? value : NO_DATA_PLACEHOLDER } charLength={ charLength } variant='body2_3' /> :
                                                                                        <Typography variant='body2_3' component="div">{ value !== null ? value : NO_DATA_PLACEHOLDER }</Typography> }
                                                                                </TableCell>
                                                                            }
                                                                        </>
                                                                }
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
                        { (tableData?.length === 0 && !isLoading) && <ErrorBlock message="No data found" /> }
                    </>
                </TableContainer>
            </CardContent>
        </Card>

    );
};

export default CommonTable;
