"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Location() {
    const [divisions, setDivisions] = useState([]);
    const [division, setDivision] = useState("");
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState("");
    const [upazillas, setUpazillas] = useState([]);
    const [upazilla, setUpzilla] = useState("")
    const districtsUrl = `/api/location/division/`;
    const upazillaUrl = `/api/location/district?district=`;

    const fetchDivision = async () => {
        const data = await axios.get('/api/location/division').then(res => res.data.data);
        console.log(data);
        setDivisions(data);
    }
    const fetchDistricts = async (div) => {
        console.log(`${districtsUrl}${div}`);
        const data = await axios.get(districtsUrl + div).then(res => res.data.data).then((data) => setDistricts(data))
        //setDistricts(prev => data);
        console.log(data, 'districts');

    }
    const fetchUpazilla = async (dis) => {
        const data = await axios.get(upazillaUrl + dis).then(res => res.data.data[0])
        console.log(data.upazilla, 'upa');
        setUpazillas(data.upazilla);


    }
    const handleChangeDivisions = async (e) => {
        setDivision(e.target.value);
        await fetchDistricts(e.target.value);


    }
    const handleChangeDistricts = (e) => {
        setDistrict(e.target.value);
        fetchUpazilla(e.target.value)

        console.log(e.target.value);
    }
    const handleChangeUpazilla = (e) => {
        setUpzilla(e.target.value)
    }

    useEffect(() => {
        fetchDivision();
        console.log(upazillas, '[a');
    }, [])
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Select Your Division</span>
            </label>
            <select className="select select-bordered" onChange={handleChangeDivisions}>

                {
                    divisions?.map((data, idx) => <option key={idx} value={data._id} >{data.divisionNameBangla}</option>)
                }
            </select>
            <label className="label">
                <span className="label-text">Select Your District</span>
            </label>
            <select className="select select-bordered" onChange={handleChangeDistricts}>

                {
                    districts?.map((data, idx) => <option key={idx} value={data._id} >{data.districtNameBangla}</option>)
                }
            </select>
            <label className="label">
                <span className="label-text">Select Your Upazilla</span>
            </label>
            <select className="select select-bordered" onChange={handleChangeUpazilla}>

                {
                    upazillas?.map((data, idx) => <option key={idx} value={data.upazillaName} >{data.upazillaNameBangla}</option>)
                }
            </select>
            <div>
                You Selected {`${upazilla} , ${district} , ${division}`}
            </div>

        </div>
    )
}
