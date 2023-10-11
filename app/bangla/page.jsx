"use client"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function TranslateComponent() {
    const [translation, setTranslation] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState();

    useEffect(() => {
        const fetchTranslation = async () => {

            try {
                const response = await fetch(
                    `https://inputtools.google.com/request?text=${text}&itc=bn-t-i0-und&num=4&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`).then(res => res.json());

                if (response[0] === "SUCCESS") {
                    // Access the data from the response
                    const data = response[1][0]; // This gets the first item from the response array
                    console.log(data);
                    const translate = data[1][0];
                    console.log(translate);
                }
            } catch (error) {
                console.error('Error fetching translation:', error);
            }
        };

        fetchTranslation();
    }, [text]);

    return (
        <div className='w-full h-screen mx-auto grid grid-cols-2 '>
            <Textarea
                className="max-w-lg h-52"
                type="text"
                placeholder="Enter Your Product Description"
                name="description"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <div className='max-w-lg h-52 border flex items-center justify-center'>
                <h1 className='text-center'>{translation}</h1>
            </div>
        </div>
    );
}
