import * as React from 'react';

const ClassIcon = (props) => {
    return (
        <svg width="19" height="20" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
            <path d="M0.5 2.5H8.5C8.5 1.96957 8.71071 1.46086 9.08579 1.08579C9.46086 0.710714 9.96957 0.5 10.5 0.5C11.0304 0.5 11.5391 0.710714 11.9142 1.08579C12.2893 1.46086 12.5 1.96957 12.5 2.5H20.5V4.5H19.5V15.5H13.75L15.5 21.5H13.5L11.75 15.5H9.25L7.5 21.5H5.5L7.25 15.5H1.5V4.5H0.5V2.5ZM3.5 4.5V13.5H17.5V4.5H3.5Z" fill="black" fillOpacity="0.6" />
        </svg>

    )
};

export default ClassIcon;