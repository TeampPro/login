import { ChangeEvent, useState } from "react";
import { Car, CarResponse, CarEntity } from "../types";
import { Dialog, DialogActions, DialogTitle, Button, IconButton, Tooltip } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

type FormProps = {
  cardata: CarResponse;
}

function EditCar({ cardata }: FormProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });
  const { mutate } = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: error => {
      console.log(error);
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
    // Modal이 열렸을 때 특정 id 값에 맞는 정보를 불러오면 좋겠다. 그래서 AddCar에서의 handleClickOpen()과 코드라인의 차이가 생김.
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price
    });
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  const handleSave = () => {
    const url = cardata._links.self.href;
    const CarEntity: CarEntity = {car, url};
    mutate(CarEntity);
      setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0
    });
    setOpen(false);
  }
  // AddCar.tsx의 handleChange와 동일
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  }

  return (
    <>
    <Tooltip title="Edit Car">
      <IconButton onClick={handleClickOpen} aria-label="edit" size="small" >
      <EditRoundedIcon fontSize="small"/>
      </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange}/>
        <DialogActions>
          <Button onClick={handleSave}>Save | 저장</Button>
          <Button onClick={handleClickClose}>Cancel | 취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditCar;