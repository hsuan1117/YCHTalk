import * as React from 'react';
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
import {Navigate, useLocation} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback} from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                The YCHTalk
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const location = useLocation()
    const currentLocationState = location.state || {
        from: { pathname: '/' },
    }
    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])

    if (keycloak?.authenticated) {
        return <Navigate to={currentLocationState?.from}/>
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Card sx={{ minWidth: 275, mt: 8 }} >

                    <CardContent>
                        <Box
                            sx={{
                                mt:1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in With&nbsp;<b>HsuanSSO</b>
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <Button
                                    type="button"
                                    onClick={login}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container spacing={2}
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item  xs={12} textAlign={'center'}>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item  xs={12}  textAlign={'center'}>
                                        <Link href="#" variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

            </Container>
        </ThemeProvider>
    );
}
