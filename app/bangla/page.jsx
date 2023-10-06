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
                    `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&q=${text}&sl=en&tl=bn`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Extract the translated text from the response data
                if (data && data[0] && data[0][0] && data[0][0][0]) {
                    const translatedText = data[0][0][0];
                    setTranslation(translatedText);
                    console.log(translatedText);
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
