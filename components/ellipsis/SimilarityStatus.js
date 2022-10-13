import React from 'react';
import { StatusColor } from '../../pages/style/index';
import { SIMILARITY_COLOR_STANDARD, NO_DATA_PLACEHOLDER, NA_DATA_PLACEHOLDER, DOC_ERROR_PLACEHOLDER_1, DOC_ERROR_PLACEHOLDER_2, COLORS } from '../../constant/data/Constant';
import { useEffect } from 'react';
import { useState } from 'react';

const SimilarityStatus = ({
    percent,
    width
}) => {
    const [color, setColor] = useState('');
    const [txtColor, setTextColor] = useState(COLORS.black);
    useEffect(() => {
        if (percent >= 0 && percent <= 10) {
            setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_SATISFACTORY);
            setTextColor(COLORS.black);
        } else if (percent > 10 && percent <= 40) {
            setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UPGRADE);
            setTextColor(COLORS.black);
        } else if (percent > 40 && percent <= 60) {
            setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_POOR);
            setTextColor(COLORS.black);
        } else if (percent > 60 && percent <= 100) {
            setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UNACCEPTABLE);
            setTextColor(COLORS.black);
        } else if ((percent === DOC_ERROR_PLACEHOLDER_1 || percent === DOC_ERROR_PLACEHOLDER_2)) {
            setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UNACCEPTABLE);
            setTextColor(COLORS.black);
        } else if (percent === NO_DATA_PLACEHOLDER || percent === NA_DATA_PLACEHOLDER) {
            setColor(COLORS.white);
            setTextColor(COLORS.black);
        }
    }, [percent]);

    return (
        <StatusColor color={color} textColor={txtColor} width={width}>
            { percent !== NO_DATA_PLACEHOLDER && ((percent !== DOC_ERROR_PLACEHOLDER_1) && ((percent !== NA_DATA_PLACEHOLDER)) && (percent !== DOC_ERROR_PLACEHOLDER_2)) ? percent + '%' : percent }
        </StatusColor>
    );
};

export default SimilarityStatus;
