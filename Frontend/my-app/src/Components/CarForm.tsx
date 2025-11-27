import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCar, GetCarById, UpdateCar } from "../api";
import {
  BodyType,
  Car,
  CreateCarDto,
  FuelType,
  UpdateCarDto,
} from "../types";

type CarFormState = CreateCarDto & { id?: string };

const getEnumKeys = <T extends object>(e: T): (keyof T)[] =>
  Object.keys(e).filter((k) => isNaN(Number(k))) as (keyof T)[];

const CarForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<CarFormState>({
    brand: "",
    model: "",
    doorsNumber: 4,
    luggageCapacity: 300,
    engineCapacity: 1600,
    fuelType: FuelType.Petrol,
    productionDate: new Date().toISOString().substring(0, 10),
    carFuelConsumption: 6,
    bodyType: BodyType.Sedan,
  });

  useEffect(() => {
    if (id) {
      GetCarById(id).then((car) => {
        if (car) {
          setForm({
            id: car.id,
            brand: car.brand,
            model: car.model,
            doorsNumber: car.doorsNumber,
            luggageCapacity: car.luggageCapacity,
            engineCapacity: car.engineCapacity,
            fuelType: car.fuelType,
            productionDate: car.productionDate.substring(0, 10),
            carFuelConsumption: car.carFuelConsumption,
            bodyType: car.bodyType,
          });
        }
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      [
        "doorsNumber",
        "luggageCapacity",
        "engineCapacity",
        "carFuelConsumption",
      ].includes(name)
    ) {
      setForm((prev) => ({
        ...prev,
        [name]: name === "carFuelConsumption" ? parseFloat(value) : Number(value),
      }));
    } else if (name === "fuelType" || name === "bodyType") {
      setForm((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      const dto: UpdateCarDto = {
        car: {
          id,
          brand: form.brand,
          model: form.model,
          doorsNumber: form.doorsNumber,
          luggageCapacity: form.luggageCapacity,
          engineCapacity: form.engineCapacity,
          fuelType: form.fuelType,
          productionDate: new Date(form.productionDate).toISOString(),
          carFuelConsumption: form.carFuelConsumption,
          bodyType: form.bodyType,
        },
      };

      await UpdateCar(dto);
    } else {
      await CreateCar({
        ...form,
        productionDate: new Date(form.productionDate).toISOString(),
      });
    }

    navigate("/cars");
  };

  const fuelKeys = getEnumKeys(FuelType);
  const bodyKeys = getEnumKeys(BodyType);

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? "Edit Car" : "Create Car"}</h1>

      <div>
        <label>
          Brand:
          <input name="brand" value={form.brand} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <label>
          Model:
          <input name="model" value={form.model} onChange={handleChange} required />
        </label>
      </div>

      <div>
        <label>
          Doors:
          <input
            type="number"
            name="doorsNumber"
            value={form.doorsNumber}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Luggage capacity (L):
          <input
            type="number"
            name="luggageCapacity"
            value={form.luggageCapacity}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Engine capacity (cm³):
          <input
            type="number"
            name="engineCapacity"
            value={form.engineCapacity}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Fuel type:
          <select name="fuelType" value={form.fuelType} onChange={handleChange}>
            {fuelKeys.map((key) => (
              <option key={key} value={FuelType[key]}>
                {key}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Body type:
          <select name="bodyType" value={form.bodyType} onChange={handleChange}>
            {bodyKeys.map((key) => (
              <option key={key} value={BodyType[key]}>
                {key}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Production date:
          <input
            type="date"
            name="productionDate"
            value={form.productionDate}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Fuel consumption (l/100km):
          <input
            type="number"
            step="0.1"
            name="carFuelConsumption"
            value={form.carFuelConsumption}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default CarForm;