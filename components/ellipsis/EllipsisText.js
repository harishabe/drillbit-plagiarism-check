import React, { Component } from 'react';
import { Typography, Tooltip } from '@mui/material';

class EllipsisText extends Component {
    constructor(props) {
        super(props);
        this.textElement = React.createRef();
    }

    state = {
        overflowed: false,
    };

    componentDidMount() {
        this.checkTextOverflow();
        window.addEventListener('resize', this.checkTextOverflow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkTextOverflow);
    }

    checkTextOverflow = () => {
        const textElement = this.textElement.current;
        if (textElement) {
            const isOverflowed = textElement.scrollWidth > textElement.clientWidth;
            this.setState({ overflowed: isOverflowed });
        }
    };

    render() {
        const { overflowed } = this.state;

        return (
            <Tooltip title={ overflowed ? this.props.value : '' } arrow>
                <Typography
                    variant={ this.props.variant ? this.props.variant : 'h4' }
                    component="div"
                    gutterBottom
                    ref={ this.textElement }
                    style={ { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }
                    onMouseEnter={ this.checkTextOverflow }
                >
                    { this.props.component } { this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1) }
                </Typography>
            </Tooltip>
        );
    }
}

export default EllipsisText;
