import React from 'react';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    BorderColor: {
        borderBottom: '2px solid #5a9de9',
    },
}));

const SubTitle = ({
    title,
    isLink,
    textColor,
}) => {
    const classes = useStyles();
    return (
        <Typography variant="h5" color={textColor} component="div" gutterBottom>
            { isLink ?
                <span className={ classes.BorderColor }>
                    <Link href=''>{ title }</Link>
                </span> : title
            }
        </Typography>
    );
};

SubTitle.propTypes = {
    title: PropTypes.string,
    isLink: PropTypes.bool
};

export default SubTitle;