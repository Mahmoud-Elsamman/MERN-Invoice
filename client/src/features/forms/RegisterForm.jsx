import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Route, Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  strengthColor,
  strengthIndicator,
} from "../../utils/password-strength";
import { useRegisterUserMutation } from "../auth/authApiSlice";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import AuthButtonAnimation from "../../animations/authButtonAnimations";
import Spinner from "../../components/Spinner";
import useTitle from "../../hooks/useTitle";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const RegisterForm = () => {
  useTitle("Sign Up - MERN Invoice");

  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowHidePassword = () => setShowPassword((show) => !show);
  const handleShowHideConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const strength = strengthIndicator(value);
    setLevel(strengthColor(strength));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  const [registerUser, { data, isLoading, isSuccess }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      const message = data?.message;
      toast.success(message);
    }
  }, [data, isSuccess, navigate]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          passwordConfirm: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(255).required("First name is required"),
          lastName: Yup.string().max(255).required("Last name is required"),
          username: Yup.string()
            .matches(
              USERNAME_REGEX,
              "Should be between 4 and 24 characters. Letters, numbers, underscores, hyphens allowed. Special characters not allowed!"
            )
            .required("A username is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Please confirm your password"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            await registerUser(values).unwrap();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (error) {
            const message = error.data.message;
            toast.error(message);
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate autoComplete='false' onSubmit={handleSubmit}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Grid container spacing={3}>
                {/* First Name */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor='firstName-signup'>
                      First Name
                    </InputLabel>
                    <OutlinedInput
                      id='firstName-signup'
                      name='firstName'
                      type='firstName'
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='John'
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error id='helper-text-firstName-signup'>
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* Last Name */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor='lastName-signup'>Last Name</InputLabel>
                    <OutlinedInput
                      id='lastName-signup'
                      name='lastName'
                      type='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Doe'
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error id='helper-text-lastName-signup'>
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* Username */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor='username-signup'>Username</InputLabel>
                    <OutlinedInput
                      id='username-signup'
                      name='username'
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='john-doe, john88'
                      inputProps={{}}
                      fullWidth
                      error={Boolean(touched.username && errors.username)}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id='helper-text-username-signup'>
                        {errors.username}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* Email */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor='email-signup'>
                      Email Address*
                    </InputLabel>
                    <OutlinedInput
                      id='email-signup'
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='email@example.com'
                      inputProps={{}}
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id='helper-text-email-signup'>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* Password */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor='password-signup'>Password</InputLabel>
                    <OutlinedInput
                      id='password-signup'
                      name='password'
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleShowHidePassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                            size='large'
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder='********'
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id='helper-text-password-signup'>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                  {/* password strength indicator */}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 350,
                            height: 8,
                            borderRadius: "7px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle1' fontSize='0.75rem'>
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                {/* Password Confirm */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor='passwordConfirm-signup'>
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id='passwordConfirm-signup'
                      name='passwordConfirm'
                      value={values.passwordConfirm}
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                      error={Boolean(
                        touched.passwordConfirm && errors.passwordConfirm
                      )}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle passwordConfirm visibility'
                            onClick={handleShowHideConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                            size='large'
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder='********'
                      inputProps={{}}
                    />
                    {touched.passwordConfirm && errors.passwordConfirm && (
                      <FormHelperText
                        error
                        id='helper-text-passwordConfirm-signup'
                      >
                        {errors.passwordConfirm}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* Terms of service */}
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    By signing up, you agree to our &nbsp;
                    <Link variant='subtitle2' component={RouterLink} to='#'>
                      Terms of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link variant='subtitle2' component={RouterLink} to='#'>
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>
                {/* Display any submission errors */}
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                {/* Create account button */}
                <Grid item xs={12}>
                  <AuthButtonAnimation>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                      color='secondary'
                    >
                      Create Account
                    </Button>
                  </AuthButtonAnimation>
                </Grid>
              </Grid>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
