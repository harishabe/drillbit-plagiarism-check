import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const SubTitle2 = ({
    title,
    color,
    ml,
    mt
}) => {
    return (
        <Typography variant="h5_1" color={ color } style={ { marginLeft: ml, marginTop:mt } } component="div">
            {title}
        </Typography>
    );
};

SubTitle2.propTypes = {
    title: PropTypes.string
};

export default SubTitle2;