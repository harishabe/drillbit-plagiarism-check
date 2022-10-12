import React from 'react';
import SquareLoader from 'react-spinners/SquareLoader';

export default function PageChange() {
    return (
        <div>
            <div className="page-transition-wrapper-div">
                <div className="page-transition-icon-wrapper mb-3">
                    <SquareLoader color='#3672FF' loading={true} size={40} />
                </div>
            </div>
        </div>
    );
}
