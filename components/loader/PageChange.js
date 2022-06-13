import React from "react";
import SquareLoader from "react-spinners/SquareLoader";
import {SubTitle1} from '../../components';

export default function PageChange(props) {
    return (
        <div>
            <div className="page-transition-wrapper-div">
                <div className="page-transition-icon-wrapper mb-3">
                    <SquareLoader color='#3672FF' loading={true} size={60} />
                </div>
                <h4 className="title text-white">
                    <SubTitle1  textColor='primary' title='Loading page...' />
                </h4>
            </div>
        </div>
    );
}
