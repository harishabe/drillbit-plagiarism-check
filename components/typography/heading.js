import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Heading = ({
    title,
    mb
}) => {
    return (
        <Typography variant="h2" component="div" gutterBottom style={{ marginBottom: mb }}>
            {title}
        </Typography>
    );
};

Heading.propTypes = {
    title: PropTypes.string
};

export default Heading;