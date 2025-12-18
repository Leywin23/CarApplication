import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { carsApi } from "../api/carApi";
import type { Car } from "../models/car";
import { BodyType, FuelType } from "../models/car";
import { getErrorMessage } from "../api/error";

function fuelLabel(v: FuelType) {
  switch (v) {
    case FuelType.Petrol: return "Petrol";
    case FuelType.Hybrid: return "Hybrid";
    case FuelType.Diesel: return "Diesel";
    case FuelType.LPG: return "LPG";
    default: return String(v);
  }
}

function bodyLabel(v: BodyType) {
  switch (v) {
    case BodyType.Hatchback: return "Hatchback";
    case BodyType.Sedan: return "Sedan";
    case BodyType.Kombi: return "Kombi";
    case BodyType.SUV: return "SUV";
    case BodyType.Roadster: return "Roadster";
    default: return String(v);
  }
}

function formatDate(iso: string) {
  // z "2021-05-15T00:00:00" -> "2021-05-15"
  return iso?.slice(0, 10) ?? "";
}

export default function CarsListPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadCars = async () => {
    try {
      const data = await carsApi.list();
      setCars(data);
      setError(null);
    } catch (e: any) {
      setError(getErrorMessage(e));
    }
  };

  useEffect(() => { loadCars(); }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="h1">Auta</h1>
            <div className="muted small">Pełna lista danych + CRUD</div>
          </div>
          <button className="btn" onClick={loadCars}>Odśwież</button>
        </div>

        {error && <div className="alert" style={{ marginBottom: 12 }}>{error}</div>}

        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Doors</th>
                <th>Luggage</th>
                <th>Engine</th>
                <th>Fuel</th>
                <th>Production</th>
                <th>Consumption</th>
                <th>Body</th>
                <th style={{ textAlign: "right" }}>Akcje</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td className="muted small" style={{ whiteSpace: "nowrap" }}>{car.id}</td>
                  <td>{car.brand}</td>
                  <td className="muted">{car.model}</td>
                  <td>{car.doorsNumber}</td>
                  <td>{car.luggageCapacity}</td>
                  <td>{car.engineCapacity}</td>
                  <td>{fuelLabel(car.fuelType)}</td>
                  <td>{formatDate(car.productionDate)}</td>
                  <td>{car.carFuelConsumption}</td>
                  <td>{bodyLabel(car.bodyType)}</td>
                  <td>
                    <div className="row-actions">
                      <Link className="btn" to={`/cars/${car.id}/edit`}>Edytuj</Link>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          if (!window.confirm("Na pewno usunąć auto?")) return;
                          try {
                            await carsApi.delete(car.id);
                            await loadCars();
                          } catch (e: any) {
                            setError(getErrorMessage(e));
                          }
                        }}
                      >
                        Usuń
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {cars.length === 0 && (
                <tr>
                  <td colSpan={11} className="muted">
                    Brak aut w bazie
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
}
