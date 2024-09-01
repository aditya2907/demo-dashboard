const homeTableData = {
    title: 'Home Table',
    columnDefs: [
        { headerName: 'id', field: 'id' },
        { headerName: 'Item', field: 'item' },
        { headerName: 'Quantity', field: 'quantity' },
        { headerName: 'Price', field: 'price' }
    ],
    rowData: [
        { id:1, item: 'Apples', quantity: 10, price: 2.5 },
        { id:2, item: 'Oranges', quantity: 5, price: 3.0 },
    ]
};
export default homeTableData;