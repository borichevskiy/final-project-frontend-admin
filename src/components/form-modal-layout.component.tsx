import * as React from "react";
import { PropsForm } from "../app/admin/types/types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

export default function FormDialogWindow({ children, buttonTitle, formTitle }: PropsForm) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <AddIcon
          sx={{
            marginRight: 2,
          }}
        />
        <Typography variant="body2" color="text.primary">
          {buttonTitle}
        </Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
