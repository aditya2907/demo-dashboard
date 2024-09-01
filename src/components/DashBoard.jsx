import React, { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Brightness7, Brightness4, AccountCircle, Mail, Notifications } from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppFooter from './AppFooter';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from './MainContent';
import homeTableData from '../data/home'
import aboutTableData from '../data/about'
import contactTableData from '../data/contact'
import DrawerComponent from './DrawerComponent';
import AppBarComponent from './AppBarComponent';

const drawerWidth = 240;


export default function DashBoard() {
	const [openDrawer, setDrawerOpen] = useState(false);
	const [dark, setThemeDark] = useState(true);

	const darkTheme = useMemo(() => createTheme({
		palette: {
			mode: dark ? 'dark' : 'light'
		}
	}), [dark])

	return (
		<Router>
			<ThemeProvider theme={darkTheme}>
				<Box sx={{ display: 'flex' }}>
					<CssBaseline />
					
					<AppBarComponent position='fixed' {...{openDrawer, dark, setDrawerOpen, setThemeDark}} />

					<DrawerComponent {...{ openDrawer, setDrawerOpen }} />

					{/* <MainContent
						key={homeTableData.id}
						title={homeTableData.title}
						columnDefs={homeTableData.columnDefs}
						rowData={homeTableData.rowData}
					/> */}

					<Box sx={{
						flexGrow: 1,
						width: openDrawer ? drawerWidth : 0,
						transition: 'margin 0.3s'
					}}>
						<Routes>
							<Route path='/home' element={<MainContent
								key={homeTableData.id}
								title={homeTableData.title}
								columnDefs={homeTableData.columnDefs}
								rowData={homeTableData.rowData}
							/>} />
							<Route path='/about' element={<MainContent
								key={aboutTableData.id}
								title={aboutTableData.title}
								columnDefs={aboutTableData.columnDefs}
								rowData={aboutTableData.rowData}
							/>} />
							<Route path='/contact' element={<MainContent
								key={contactTableData.id}
								title={contactTableData.title}
								columnDefs={contactTableData.columnDefs}
								rowData={contactTableData.rowData}
							/>} />

							{/* <Route path="/home" element={<MainContent tableData={homeTableData} />} />
							<Route path="/about" element={<MainContent tableData={aboutTableData} />} />
							<Route path="/contact" element={<MainContent tableData={contactTableData} />} /> */}
						</Routes>
						<AppFooter />
					</Box>

				</Box>
			</ThemeProvider>
		</Router>
	);
}
