import { ChangeEvent } from "react";
import { Car } from "../types";
import { DialogContent, Stack, TextField } from "@mui/material";

type DialogFormProps = {
  car: Car;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField label="Brand" name="brand" value={car.brand} onChange={handleChange} /><br />
        <TextField label="Model" name="model" value={car.model} onChange={handleChange} /><br />
        <TextField label="Color" name="color" value={car.color} onChange={handleChange} /><br />
        <TextField label="registrationNumber"  name="registrationNumber"  value={car.registrationNumber} onChange={handleChange} /><br />
        <TextField label="Year" name="modelYear"  value={car.modelYear} onChange={handleChange} /><br />
        <TextField label="Price" name="price"  value={car.price} onChange={handleChange} /><br />
      </Stack>
    </DialogContent>
  )
}

export default CarDialogContent;