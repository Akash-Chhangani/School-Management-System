import { Typography } from '@mui/material';
import DataNotFoundImg from './dataNotFound.jpg';

const index = () => {
  return (
    <>
      <Typography variant="h5" align="center" sx={{ marginTop: '2rem' }}>
        <div>
          <img
            style={{
              width: '70vh',
              height: '60vh',
              opacity: '0.5',
              borderRadius: '2rem'
            }}
            src={DataNotFoundImg}
            alt="dataNotFound"
          />
        </div>
        No data found!
      </Typography>
    </>
  );
};

export default index;
