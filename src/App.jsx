import React, {useEffect, useState} from "react";
import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./Root";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart')) ?? [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(id, sku) {
        setCart((items) => {
            const itemInCart = items.find(i => i.sku === sku);
            if (itemInCart) {
                return items.map(i => i.sku === sku ? {...i, quantity: i.quantity++} : i);
            } else {
                return [...items, {id, sku, quantity: 1}];
            }
        });
    }

    function updateQuantity(sku, quantity) {
        setCart((items) => {
            if (quantity === 0) {
                return items.filter(i => i.sku !== sku);
            } else {
                return items.map(i => i.sku === sku ? {...i, quantity: quantity} : i);
            }
        });
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            children: [
                {
                    path: "/",
                    element: <h1>Welcome to Aurel fitness</h1>,
                },
                {
                    path: "/:category",
                    element: <Products/>,
                },
                {
                    path: "/:category/:id",
                    element: <Detail addToCart={addToCart}/>,
                },
                {
                    path: "cart",
                    element: <Cart cart={cart} updateQuantity={updateQuantity}/>,
                },
            ]
        },
    ]);

    return (
        <RouterProvider router={router}/>
    );
}
