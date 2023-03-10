import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as Yup from "yup";
const theme = createTheme();
const Registration = () => {
    const navigate = useNavigate()
    const regvalidation = Yup.object().shape({
        title: Yup.string()
            .required("select option"),
        firstName: Yup.string()
            .min(2, "To short!")
            .max(10, "To long")
            .required("Enter Your FirstName"),
        lastName: Yup.string()
            .min(2, "To short!")
            .max(10, "To long")
            .required("Enter Your lastName"),
        email: Yup.string()
            .email("Invaild Email")
            .required("Enter Email id"),
        password: Yup.string()
            // .matches(/"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"/)
            .required("enter password"),
        confirmPassword: Yup.string()
            .oneOf([null, Yup.ref('password')], "password should match")
            .required("retype password"),
        acceptTerms: Yup.boolean()
            .oneOf([true], "You must accept the terms and conditions")
            .required("accpet T&C")


    })
    const formikdata = useFormik({
        initialValues: {
            title: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false
        },
        validationSchema: regvalidation,
        onSubmit: (value) => {
            axios.post("http://localhost:4000/accounts/register", value).then(res => console.log(res.data))
            console.log(value)
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={formikdata.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Title</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        name="title"
                                        label="Title"
                                        onChange={formikdata.handleChange}
                                        error={formikdata.touched.title && formikdata.errors.title}
                                    >

                                        <MenuItem value="Mr">Mr</MenuItem>
                                        <MenuItem value="Mrs">Mrs</MenuItem>
                                        <MenuItem value="Miss">Miss</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={formikdata.handleChange}
                                    error={formikdata.touched.firstName && formikdata.errors.firstName}
                                    helperText={formikdata.touched.firstName && formikdata.errors.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={formikdata.handleChange}
                                    error={formikdata.touched.lastName && formikdata.errors.lastName}
                                    helperText={formikdata.touched.lastName && formikdata.errors.lastName}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={formikdata.handleChange}
                                    error={formikdata.touched.email && formikdata.errors.email}
                                    helperText={formikdata.touched.email && formikdata.errors.email}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={formikdata.handleChange}
                                    error={formikdata.touched.password && formikdata.errors.password}
                                    helperText={formikdata.touched.password && formikdata.errors.password}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    onChange={formikdata.handleChange}
                                    error={formikdata.touched.confirmPassword && formikdata.errors.confirmPassword}
                                    helperText={formikdata.touched.confirmPassword && formikdata.errors.confirmPassword}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    onChange={formikdata.handleChange}
                                    error={formikdata.touched.acceptTerms && formikdata.errors.acceptTerms}
                                    helperText={formikdata.touched.acceptTerms && formikdata.errors.acceptTerms}
                                    control={<Checkbox name='acceptTerms' color="primary" />}
                                    label="Agree the term and condition."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate("/")} variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>)
}

export default Registration