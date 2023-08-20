import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const SubHeading = ({
    title
}) => {
    return (
        <Typography variant="h2_1" component="div" gutterBottom>
            {title}
        </Typography>
    );
};

SubHeading.propTypes = {
    title: PropTypes.string
};

export default SubHeading;