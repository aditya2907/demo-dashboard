import React from "react";
import { Box, Container, Link, Paper, Typography } from "@mui/material";


function AppFooter() {
    return (
        <Paper
            sx={{
                marginTop: 'calc(10% + 60px)',
                width: '100%',
                position: 'fixed',
                bottom: 0,
                textAlign: 'center',
                height: '5%',
            }}
            component="footer"
            square variant="outlined"
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} My Dashboard. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <Link href="#" color="inherit">Privacy Policy</Link> |{' '}
                        <Link href="#" color="inherit">Terms of Service</Link>
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};

export default AppFooter;