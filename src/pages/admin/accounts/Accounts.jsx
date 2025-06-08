import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Pagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getAccounts } from "../../../redux/apiCalls/accountApiCall";
import SearchBar from "../../../components/searchBar/SearchBar";
import { debounce } from "lodash";
import { accountActions } from "../../../redux/slices/accountSlice";

const Accounts = () => {
    const accounts = useSelector((state) => state?.account?.accounts);
    const isAccountDeleted = useSelector((state) => state?.account?.isAccountDeleted);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch()

    const count = useSelector((state) => state?.account?.count)

    const handlePagenation = (page) => {
        dispatch(getAccounts("", page))
    }

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteAccount(selectedUser._id))
        handleCloseDialog();
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            dispatch(getAccounts(query));
        }, 600),
        [] // ensure it's only created once
    );

    useEffect(() => {

        if (isAccountDeleted) {
            dispatch(accountActions.clearIsAccountDeleted())
        }
        debouncedSearch(searchQuery);
        // Cleanup on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery, isAccountDeleted]);



    return (
        <Container maxWidth={"xl"} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom mb={6}>
                Users Accounts
            </Typography>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={"Search by email or phone number"} />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user accounts table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts?.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => handleDeleteClick(user)}
                                        color="error"
                                        aria-label="delete user"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete the user "{selectedUser?.username}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", mb: 5 }}>
                <Pagination count={count} onChange={(e, value) => handlePagenation(value)} />
            </Box>

        </Container>
    );
}

export default Accounts;