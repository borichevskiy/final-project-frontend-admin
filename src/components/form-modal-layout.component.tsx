import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";

import { ModalFormLayoutProps } from "../app/types/props.type";

export default function ModalFormLayout(
  { children, formTitle, buttonTitle, handleSubmit, isOpen, handleClose }: ModalFormLayoutProps) {

  return (
    <Grid container sx={{ marginBottom: 4 }}>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {children}
            <Grid container sx={{ marginTop: 2 }}>
              <Button type="submit">{buttonTitle}</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
