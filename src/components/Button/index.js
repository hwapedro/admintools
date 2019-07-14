import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { white } from "ansi-colors";

const ButtonContainer = withStyles({
  root: {
    "& .MuiButton-label": {
      fontSize: "14px"
    }
  }
})(Button);

function ButtonElement({ onClick, children, type, style, color }) {
  color = color ? "white" : "";
  return (
    <div>
      <ButtonContainer
        type={type}
        variant={`${style}`}
        color="primary"
        onClick={onClick}
        style={{ margin: "0px 3px", color: `${color}` }}
      >
        {children}
      </ButtonContainer>
    </div>
  );
}

export default ButtonElement;
