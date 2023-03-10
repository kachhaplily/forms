import React from 'react'
import { useFormik, validateYupSchema } from 'formik'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LoginOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';


const theme = createTheme();
const Login = () => {
    const navigate = useNavigate()
    const imageValidationSchema = Yup.object().shape({
        image: Yup.mixed()
            .required('Please select an image')
            .test('fileSize', 'Image size too large', (value) => {
                return value && value.size <= 2000000; // 2 MB
            })
            .test('fileType', 'Invalid file type', (value) => {
                return value && ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }),
    });

    const formikdata = useFormik({
        initialValues: {
            email: '',
            password: "",
        },
        validateYupSchema: imageValidationSchema,
        onSubmit: values => {
               axios.post("http://localhost:4000/accounts/authenticate",values).then

               (res=>{
                 localStorage.setItem("token", res.data.jwtToken)
                 navigate('/dash');

            }
               )
            const formData = new FormData();
            formData.append('image', values.image);
            console.log(formData)
        },
    })
    return (
        <>
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
                            <LoginOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={formikdata.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name='email'
                                        onChange={formikdata.handleChange}
                                        autoComplete="email"
                                        helperText={formikdata.touched.email && formikdata.errors.email}
                                        onError={formikdata.touched.email && formikdata.errors.email}

                                    />
                                </Grid> 
                                 <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={formikdata.handleChange}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link onClick={() => navigate("Registration")}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Login