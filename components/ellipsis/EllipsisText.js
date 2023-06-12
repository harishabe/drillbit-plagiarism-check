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
//         // const zoomPercentage = Math.round(typeof window !== "undefined" && window?.devicePixelRatio);
//         // console.log(`Window zoom percentage: ${zoomPercentage}%`);
//         // console.log(`window.innerWidth: ${typeof window !== "undefined" && window?.innerWidth}`);
       
//         return (
//             <div>
//                 <Tooltip
//                     title={ (this.props.value?.length > charLength) ? this.props.value : '' }
//                     arrow>
//                     <Typography variant={ this.props.variant ? this.props.variant : 'h4' } component="div" gutterBottom
//                         ref={this.textElement}>
//                         { this.props.label }  { (this.props.value?.length > charLength) ?
//                             (((this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1)).substring(0, charLength)) + '...') :
//                             this.props.value?.charAt(0).toUpperCase() + this.props.value?.slice(1) }
//                     </Typography>
//                 </Tooltip>

//             </div>
//         );
//     }
// }

// export default EllipsisText;

import React, { Component } from 'react';
import { Typography, Tooltip } from '@mui/material';

class EllipsisText extends Component {
    constructor(props) {
        super(props);
        this.textElement = React.createRef();
        this.state = {
            charLength: 8,
        };
    }

    componentDidMount() {
        this.updateCharLength();
        window.addEventListener('resize', this.updateCharLength);
    }

    componentWillUnmount() {
        this.updateCharLength();
        window.removeEventListener('resize', this.updateCharLength);
    }

    // updateCharLength = () => {
    //     const innerWidth = window.innerWidth;
    //     console.log('innerWidth', innerWidth)
    //     let charLength;
    //     if (innerWidth <= 1280) {
    //         charLength = 8;
    //     } else if (innerWidth >= 1280 && innerWidth <= 1422) {
    //         charLength = 9;
    //     } else if (innerWidth >= 1422 && innerWidth <= 1600) {
    //         charLength = 10;
    //     } else if (innerWidth >= 1600 && innerWidth <= 1707) {
    //         charLength = 15;
    //     } else if (innerWidth >= 1707 && innerWidth <= 1920) {
    //         charLength = 24;
    //     } else if (innerWidth >= 1920 && innerWidth <= 2560) {
    //         charLength = 40;
    //     } else if (innerWidth >= 2560 && innerWidth <= 3840) {
    //         charLength = 45;
    //     } else {
    //         charLength = 55;
    //     }
    //     this.setState({ charLength });
    // };

    updateCharLength = () => {
        const containerWidth = this.textElement.current?.offsetWidth || 0;
        const innerWidth = window.innerWidth;
        let charLength;

        if (innerWidth <= 1280) {
            if (containerWidth <= 60) {
                charLength = 6;
            } else if (containerWidth <= 80) {
                charLength = 8;
            } else if (containerWidth <= 100) {
                charLength = 10;
            } else {
                charLength = Math.floor(containerWidth / 10);
            }
        } else if (innerWidth <= 1422) {
            if (containerWidth <= 60) {
                charLength = 7;
            } else if (containerWidth <= 80) {
                charLength = 9;
            } else if (containerWidth <= 100) {
                charLength = 11;
            } else {
                charLength = Math.floor(containerWidth / 9);
            }
        } else if (innerWidth <= 1600) {
            if (containerWidth <= 60) {
                charLength = 8;
            } else if (containerWidth <= 80) {
                charLength = 10;
            } else if (containerWidth <= 100) {
                charLength = 12;
            } else {
                charLength = Math.floor(containerWidth / 8);
            }
        } else if (innerWidth <= 1707) {
            if (containerWidth <= 60) {
                charLength = 12;
            } else if (containerWidth <= 80) {
                charLength = 15;
            } else if (containerWidth <= 100) {
                charLength = 18;
            } else {
                charLength = Math.floor(containerWidth / 6);
            }
        } else if (innerWidth <= 1920) {
            if (containerWidth <= 60) {
                charLength = 18;
            } else if (containerWidth <= 80) {
                charLength = 24;
            } else if (containerWidth <= 100) {
                charLength = 30;
            } else {
                charLength = Math.floor(containerWidth / 6);
            }
        } else if (innerWidth <= 2560) {
            if (containerWidth <= 60) {
                charLength = 30;
            } else if (containerWidth <= 80) {
                charLength = 40;
            } else if (containerWidth <= 100) {
                charLength = 50;
            } else {
                charLength = Math.floor(containerWidth / 5);
            }
        } else if (innerWidth <= 3840) {
            if (containerWidth <= 60) {
                charLength = 35;
            } else if (containerWidth <= 80) {
                charLength = 40;
            } else if (containerWidth <= 100) {
                charLength = 45;
            } else {
                charLength = Math.floor(containerWidth / 5);
            }
        } else {
            if (containerWidth <= 60) {
                charLength = 45;
            } else if (containerWidth <= 80) {
                charLength = 50;
            } else if (containerWidth <= 100) {
                charLength = 55;
            } else {
                charLength = Math.floor(containerWidth / 5);
            }
        }

        this.setState({ charLength });
    };


    render() {
        const { value, variant, label } = this.props;
        const { charLength } = this.state;

        return (
            <div>
                <Tooltip title={ value?.length > charLength ? value : '' } arrow>
                    <Typography variant={ variant ? variant : 'h4' } component="div" gutterBottom ref={ this.textElement }>
                        { label }{ ' ' }
                        { value?.length > charLength
                            ? ((value?.charAt(0).toUpperCase() + value?.slice(1)).substring(0, charLength) + '...')
                            : value?.charAt(0).toUpperCase() + value?.slice(1) }
                    </Typography>
                </Tooltip>
            </div>
        );
    }
}

export default EllipsisText;



