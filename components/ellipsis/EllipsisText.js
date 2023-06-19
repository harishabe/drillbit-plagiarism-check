import React, { useRef, useEffect, useState } from 'react';
import { Typography, Tooltip } from '@mui/material';

const EllipsisText = ({ value, variant }) => {
    const textElement = useRef(null);
    const [maxWidth, setMaxWidth] = useState(() => {
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

        if (screenWidth >= 800 && screenWidth <= 999) {
            return 66;
        } else if (screenWidth >= 1000 && screenWidth <= 1199) {
            return 83;
        } else if (screenWidth >= 1200 && screenWidth <= 1399) {
            return 100;
        } else if (screenWidth >= 1400 && screenWidth <= 1599) {
            return 120;
        } else if (screenWidth >= 1600) {
            return 150;
        } else {
            return 180;
        }
    });
    const [prevZoomPercentage, setPrevZoomPercentage] = useState(typeof window !== 'undefined' && window.innerWidth);
    const [zoomPercentage, setZoomPercentage] = useState(typeof window !== 'undefined' && window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setZoomPercentage(typeof window !== 'undefined' && window.innerWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setPrevZoomPercentage(prevZoomPercentage => {
            if (zoomPercentage !== prevZoomPercentage) {
                return zoomPercentage;
            }
            return prevZoomPercentage;
        });
    }, [zoomPercentage]);

    useEffect(() => {
        if (zoomPercentage > prevZoomPercentage) {
            setMaxWidth(prevMaxWidth => Math.min(prevMaxWidth + 17, 200));
        } else if (zoomPercentage < prevZoomPercentage) {
            setMaxWidth(prevMaxWidth => Math.max(prevMaxWidth - 17, 50));
        }
    }, [zoomPercentage, prevZoomPercentage]);

    const containerStyle = {
        maxWidth: `${maxWidth}px`,
        overflowX: 'hidden',
        tableLayout: 'auto',
    };

    return (
        <div style={ containerStyle }>
            <Tooltip title={ value } arrow>
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
        </div>
    );
};

export default EllipsisText;

// ---------------------- PREVIOUS CODE---------------------------

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

// export default EllipsisText