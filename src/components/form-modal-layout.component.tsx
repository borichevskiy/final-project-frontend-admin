import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";

import { PropsForm } from "../app/types/types";

export default function FormDialogWindow({ children, buttonTitle, formTitle, handleSubmit }: PropsForm) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container sx={{marginBottom: 4}}>
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
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {children}
            <Grid container sx={{marginTop: 2}}>
              <Button type="submit">Create</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
