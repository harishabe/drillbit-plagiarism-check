import React, { Component } from 'react';
import styled from 'styled-components';
import { Typography, Tooltip } from '@mui/material';

const ComponentContainer = styled.span`
    position:relative;
    top:4px;
`

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
            <Tooltip title={ overflowed || this.props.isFolder && (this.props.value?.length > this.props.maxLength) ? this.props.value : '' } arrow>
                <Typography
                    variant={ this.props.variant ? this.props.variant : 'body2_1' }
                    component="div"
                    ref={ this.textElement }
                    style={ { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }
                    onMouseEnter={ this.checkTextOverflow }
                >
                    <ComponentContainer>{ this.props.component }</ComponentContainer> { this.props.isFolder ? (this.props.value?.length > this.props.maxLength) ?
                        (((this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1)).substring(0, this.props.maxLength)) + '...') :
                        this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1) : this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1) }
                </Typography>
            </Tooltip>
        );
    }
}

export default EllipsisText;
