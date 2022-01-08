import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import {useNavigate} from "react-router";
import {useKeycloak} from "@react-keycloak/web";

export default function Nav(){
    const { keycloak } = useKeycloak()
    const navigate = useNavigate();
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} component={RouterLink} to={'/'}>
                    YCHTalk
                </Typography>

                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Features
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Enterprise
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </Link>
                </nav>
                <Button  component={RouterLink} to='/chat' variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                    Chat
                </Button>
                {
                    keycloak?.authenticated ? (
                        <Button  component={RouterLink} to='/login' variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>) : (
                        <Button  variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={keycloak.logout}>
                            Logout
                        </Button>
                    )
                }

            </Toolbar>
        </AppBar>
    )
}
