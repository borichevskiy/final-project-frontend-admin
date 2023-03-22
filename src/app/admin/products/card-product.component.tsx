import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CardProduct() {
  return (
    <Grid>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 200 }}
          image="https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sw=2000"
          title="Product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Product description
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium">
            <EditIcon />
            <Typography variant="body2" color="text.secondary">
              EDIT
            </Typography>
          </Button>
          <Button size="medium">
            <DeleteIcon />
            <Typography variant="body2" color="text.secondary">
              DELETE
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}