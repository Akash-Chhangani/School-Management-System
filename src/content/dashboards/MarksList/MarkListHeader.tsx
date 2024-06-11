import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function MarkListHeader(props) {
  const user = {
    name: 'Akash Chhangani',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Mark List Records
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, Here are the records of marks assigned to each particular
          subject.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          color="success"
          onClick={props.onClick}
        >
          <AddTwoToneIcon
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginRight: '5px'
            }}
          />
          Assign Marks
        </Button>
      </Grid>
    </Grid>
  );
}

export default MarkListHeader;
