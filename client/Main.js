import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router";
import App from './src/App';
import Home from './src/components/Home';
import Login from "./src/components/Login";
import Signup from "./src/components/Signup";
import Select from "./src/components/Select";
import Room from "./src/components/Room";
import { Provider } from "react-redux";
import appStore from "./utils/store";
import 'dotenv/config';


const AppRouter = createBrowserRouter([{
    path:"/",
    element:<Home/>
},{
    path:"/login",
    element:<Login/>
},{
    path:"/signup",
    element:<Signup/>

},{
    path:"/select",
    element:<Select/>
},{
    path:"/room/:id",
    element:<Room/>
}])

const root  = createRoot(document.getElementById("root"));
root.render(<Provider store={appStore}><RouterProvider router={AppRouter}/></Provider>);