"use client"
import { Input } from '@/components/ui/input';
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
        <div>
            <Input type='email' value={text} onChange={(e) => setText(e.target.value)} placeholder='type' />
            <p>Translated Text: {translation}</p>
            <button className='btn'>click</button>
            {
                status
            }
        </div>
    );
}
