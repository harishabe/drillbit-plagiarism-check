import React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import styled from 'styled-components';

const SubInfo = styled.sub`
    font-size: 0.625rem;
`;

const SubHeading = ({ title, isSubInfo }) => {
  return (
    <Typography variant="h2_1" component="div" gutterBottom>
      {title}{" "}
      {isSubInfo && (
        <SubInfo> (1 Doc = 20 A4 pages)</SubInfo>
      )}
    </Typography>
  );
};

SubHeading.propTypes = {
  title: PropTypes.string,
};

export default SubHeading;
