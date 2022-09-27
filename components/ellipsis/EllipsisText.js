import React, { Component } from 'react'
import { Typography, Tooltip } from '@mui/material'

class EllipsisText extends Component {
    constructor(props) {
        super(props)
        this.textElement = React.createRef()
    }

    state = {
        overflowed: false,
        showSnackBar: false,
    };

    render() {
        return (
            <div>
                <Tooltip
                    title={(this.props.value?.length > this.props.charLength) ? this.props.value : ''}
                    arrow>
                    <Typography variant={this.props.variant ? this.props.variant : 'h4'} component="div" gutterBottom
                        ref={this.textElement}>
                        {this.props.label}  {(this.props.value?.length > this.props.charLength) ?
                            (((this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1)).substring(0, this.props.charLength)) + '...') :
                            this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1) }
                    </Typography>
                </Tooltip>

            </div>
        )
    }
}

const useStyles = ((theme) => ({

}))

export default EllipsisText