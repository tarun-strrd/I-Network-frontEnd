import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";

interface SnackBarProps {
  errorMessage: string;
  severity: AlertColor;
  onClose: () => void;
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ errorMessage, severity, onClose, open }: SnackBarProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => onClose()}>
      <Alert
        onClose={() => onClose()}
        severity={severity}
        sx={{
          width: "100%",
        }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
