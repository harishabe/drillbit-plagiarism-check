import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Tooltip, Skeleton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Instructor from '../../../../layouts/Instructor';
import { CommonTable, EllipsisText } from '../../../../components';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../../redux/action/instructor/InstructorAction';
import { useRouter } from 'next/router';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { DOWNLOAD_CSV } from '../../../../constant/data/Constant';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import { NO_DATA_PLACEHOLDER } from '../../../../constant/data/Constant';
import { StyledButtonIcon } from '../../../../style/index';

const SkeletonContainer = styled.div`
    margin-top: 16px;
    margin-right: 5px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const useStyles = makeStyles(() => ({
    button: {
        margin: "10px 6px 0px 0px",
    }
}));

const QNA = ({
    GetSubmissionList,
    DownloadCsv,
    ansData,
    queData,
    isLoading,
    isLoadingDownload
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();
    const clasId = router.query.clasId;
    const assId = router.query.assId;

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("900"));

    const DownloadField = styled.div`
        position:absolute;
        top: ${isSmallScreen ? "85px" : "120px"};
        right:25px;
    `;

    const [rows, setRows] = useState([]);

    useEffect(() => {
        let url = `classes/${clasId}/assignments/${assId}/qa`;
        GetSubmissionList(url);
    }, [clasId, assId]);

    const columns = [
        { id: 'STname', label: 'Student Name', maxWidth: 180 },
        { id: 'q1', label: queData?.q1 !== null ? queData?.q1 : '', maxWidth: 180 },
        { id: 'q2', label: queData?.q2 !== null ? queData?.q2 : '', maxWidth: 180 },
        { id: 'q3', label: queData?.q3 !== null ? queData?.q3 : '', maxWidth: 180 },
        { id: 'q4', label: queData?.q4 !== null ? queData?.q4 : '', maxWidth: 180 },
        { id: 'q5', label: queData?.q5 !== null ? queData?.q5 : '', maxWidth: 180 },
    ];

    function createData(STname, q1, q2, q3, q4, q5) {
        return {
            STname, q1, q2, q3, q4, q5
        };
    }

    useEffect(() => {
        let row = '';
        let arr = [];
        ansData?.map((qna) => {
            row = createData(
                qna.studentName,
                <EllipsisText value={ qna?.a1 === null ? NO_DATA_PLACEHOLDER : qna?.a1 }
                    variant={ 'subtitle2' } />,
                <EllipsisText value={ qna?.a2 === null ? NO_DATA_PLACEHOLDER : qna?.a2 }
                    variant={ 'subtitle2' } />,
                <EllipsisText value={ qna?.a3 === null ? NO_DATA_PLACEHOLDER : qna?.a3 }
                    variant={ 'subtitle2' } />,
                <EllipsisText value={ qna?.a4 === null ? NO_DATA_PLACEHOLDER : qna?.a4 }
                    variant={ 'subtitle2' } />,
                <EllipsisText value={ qna?.a5 === null ? NO_DATA_PLACEHOLDER : qna?.a5 }
                    variant={ 'subtitle2' } />,
            );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [ansData]);

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + `/extreme/classes/${clasId}/assignments/${assId}/qa/download`, DOWNLOAD_CSV.QNA_LISTS);
    };

    return (
        <React.Fragment>
            <DownloadField>
                <DownloadButton>
                    { ansData?.length > 0 &&
                        isLoadingDownload ?
                        <SkeletonContainer>
                            <Skeleton width={ 40 } />
                        </SkeletonContainer>
                        :
                        <Tooltip title="Download csv" arrow>
                            <StyledButtonIcon
                                className={ classes.button }
                                onClick={ handleDownload }
                                variant="outlined"
                                size="small"
                            >
                                <FileDownloadOutlinedIcon fontSize="medium" />
                            </StyledButtonIcon>
                        </Tooltip>
                    }
                </DownloadButton>
            </DownloadField>
            <CommonTable
                isCheckbox={ false }
                isSorting={ true }
                tableHeader={ queData && columns }
                tableData={ rows }
                isLoading={ isLoading }
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.instructorMyFolders?.isLoadingSubmission,
    isLoadingDownload: state?.submission?.isLoadingDownload,
    ansData: state?.instructorMyFolders?.submissionData?.answersDTO?.content,
    queData: state?.instructorMyFolders?.submissionData?.questions,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

QNA.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(QNA);
