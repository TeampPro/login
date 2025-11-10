import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { getItems, deleteItem } from "../api/shoppingapi";
import { ShoppingItem } from "../../types"
import AddItem from "../AddItem";
import EditItem from "../EditItem";

import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';

function ShoppingItemList() {
  const [gridApi, setGridApi] = useState<GridApi || null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const { data : items, isLoading }
  
  return (
    <>
    </>
  )
}

export default ShoppingItemList;