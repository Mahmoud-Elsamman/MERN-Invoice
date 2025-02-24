import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import GoogleLogin from "../../components/GoogleLogin";
import StyledDivider from "../../components/StyledDivider";
import AuthWrapper from "../forms/AuthWrapper";
import RegisterForm from "../forms/RegisterForm";

const RegisterPage = () => (
  <AuthWrapper>
    <Container
      component='main'
      maxWidth='sm'
      sx={{
        border: "2px solid #e4e5e7",
        borderRadius: "25px",
        mt: "3rem",
        mb: "7rem",
      }}
    >
      <Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaUserPlus className='auth-svg' />
            <Typography variant='h1'>Sign Up</Typography>
          </Box>
          <StyledDivider />
        </Grid>

        {/* registeration form */}
        <RegisterForm />

        {/* already have an account link */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "25px",
            "&:hover": { bgcolor: "#CCFF996b" },
            mt: 2,
            mb: 2,
          }}
        >
          <Button startIcon={<LockOpenIcon />} endIcon={<LockOpenIcon />}>
            <Typography
              component={Link}
              to='/login'
              variant='h6'
              sx={{ textDecoration: "none" }}
              color='primary'
            >
              Already have an account?
            </Typography>
          </Button>
        </Box>

        {/* or sign up with google */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />
            <Button
              variant='outlined'
              sx={{
                cursor: "unset",
                m: 1,
                px: 7,
                py: 0.5,
                borderColor: "grey !important",
                color: "gray !important",
                fontWeight: 500,
                borderRadius: "25px",
              }}
              disableRipple
              disabled
            >
              OR SIGN UP WITH GOOGLE
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GoogleLogin />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </AuthWrapper>
);

export default RegisterPage;
