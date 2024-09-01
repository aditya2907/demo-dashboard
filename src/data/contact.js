const contactTableData = {
    title: 'Contact Table',
    columnDefs: [
        { headerName: 'id', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Phone', field: 'phone' }
    ],
    rowData: [
        { id:1, name: 'Alice', email: 'alice@example.com', phone: '123-456-7890' },
        { id:1, name: 'Bob', email: 'bob@example.com', phone: '987-654-3210' },
    ]
};
export default contactTableData;