// import React, { Component } from 'react';
// import { Typography, Tooltip } from '@mui/material';

// class EllipsisText extends Component {
//     constructor(props) {
//         super(props);
//         this.textElement = React.createRef();
//     }

//     state = {
//         overflowed: false,
//         showSnackBar: false,
//     };


//     render() {
//         return (
//             <div>
//                 <Tooltip
//                     title={ (this.props.value?.length > this.props.charLength) ? this.props.value : '' }
//                     arrow>
//                     <Typography variant={ this.props.variant ? this.props.variant : 'h4' } component="div" gutterBottom
//                         ref={ this.textElement }>
//                         { this.props.label }  { (this.props.value?.length > this.props.charLength) ?
//                             (((this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1)).substring(0, this.props.charLength)) + '...') :
//                             this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1) }
//                     </Typography>
//                 </Tooltip>

//             </div>
//         );
//     }
// }

// export default EllipsisText;


// import React, { Component } from 'react';
// import { Typography, Tooltip, Snackbar } from '@mui/material';

// class EllipsisText extends Component {
//     constructor(props) {
//         super(props);
//         this.textElement = React.createRef();
//     }

//     state = {
//         overflowed: false,
//         showSnackBar: false,
//     };

//     componentDidMount() {
//         this.checkOverflow();
//         window.addEventListener('resize', this.checkOverflow);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('resize', this.checkOverflow);
//     }

//     checkOverflow = () => {
//         const { offsetWidth, scrollWidth } = this.textElement.current;
//         const overflowed = scrollWidth > offsetWidth;
//         this.setState({ overflowed });
//     };

//     render() {
//         const { value, variant, maxWidth } = this.props;
//         const { overflowed, showSnackBar } = this.state;

//         const truncatedValue = value && overflowed ? value.slice(0, value.length - 3) + '...' : value;
//         const filledValue = truncatedValue?.padEnd(value.length, ' ');

//         const containerStyle = {
//             maxWidth: maxWidth || '100px',
//             overflowX: 'hidden',
//             tableLayout: 'auto', // Added this line
//         };

//         return (
//             <div style={ containerStyle }>
//                 <Tooltip title={ overflowed ? value : '' } arrow>
//                     <Typography
//                         variant={ variant || 'h4' }
//                         component="div"
//                         gutterBottom
//                         ref={ this.textElement }
//                         style={ { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }
//                     >
//                         { } { value }
//                     </Typography>
//                 </Tooltip>
//                 <Snackbar
//                     open={ showSnackBar }
//                     onClose={ () => this.setState({ showSnackBar: false }) }
//                     message="Text overflowed"
//                 />
//             </div>
//         );
//     }
// }

// export default EllipsisText;

import React, { useRef, useEffect, useState } from 'react';
import { Typography, Tooltip, Snackbar } from '@mui/material';

const EllipsisText = ({ value, variant, tableHeader }) => {
    const textElement = useRef(null);
    const [overflowed, setOverflowed] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [maxWidth, setMaxWidth] = useState(calculateMaxWidth());

    function calculateMaxWidth() {
        if (typeof window !== 'undefined') {
            const zoomPercentage = window.innerWidth / window.outerWidth * 100; // Calculate window zoom percentage

            let maxWidth = 50; // Default maxWidth value

            if (tableHeader !== undefined) {
                switch (true) {
                    case tableHeader.length >= 5 && tableHeader.length <= 8:
                        maxWidth = 100;
                        break;
                    case tableHeader.length > 8 && tableHeader.length <= 14:
                        maxWidth = 150;
                        break;
                    case tableHeader.length > 14:
                        maxWidth = 200;
                        break;
                    default:
                        maxWidth = 100;
                }
            }

            // Ensure maxWidth is within the range of 50 to 200
            maxWidth = Math.max(50, Math.min(200, maxWidth));

            console.log('maxWidth', maxWidth);
            return `${maxWidth}px`;
        }
    }

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setMaxWidth(calculateMaxWidth());
    }, [tableHeader]);

    const handleResize = () => {
        setMaxWidth(calculateMaxWidth());
        checkOverflow();
    };

    const checkOverflow = () => {
        const { offsetWidth, scrollWidth } = textElement.current;
        setOverflowed(scrollWidth > offsetWidth);
    };

    const truncatedValue = value && overflowed ? value.slice(0, value.length - 3) + '...' : value;
    const filledValue = truncatedValue?.padEnd(value.length, ' ');

    const containerStyle = {
        maxWidth: maxWidth,
        overflowX: 'hidden',
        tableLayout: 'auto',
    };

    return (
        <div style={ containerStyle }>
            <Tooltip title={ overflowed ? value : '' } arrow>
                <Typography
                    variant={ variant || 'h4' }
                    component="div"
                    gutterBottom
                    ref={ textElement }
                    style={ { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }
                >
                    { value }
                </Typography>
            </Tooltip>
            <Snackbar
                open={ showSnackBar }
                onClose={ () => setShowSnackBar(false) }
                message="Text overflowed"
            />
        </div>
    );
};

export default EllipsisText;



