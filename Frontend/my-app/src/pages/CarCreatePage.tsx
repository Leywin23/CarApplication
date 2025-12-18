import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { carsApi } from "../api/carApi";
import { getErrorMessage } from "../api/error";
import type { Car } from "../models/car";
import { BodyType, FuelType } from "../models/car";

function newCar(): Car {
  return {
    id: crypto.randomUUID(),
    brand: "Volkswagen",
    model: "Golf",
    doorsNumber: 5,
    luggageCapacity: 380,
    engineCapacity: 1498,
    fuelType: FuelType.Petrol,
    productionDate: "2021-05-15T00:00:00.000Z",
    carFuelConsumption: 6.2,
    bodyType: BodyType.Hatchback,
  };
}

export default function CarCreatePage() {
  const nav = useNavigate();
  const [car, setCar] = useState<Car>(newCar());
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="card-header">
          <h1 className="h1">Dodaj auto</h1>
        </div>

        {error && <div className="alert" style={{ marginBottom: 12 }}>{error}</div>}

        <div className="form">
          <div className="grid-2">
            <div className="field">
              <label>Brand</label>
              <input value={car.brand} onChange={(e) => setCar({ ...car, brand: e.target.value })} />
            </div>
            <div className="field">
              <label>Model</label>
              <input value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} />
            </div>
          </div>

          <div className="grid-2">
            <div className="field">
              <label>DoorsNumber</label>
              <input type="number" value={car.doorsNumber} onChange={(e) => setCar({ ...car, doorsNumber: Number(e.target.value) })} />
            </div>
            <div className="field">
              <label>LuggageCapacity</label>
              <input type="number" value={car.luggageCapacity} onChange={(e) => setCar({ ...car, luggageCapacity: Number(e.target.value) })} />
            </div>
          </div>

          <div className="grid-2">
            <div className="field">
              <label>EngineCapacity</label>
              <input type="number" value={car.engineCapacity} onChange={(e) => setCar({ ...car, engineCapacity: Number(e.target.value) })} />
            </div>
            <div className="field">
              <label>CarFuelConsumption</label>
              <input type="number" step="0.1" value={car.carFuelConsumption} onChange={(e) => setCar({ ...car, carFuelConsumption: Number(e.target.value) })} />
            </div>
          </div>

          <div className="grid-2">
            <div className="field">
              <label>FuelType</label>
              <select value={car.fuelType} onChange={(e) => setCar({ ...car, fuelType: Number(e.target.value) as FuelType })}>
                <option value={0}>Petrol</option>
                <option value={1}>Hybrid</option>
                <option value={2}>Diesel</option>
                <option value={3}>LPG</option>
              </select>
            </div>
            <div className="field">
              <label>BodyType</label>
              <select value={car.bodyType} onChange={(e) => setCar({ ...car, bodyType: Number(e.target.value) as BodyType })}>
                <option value={0}>Hatchback</option>
                <option value={1}>Sedan</option>
                <option value={2}>Kombi</option>
                <option value={3}>SUV</option>
                <option value={4}>Roadster</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>ProductionDate</label>
            <input
              type="date"
              value={car.productionDate.slice(0, 10)}
              onChange={(e) => setCar({ ...car, productionDate: new Date(e.target.value).toISOString() })}
            />
          </div>

          <div className="actions">
            <button className="btn" onClick={() => nav("/")}>Anuluj</button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                setError(null);
                try {
                  await carsApi.create(car);
                  nav("/");
                } catch (e: any) {
                  setError(getErrorMessage(e));
                }
              }}
            >
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
