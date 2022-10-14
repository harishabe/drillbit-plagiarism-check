import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tooltip, IconButton, Skeleton } from '@mui/material';
import Instructor from '../../../../layouts/Instructor';
import { CommonTable, EllipsisText } from '../../../../components';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../../redux/action/instructor/InstructorAction';
import { DownloadIcon } from '../../../../assets/icon';
import { useRouter } from 'next/router';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { DOWNLOAD_CSV } from '../../../../constant/data/Constant';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import { NO_DATA_PLACEHOLDER } from '../../../../constant/data/Constant';

const SkeletonContainer = styled.div`
    margin-top: 16px;
    margin-right: 5px;
`;

const DownloadField = styled.div`
    position:fixed;
    top: 125px;
    right:25px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const QNA = ({
    GetSubmissionList,
    DownloadCsv,
    ansData,
    queData,
    isLoading,
    isLoadingDownload
}) => {

    const router = useRouter();

    const clasId = router.query.clasId;

    const assId = router.query.assId;

    const [rows, setRows] = useState([]);

    useEffect(() => {
        let url = `classes/${clasId}/assignments/${assId}/qa`;
        GetSubmissionList(url);
    }, [clasId, assId]);

    const columns = [
        { id: 'STname', label: 'Student Name' },
        { id: 'q1', label: queData?.q1 !== null ? queData?.q1 : '' },
        { id: 'q2', label: queData?.q2 !== null ? queData?.q2 : '' },
        { id: 'q3', label: queData?.q3 !== null ? queData?.q3 : '' },
        { id: 'q4', label: queData?.q4 !== null ? queData?.q4 : '' },
        { id: 'q5', label: queData?.q5 !== null ? queData?.q5 : '' },
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
                    variant={ 'subtitle2' } charLength={ 30 } />,
                <EllipsisText value={ qna?.a2 === null ? NO_DATA_PLACEHOLDER : qna?.a1 }
                    variant={ 'subtitle2' } charLength={ 30 } />,
                <EllipsisText value={ qna?.a3 === null ? NO_DATA_PLACEHOLDER : qna?.a1 }
                    variant={ 'subtitle2' } charLength={ 30 } />,
                <EllipsisText value={ qna?.a4 === null ? NO_DATA_PLACEHOLDER : qna?.a1 }
                    variant={ 'subtitle2' } charLength={ 30 } />,
                <EllipsisText value={ qna?.a5 === null ? NO_DATA_PLACEHOLDER : qna?.a1 }
                    variant={ 'subtitle2' } charLength={ 30 } />,
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
                    {ansData?.length > 0 &&
                        isLoadingDownload ?
                        <SkeletonContainer>
                            <Skeleton width={40} />
                        </SkeletonContainer>
                        :
                        <Tooltip title="Download csv" arrow>
                            <IconButton
                                aria-label="download-file"
                                size="large"
                                onClick={handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </DownloadButton>
            </DownloadField>
            <CommonTable
                isCheckbox={false}
                isSorting={true}
                tableHeader={columns}
                tableData={rows}
                isLoading={isLoading}
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
