import React from 'react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const SubTitle1 = ({
    title
}) => {
    return (
        <Typography variant="h5" component="div" gutterBottom>
            {title}
        </Typography>
    )
}

SubTitle1.propTypes = {
    title: PropTypes.string
}

export default SubTitle1