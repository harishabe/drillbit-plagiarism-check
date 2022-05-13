import React from 'react'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const SubTitle2 = ({
    title,
    ml
}) => {
    return (
        <Typography variant="body2" style={{ marginLeft: ml }} component="div" gutterBottom>
            {title}
        </Typography>
    )
}

SubTitle2.propTypes = {
    title: PropTypes.string
}

export default SubTitle2