import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Title1 = ({
    title,
    color
}) => {
    return (
        <Typography variant="h4_1" color={color} component="div">
            {title}
        </Typography>
    );
};

Title1.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
};

export default Title1;