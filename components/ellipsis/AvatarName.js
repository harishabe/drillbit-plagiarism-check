import React from 'react';
import Avatar from '@mui/material/Avatar';

const AvatarName = ({
    title,
    avatarText,
    color
}) => {
    return (
        <div style={{ display: 'inline-flex' }}>
            <Avatar
                alt={title}
                sx={{ bgcolor: color, fontSize: '14px' }}>
                {avatarText}
            </Avatar>
            <span style={{ paddingTop: '9px', paddingLeft: '10px' }}>{title}</span>
        </div>
    );
};

export default AvatarName;
