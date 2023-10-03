"use client"
import { currentUserIdSelector } from "@/store/reducers/user.selector";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const SuccessToaster = () => {
    return (
        <div className="toast toast-end">
            <div className="alert alert-success">
                <span>Order Placed Successfully.</span>
            </div>
        </div>
    )
}

const initialState = {
    address: "",
    quantity: 0,
}
export default function Page({ params }) {
    const { data: session } = useSession();
    const [data, setProduct] = useState(null);
    const [cartData, setCartData] = useState(initialState);
    const [isDone, setDone] = useState(false);
    const fetcher = async (url) => await axios.get(url).then((response) => {
        console.log(response.data.data);
        setProduct(response.data.data);
    });
    const userId = session.user._id;
    const productId = params.productId;
    const url = `/api/product/${productId}`;
    const handleRender = () => {
        setTimeout(() => {
            setDone(false)
        }, 2000);
    }
    const addToCart = async () => {
        const body = {
            seller: data.seller,
            buyer: userId,
            quantity: cartData.quantity,
            deliveryAddress: cartData.address,
            productId: productId,
        }
        console.log(body);
        try {
            // const response = await axios.post('/api/order/placeorder', body);
            setDone(true);
            handleRender();

            // console.log(response, 'hi form server');

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
                <input type="text" name="address" value={cartData.address} onChange={handleChange} />
                <label>Enter quantity:</label>
                <input type="number" name="quantity" value={cartData.quantity} onChange={handleChange} />
                <button onClick={addToCart}>Place Order</button>
                {
                    isDone ? <SuccessToaster /> : null
                }

            </div>
        </div>
    )
}