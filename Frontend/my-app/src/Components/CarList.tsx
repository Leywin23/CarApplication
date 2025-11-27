import { useEffect, useState } from "react";
import { GetAllCars } from "../api";
import { Car } from "../types";

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    GetAllCars().then(setCars);
  }, []);

  return (
    <div>
      {cars.map((car) => (
        <p key={car.id}>{car.brand} {car.model}</p>
      ))}
    </div>
  );
};

export default CarList;