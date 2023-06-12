import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import data from "./data.json"
import {styled, tableCellClasses} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    {id: 'date', label: '\u6210\u4ea4\u65e5\u671f', minWidth: 50},
    {id: 'name', label: '\u6a13\u76e4\u540d\u7a31', minWidth: 50},
    {
        id: 'seats',
        label: '\u5ea7\u6578',
        minWidth: 50,
        // align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'floors',
        label: '\u5c64\u6578',
        minWidth: 50,
        // align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'unit',
        label: '\u55ae\u4f4d',
        minWidth: 50,
        // align: 'right',
        // format: (value) => value.toFixed(2),
    },
    {id: 'price', label: '\u6210\u4ea4\u50f9', minWidth: 50},
    {id: 'area', label: '\u5be6\u7528\u9762\u7a4d', minWidth: 75},
    {id: 'pricepersqfeet', label: '\u5be6\u7528\u544e\u50f9', minWidth: 50},
];

const rows = data

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    console.log(data)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '95%', overflow: 'hidden', margin: "auto auto"}}>
            <TableContainer sx={{maxHeight: 590}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}