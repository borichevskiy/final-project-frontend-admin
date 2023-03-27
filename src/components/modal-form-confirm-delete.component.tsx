import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { ConfirmWindowProps } from "app/types/props.type";

export default function ConfirmDeletionWindow(
  { handleConfirm, isOpen, handleClose }: ConfirmWindowProps) {
  return (
    <Grid container sx={{ marginBottom: 4 }}>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Deletion confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete?
          <Grid container sx={{ marginTop: 2 }}>
            <Button onClick={handleConfirm}>DELETE</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}