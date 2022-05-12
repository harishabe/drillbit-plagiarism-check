import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const MainHeading = ({
    title,
    color
}) => {
    return (
        <Typography variant="h1" color={color} component="div" style={{marginBottom:'15px'}}>
            {title}
        </Typography>
    )
};

MainHeading.propTypes = {
    title: PropTypes.string
};

export default MainHeading;