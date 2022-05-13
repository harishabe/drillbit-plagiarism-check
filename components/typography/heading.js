import React from 'react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const Heading = ({
    title,
    color
}) => {
    return (
        <Typography variant="h2" color={color} component="div" gutterBottom>
            {title}
        </Typography>
    )
}

Heading.propTypes = {
    title: PropTypes.string
}

export default Heading