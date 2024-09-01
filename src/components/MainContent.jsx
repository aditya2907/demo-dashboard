import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import DataTable from './DataTable';

function MainContent(tableData ) {
	return (
		<Container>
			<Paper elevation={1} style={{ padding: 16, marginTop: 100 }}>
				<Typography variant="h4" gutterBottom>
					{tableData.title}
				</Typography>
				<DataTable columnDefs={tableData.columnDefs} rowData={tableData.rowData} />
			</Paper>
		</Container>
	);
};

export default MainContent;
