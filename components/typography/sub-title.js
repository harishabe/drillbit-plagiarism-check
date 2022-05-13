import React from 'react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const SubTitle = ({
    title
}) => {
    return (
        <Typography variant="h4" component="div" gutterBottom>
            {title}
        </Typography>
    )
}

SubTitle.propTypes = {
    title: PropTypes.string
}

export default SubTitle