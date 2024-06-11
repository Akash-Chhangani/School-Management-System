import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader(props) {
  const user = {
    name: 'Akash Chhangani',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Students
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, These are the list of all the Students in our School
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          color="success"
          onClick={props.data}
        >
          <AddTwoToneIcon
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginRight: '5px'
            }}
          />
          Create New Students
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
