import React from 'react';
import { StatusDotIcon } from '../../assets/icon';

const StatusDot = ({
    color,
    title
}) => {
    return (
        <>
            <StatusDotIcon color={color} /> {title}
        </>
    )
};

export default StatusDot;
