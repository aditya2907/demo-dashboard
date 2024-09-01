import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const DataTable = ({ columnDefs, rowData }) => {
	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rowData}
				columns={columnDefs}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>
	);
};

export default DataTable;
