import React from 'react';
import { Route, Routes } from 'react-router-dom'
// import { routes } from '../routes';
import CreateOrderComponent from './CreateOrderComponent';
import MainComponent from './MainComponent';
import OrderComponent from './OrderComponent';
import SelectOrderComponent from './SelectOrderComponent';
import ManageComponent from './ManageComponent';


const AppRouter = () => {
    return (
        <Routes>
           {/* {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
        ))} */}
            <Route path="/" element={<MainComponent />} />
            <Route path="/orders" element={<CreateOrderComponent />} />
            <Route path="/manage" element={<ManageComponent />} />
            <Route path="/orderinfo" element={<OrderComponent />} />
            <Route path="/orderinfo/:id" element={<SelectOrderComponent />} />
        </Routes>
    );
};

export default AppRouter