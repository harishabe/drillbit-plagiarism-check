import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const SubTitle1 = ({
    title,
    textColor
}) => {
    return (
        <Typography variant="h5" color={textColor} component="div">
            {title}
        </Typography>
    );
};

SubTitle1.propTypes = {
    title: PropTypes.string
};

export default SubTitle1;