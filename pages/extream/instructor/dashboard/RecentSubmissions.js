import * as React from 'react';

import { RecentSubmissionTable } from '../../../../components';

const RecentSubmissions = ({
    isUser,
    recentSubmission,
    handlePage
}) => {

    return (
        <RecentSubmissionTable
            isUser={ isUser }
            tableData={ recentSubmission }
            handlePage={ handlePage }
        />
    );
};

export default RecentSubmissions;