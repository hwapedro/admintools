import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const ButtonContainer = withStyles({
    root: {
        "& .MuiButton-label": {
        fontSize: '14px',
        
      }
    }
  })(Button);

function ButtonElement({ onClick, children, type }) {

  return (
    <div>
      <ButtonContainer
        type={type}
        variant="outlined"
        color="primary"
        onClick={onClick}
        style = {{ margin: '0px 3px' }}
      >
        {children}
      </ButtonContainer>
    </div>
  );
}

export default ButtonElement;
