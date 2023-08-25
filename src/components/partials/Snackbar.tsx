import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React, { useContext, useEffect, useState } from "react";
import { snackBarContext } from "../../App";

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

const SnackBar = () => {
  const [open, setOpen] = useState(true);
  const { snackBarState, snackBarDispatch } = useContext(snackBarContext)!;

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(true);
  }, [snackBarState]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => onClose()}>
      <Alert
        onClose={() => onClose()}
        severity={snackBarState?.severity as AlertColor}
        sx={{
          width: "100%",
        }}
      >
        {snackBarState?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
