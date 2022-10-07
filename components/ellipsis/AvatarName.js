import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline-flex'
    },
    titlePadding: {
        paddingTop: '9px',
        paddingLeft: '10px'
    }
}));

const AvatarName = ({
    title,
    avatarText,
    color
}) => {
    const classes = useStyles();
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
