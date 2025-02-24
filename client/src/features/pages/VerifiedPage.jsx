import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button, Stack, Typography } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const VerifiedPage = () => {
  useTitle("Verify user - MERN Invoice");

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      height='94vh'
    >
      <FaCheckCircle className='verified' />
      <Typography variant='h2' gutterBottom>
        Account Verified
      </Typography>
      <Typography variant='h5' component='div' gutterBottom>
        Your account has been verified and is ready for use.
      </Typography>
      <Typography variant='h5' component='div' gutterBottom>
        An email to confim the same has been sent.
      </Typography>
      <Button startIcon={<LockOpenIcon />} endIcon={<LockOpenIcon />}>
        <Typography
          variant='h6'
          component={Link}
          to='/login'
          sx={{ textDecoration: "none" }}
        >
          Please login to use our services
        </Typography>
      </Button>
    </Stack>
  );
};

export default VerifiedPage;
