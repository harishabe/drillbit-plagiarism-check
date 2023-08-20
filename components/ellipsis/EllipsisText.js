import React, { Component } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Typography, Tooltip, Link } from "@mui/material";

const ComponentContainer = styled.span`
  position: relative;
  top: 4px;
`;

const StyledLinkField = styled(Link)(() => ({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  marginTop: "5px !important",
  color: "#454745 !important",
  textDecorationColor: "#454745 !important",
  cursor: "pointer",
}));

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
    window.addEventListener("resize", this.checkTextOverflow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkTextOverflow);
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

    const handleNavigate = () => {
      this.props.router.push({
        pathname: this.props.pathname,
        query: this.props.queryData,
      });
    };

    return (
      <Tooltip
        title={
          overflowed ||
          (this.props.isFolder &&
            this.props.value?.length > this.props.maxLength)
            ? this.props.value
            : ""
        }
        arrow
      >
        {this.props.isLink ? (
          <div style={{ display: "flex" }}>
            <ComponentContainer>{this.props.component}</ComponentContainer>{" "}
            <StyledLinkField
              onClick={handleNavigate}
              variant={this.props.variant ? this.props.variant : "body2_1"}
              ref={this.textElement}
              onMouseEnter={this.checkTextOverflow}
            >
              {this.props.isFolder
                ? this.props.value?.length > this.props.maxLength
                  ? (
                      this.props.value?.charAt(0).toUpperCase() +
                      this.props.value?.slice(1)
                    ).substring(0, this.props.maxLength) + "..."
                  : this.props.value?.charAt(0).toUpperCase() +
                    this.props.value?.slice(1)
                : this.props.value?.charAt(0).toUpperCase() +
                  this.props.value?.slice(1)}
            </StyledLinkField>
          </div>
        ) : (
          <Typography
            variant={this.props.variant ? this.props.variant : "body2_1"}
            component="div"
            ref={this.textElement}
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            onMouseEnter={this.checkTextOverflow}
          >
            <ComponentContainer>{this.props.component}</ComponentContainer>{" "}
            {this.props.isFolder
              ? this.props.value?.length > this.props.maxLength
                ? (
                    this.props.value?.charAt(0).toUpperCase() +
                    this.props.value?.slice(1)
                  ).substring(0, this.props.maxLength) + "..."
                : this.props.value?.charAt(0).toUpperCase() +
                  this.props.value?.slice(1)
              : this.props.value?.charAt(0).toUpperCase() +
                this.props.value?.slice(1)}
          </Typography>
        )}
      </Tooltip>
    );
  }
}

export default withRouter(EllipsisText);
