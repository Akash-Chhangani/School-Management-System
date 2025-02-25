import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader({ onClick }) {
  const user = {
    name: 'Akash Chhangani',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Transactions
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          color="success"
          onClick={onClick}
        >
          <AddTwoToneIcon
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginRight: '5px'
            }}
          />
          Create transaction
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
