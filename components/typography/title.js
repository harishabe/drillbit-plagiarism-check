import React from 'react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const Title = ({
    title,
    color
}) => {
    return (
        <Typography variant="h3" color={color} component="div" gutterBottom>
            {title}
        </Typography>
    )
}

Title.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
}

export default Title