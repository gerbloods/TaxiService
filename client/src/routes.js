import MainComponent from "./components/MainComponent";
import CreateOrderComponent from "./components/CreateOrderComponent";
const { MAIN_ROUTE, ORDER_ROUTE } = require("./const");


export const routes = [
    {
        path: MAIN_ROUTE,
        Component: MainComponent
    },
    {
        path: ORDER_ROUTE,
        Component: CreateOrderComponent
    }
]