import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { GetCarById, DeleteCar } from "../api";
import type { Car } from "../types";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    GetCarById(id)
      .then((res) => {
        if (!res) {
          setNotFound(true);
        } else {
          setCar(res);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await DeleteCar(id);
    navigate("/cars");
  };

  if (!id) return <Navigate to="/not-found" />;

  if (notFound) return <Navigate to="/not-found" />;

  if (loading) return <p>Loading car details...</p>;

  if (!car) return null;

  return (
    <div>
      <h2>
        {car.brand} {car.model}
      </h2>
      <p>Doors: {car.doorsNumber}</p>
      <p>Luggage capacity: {car.luggageCapacity} L</p>
      <p>Engine capacity: {car.engineCapacity} cm³</p>
      <p>Fuel type: {car.fuelType}</p>
      <p>Body type: {car.bodyType}</p>
      <p>
        Production date:{" "}
        {new Date(car.productionDate).toLocaleDateString()}
      </p>
      <p>Fuel consumption: {car.carFuelConsumption} l/100km</p>

      <div style={{ marginTop: "1rem" }}>
        <Link to={`/edit/${car.id}`}>Edit</Link>{" "}
        | <button onClick={handleDelete}>Delete</button>{" "}
        | <Link to="/cars">Back to list</Link>
      </div>
    </div>
  );
};

export default CarDetails;
