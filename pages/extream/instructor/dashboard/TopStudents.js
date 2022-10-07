import * as React from 'react';

import { ListView } from '../../../../components';

const Colors = ['#7B68C8', '#68C886', '#68C886'];

const TopStudents = ({
    topStudentData
}) => {

    React.useEffect(() => {
        topStudentData?.map((item, index) => {
            item['bgcolor'] = Colors[index];
        });
    }, [topStudentData]);

    return (
        <ListView listData={ topStudentData } />
    );
};

export default TopStudents;