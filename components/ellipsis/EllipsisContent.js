import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    marginLeft: "750px",
    fontSize: "10px",
    marginTop: "10px",
    fontWeight: 550,
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const EllipsisContent = ({ text, maxWidth, lineHeight, variant }) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef(null);
  const [showExpandIcon, setShowExpandIcon] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const containerWidth = textRef?.current?.clientWidth;
    const textWidth = textRef?.current?.scrollWidth;
    setShowExpandIcon(textWidth > containerWidth);
  }, [text, maxWidth]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        maxWidth: maxWidth,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!expanded ? (
        <Typography
          ref={textRef}
          variant={variant || "body2"}
          noWrap={!expanded}
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: lineHeight || "inherit",
          }}
        >
          {text}
        </Typography>
      ) : (
        <Typography variant={variant || "body2"}>{text}</Typography>
      )}
      {showExpandIcon && !expanded && (
        <div onClick={handleExpandClick} className={classes.button}>
          Show more{" "}
        </div>
      )}
      {expanded && (
        <div onClick={handleExpandClick} className={classes.button}>
          Show less{" "}
        </div>
      )}
    </div>
  );
};

export default EllipsisContent;
