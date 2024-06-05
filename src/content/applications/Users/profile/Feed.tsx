import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Feed() {
  const feed = [
    {
      name: 'Mayuri Nayak',
      jobtitle: 'Hiring Recruiters',
      company: 'DevBeeIT',
      avatar: '/static/images/avatars/1.jpg',
      socialAccount: 'https://www.instagram.com/mayuri_nayak/'
    },
    {
      name: 'Chanchal Raut ',
      jobtitle: 'Associate Professor',
      company: 'Persistance',
      avatar: '/static/images/avatars/2.jpg',
      socialAccount: 'https://www.instagram.com/chanchalraut23/'
    },
    {
      name: 'Gautam Ambirwar',
      jobtitle: 'Event Management',
      company: 'BombayWala',
      avatar: '/static/images/avatars/3.jpg',
      socialAccount: 'https://www.instagram.com/gautam_ambirwar/'
    },
    {
      name: 'Romit Shende',
      jobtitle: 'CEO',
      company: 'Amigoes',
      avatar: '/static/images/avatars/4.jpg',
      socialAccount: 'https://www.instagram.com/romit__shende/'
    },
    {
      name: 'Kshitija Barbayya',
      jobtitle: 'Social Worker',
      company: 'Xceller',
      avatar: '/static/images/avatars/5.jpg',
      socialAccount: 'https://www.instagram.com/kshitija_930/'
    },
    {
      name: 'Kunal Sahare',
      jobtitle: 'Paranormal Investigator',
      company: 'NGO',
      avatar: '/static/images/avatars/6.jpg',
      socialAccount: 'https://www.instagram.com/__kunal.sahare___/'
    }
  ];

  return (
    <Card>
      <CardHeader title="Followers Feed" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {feed.map((_feed) => (
            <Grid key={_feed.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_feed.avatar} />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {_feed.company}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {_feed.name}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {_feed.jobtitle}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ color: 'green' }}
                    href={_feed.socialAccount}
                    target="_blank"
                    startIcon={<AddTwoToneIcon />}
                  >
                    Follow
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Feed;
