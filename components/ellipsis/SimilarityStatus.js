import React from "react";
import styled from "styled-components";
import {
  SIMILARITY_COLOR_STANDARD,
  NO_DATA_PLACEHOLDER,
  NA_DATA_PLACEHOLDER,
  DREP_PLACEHOLDER,
  DOC_ERROR_PLACEHOLDER_1,
  DOC_ERROR_PLACEHOLDER_2,
  COLORS,
} from "../../constant/data/Constant";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";

const StatusColors = styled.div`
    color:${(props) => props.textColor};
    background: ${(props) => props.color};
    width:100%;
    padding: 1px 12px;
    text-align: center;
    border-radius: 5px;
    font-weight:600;
    font-size:14px;
`;

const SimilarityStatus = ({ percent, width, flag }) => {
  const [color, setColor] = useState("");
  const [txtColor, setTextColor] = useState(COLORS.black);
  useEffect(() => {
    if (percent >= 0 && percent <= 10) {
      if (flag === 1) {
        setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UNACCEPTABLE);
        setTextColor(COLORS.black);
      } else {
        setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_SATISFACTORY);
        setTextColor(COLORS.black);
      }
    } else if (percent > 10 && percent <= 40) {
      setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UPGRADE);
      setTextColor(COLORS.black);
    } else if (percent > 40 && percent <= 60) {
      setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_POOR);
      setTextColor(COLORS.black);
    } else if (percent > 60 && percent <= 100) {
      setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UNACCEPTABLE);
      setTextColor(COLORS.black);
    } else if (
      percent === DOC_ERROR_PLACEHOLDER_1 ||
      percent === DOC_ERROR_PLACEHOLDER_2
    ) {
      setColor(SIMILARITY_COLOR_STANDARD.SIMILARITY_UNACCEPTABLE);
      setTextColor(COLORS.black);
    } else if (
      percent === NO_DATA_PLACEHOLDER ||
      percent === NA_DATA_PLACEHOLDER ||
      percent === DREP_PLACEHOLDER
    ) {
      setColor(COLORS.white);
      setTextColor(COLORS.black);
    }
  }, [percent]);

  return (
    <StatusColors color={color} textColor={txtColor} width={width}>
      <Typography variant="h4_1">
        { percent !== NO_DATA_PLACEHOLDER &&
          percent !== DOC_ERROR_PLACEHOLDER_1 &&
          percent !== NA_DATA_PLACEHOLDER &&
          percent !== DOC_ERROR_PLACEHOLDER_2 && 
          percent !== DREP_PLACEHOLDER
          ? percent + "%"
          : percent}
      </Typography>
    </StatusColors>
  );
};

export default SimilarityStatus;
