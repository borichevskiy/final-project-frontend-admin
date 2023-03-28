import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { OpenModalFormButtonProps } from "app/types/props.type";

export default function OpenModalFormButton(
  { handleClickOpen, buttonTitle }: OpenModalFormButtonProps) {
  return (
    <Button onClick={() => handleClickOpen(undefined)} sx={{ marginBottom: 2 }}>
      <AddIcon/>
      <Typography variant="body2" color="text.primary">
        {buttonTitle}
      </Typography>
    </Button>
  )
}