import { AccountCircle, Brightness4, Brightness7, Mail, Menu, More, Notifications } from "@mui/icons-material";
import { Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

export default function AppBarComponent({ openDrawer, dark, setDrawerOpen, setThemeDark }) {

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={openDrawer}>
            <Toolbar >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerOpen(true)}
                    edge="start"
                    sx={[
                        {
                            marginRight: 5,
                        },
                        openDrawer && { display: 'none' },
                    ]}
                >
                    <Menu />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    AIRLINE
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        onClick={() => setThemeDark(!dark)}
                        color="inherit"
                        size="large"
                    >
                        {dark ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <Mail />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        // aria-controls={menuId}
                        aria-haspopup="true"
                        // onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        // aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        // onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <More />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        </Box>
    )
}