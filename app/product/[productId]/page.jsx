"use client"
import { currentUserIdSelector } from "@/store/reducers/user.selector";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initialValue = {
    quantity: 0,
    address: ''
}

export default function Page({ params }) {
    const [data, setProduct] = useState(null);
    const [cartData, setCartData] = useState(initialValue);
    const [isDone, setDone] = useState(true)
    const fetcher = async (url) => await axios.get(url).then((response) => {
        console.log(response.data.data);
        setProduct(response.data.data)
    });
    const userId = useSelector(currentUserIdSelector);
    const productId = params.productId;
    const url = `/api/product/${productId}`;
    const addToCart = async () => {
        const body = {
            uid: userId,
            quantity: cartData.quantity,
            address: cartData.address,
            productId: productId,
        }
        console.log(body);
        try {
            const response = await axios.post('/api/cart/add', body);
            setDone(true);
            console.log(response, 'hi form server');

        } catch (err) {
            setDone(false);
            console.log(err);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCartData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        fetcher(url)
    }, [])
    if (!data) {
        return (<h1>loading..</h1>)
    }

    return (
        <div >
            <div>
                <h1>
                    Available quantity: {data.quantity}
                </h1>
                <label>Enter Delivery Address:</label>
                <input type="text" name="address" value={data.address} onChange={handleChange} />
                <label>Enter quantity:</label>
                <input type="number" name="quantity" value={data.quantity} onChange={handleChange} />
                <button onClick={addToCart}>Place Order</button>
                {isDone !== null ? isDone ? <h1>Done!</h1> : <h1>something went wrong</h1> : null}
            </div>
        </div>
    )
}