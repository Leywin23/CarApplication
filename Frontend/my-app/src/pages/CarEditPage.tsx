import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { carsApi } from "../api/carApi";
import { getErrorMessage } from "../api/error";
import type { Car } from "../models/car";
import { BodyType, FuelType } from "../models/car";

export default function CarEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const c = await carsApi.details(id);
        const fixed: Car = {
          ...c,
          fuelType: Number((c as any).fuelType) as FuelType,
          bodyType: Number((c as any).bodyType) as BodyType,
        };
        setCar(fixed);
      } catch (e: any) {
        setError(getErrorMessage(e));
      }
    })();
  }, [id]);

  if (!car) {
    return (
      <div className="container">
        <div className="card">{error ?? "Ładowanie..."}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="card-header">
          <h1 className="h1">Edytuj auto</h1>
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
                  await carsApi.update(car);
                  nav("/");
                } catch (e: any) {
                  setError(getErrorMessage(e));
                }
              }}
            >
              Zapisz zmiany
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
