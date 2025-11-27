import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "./App";
import CarList from "./Components/CarList";
import CarDetails from "./Components/CarDetails";
import CarForm from "./Components/CarForm";
import NotFound from "./Components/NotFound";

export const routes : RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: 'cars', element: <CarList/>},
            {path: 'cars/:id', element: <CarDetails/>},
            {path: 'edit/:id', element: <CarForm/>},
            {path: 'not-found', element: <NotFound/>},
            {path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
]

export const router = createBrowserRouter(routes);
