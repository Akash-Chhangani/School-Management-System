import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2024 - School Management System
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Created at{' '}
          <Link
            href="https://www.devbeeit.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Perla IT.com
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
