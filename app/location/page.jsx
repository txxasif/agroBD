"use client"

import { useEffect, useState } from "react";

export default function Location() {
    const [divisions, setDivisions] = useState([]);
    const [division, setDivision] = useState("");
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState([]);
    const divisionUrl = "https://bdapis.com/api/v1.1/divisions"
    const districtsUrl = `https://bdapis.com/api/v1.1/division/`

    const fetchTranslation = async () => {
        try {
            const response = await fetch(
                'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&q=Bandarban&sl=en&tl=bn'
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Extract the translated text from the response data
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                const translatedText = data[0][0][0];
                setTranslation(translatedText);
            }
        } catch (error) {
            console.error('Error fetching translation:', error);
        }

        const fetchDivision = async () => {
            const data = await fetch(divisionUrl).then(res => res.json());
            console.log(data.data);
            setDivisions(data.data);
        }
        const fetchDistricts = async (div) => {
            console.log(`${districtsUrl}${div}`);
            const data = await fetch(`${districtsUrl}${div}`).then(res => res.json());
            setDistricts(data.data);
            console.log(data, 'districts');

        }
        const handleChangeDivisions = async (e) => {
            setDivision(e.target.value);
            await fetchDistricts(e.target.value);


        }
        const handleChangeDistricts = (e) => {
            setDistrict(e.target.value);
            console.log(e.target.value);
        }

        useEffect(() => {
            fetchDivision();
        }, [])
        return (
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Select Your Division</span>
                </label>
                <select className="select select-bordered" onChange={handleChangeDivisions}>

                    {
                        divisions?.map((data, idx) => <option key={idx} value={data._id} >{data.division}</option>)
                    }
                </select>
                <label className="label">
                    <span className="label-text">Select Your District</span>
                </label>
                <select className="select select-bordered" onChange={handleChangeDistricts}>

                    {
                        districts?.map((data, idx) => <option key={idx} value={data._id} >{data.district}</option>)
                    }
                </select>


            </div>
        )
    }