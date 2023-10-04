"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useQuery } from "react-query";
import Image from "next/image";
export default function Page({ params }) {
    const productId = params.productId;
    const productUrl = `/api/product/${productId}`;
    const getUserDetails = async () => {
        const productData = await axios.get(productUrl).then(res => res.data.data);
        console.log(productData, "pr");
        const userData = await axios.get(`/api/product/getuserdetails/${productData.seller}`).then(res => res.data.user);
        const date = new Date(productData.updatedAt);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const finalDate = `${day}-${month}-${year}`;

        productData["updatedAt"] = finalDate;

        return { productData, userData };

    }
    const { data, isLoading } = useQuery({
        queryFn: getUserDetails
    });
    console.log(data, "");
    if (isLoading) {
        return <div>Loading</div>
    }
    return (
        <Card className="w-[650px] border-[0px] bg-none">
            <CardHeader>
                <Image src={data.userData?.photo} width={150} height={150} className="object-cover" />
                <Label>{data.userData.name}</Label>
                <Label>{data.productData.updatedAt}</Label>
            </CardHeader>
            <CardContent>
                <Image src={data.productData.photo} width={500} height={500} />
            </CardContent>

        </Card>
    )
}


const initialState = {
    address: "",
    quantity: 0,
}
export function Page1({ params }) {
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

