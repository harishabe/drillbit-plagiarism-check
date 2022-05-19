import * as React from 'react';

const StatusDotIcon = (props) => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="5" cy="5" r="5" fill={props.color} />
        </svg>
    )
};

export default StatusDotIcon;