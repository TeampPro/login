// import { CarResponse } from "../types"   // table 태그에선 data.map() 때문에 필요하지만 x-data-grid에선 불필요
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, IconButton } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


function Carlist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      // 자동차 삭제 이후 실행되는 로직
      queryClient.invalidateQueries({ queryKey: ['cars']}); // 이부분은 useQuery()를 정의한 부분과 관련있다.
      console.log("자동차 삭제 성공");
    },
    onError: error => {
      console.log(error);
    },
  });
  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'registrationNumber', headerName: 'Registration Number', width: 200 },
    { field: 'modelYear', headerName: 'Model Year', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditCar cardata={params.row}/>
      )
    },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton aria-label="delete" size="small"
        onClick={() => {
          if (window.confirm(`${params.row.brand}의 ${params.row.model} 자동차를 삭제하시겠습니까?`)) {
          mutate(params.row._links.self.href)}}
          
        }
          >
          <DeleteForeverRoundedIcon fontSize="small"/>
        </IconButton>
      )
    }
  ]

  if (!isSuccess) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>자동차들을 불러오는데 실패했습니다.</span>
  }
  else {
    return (
      // <table>
      //   <tbody>
      //     {
      //       data.map((car: CarResponse) =>
      //         <tr key={car._links.self.href}>
      //           <td>{car.brand}</td>
      //           <td>{car.model}</td>
      //           <td>{car.color}</td>
      //           <td>{car.registrationNumber}</td>
      //           <td>{car.modelYear}</td>
      //           <td>{car.price}</td>
      //         </tr>
      //       )
      //     }
      //   </tbody>
      // </table>
      <>
      <AddCar />
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._links.self.href}
        slots= {{ toolbar: GridToolbar }}
        />
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message='선택한 자동차 정보가 삭제되었습니다.'
      />
      </>
    )
  }
}

export default Carlist