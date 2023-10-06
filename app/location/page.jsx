"use client"
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
const initialState = {
    divisions: [],
    division: "",
    districts: [],
    district: "",
    upazillas: [],
    upazilla: "",
    districtsUrl: `/api/location/division/`,
    upazillaUrl: `/api/location/district?district=`
}
function stateReducer(state, action) {
    switch (action.type) {
        case "divisions":
            return { ...state, divisions: action.payload }
        case "districts":
            return { ...state, districts: action.payload }
        case "upazillas":
            return { ...state, upazillas: action.payload }
        case "division":
            return { ...state, division: action.payload }
        case "district":
            return { ...state, district: action.payload }
        case "upazillas":
            return { ...state, upazillas: action.payload }
        case "upazilla":
            return { ...state, upazilla: action.payload }
        default:
            return state;
    }
}
export default function Page() {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    {/* Url */ }

    {/* Fetching Div,Dis and Up */ }
    const fetchDivisions = async () => {
        const data = await axios.get('/api/location/division').then(res => res.data.data);
        dispatch({
            type: "divisions",
            payload: data
        })
    }
    const fetchDistricts = async (div) => {
        await axios.get(state.districtsUrl + div).then(res => res.data.data).then((data) => dispatch({
            type: "districts",
            payload: data
        }))

    }
    const fetchUpazilla = async (dis) => {
        const data = await axios.get(state.upazillaUrl + dis).then(res => res.data.data[0].upazilla)
        console.log(data, "upazilla");
        dispatch({
            type: "upazillas",
            payload: data
        })


    }
    const handleChangeDivisions = async (e) => {
        dispatch({
            type: "division",
            payload: e
        })
        await fetchDistricts(e);


    }
    const handleChangeDistricts = async (e) => {
        dispatch({
            type: "district",
            payload: e
        })
        await fetchUpazilla(e)
    }
    const handleChangeUpazilla = (e) => {
        dispatch({
            type: "upazilla",
            payload: e
        })
    }

    useEffect(() => {
        fetchDivisions();
        console.log(state.upazillas, '[a');
    }, [])

    return (
        <div>
            <Select onValueChange={handleChangeDivisions} required  >
                <SelectTrigger id="framework">
                    <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                        {state.divisions.map((div) => (
                            <SelectItem key={div._id} value={div._id}>{div.divisionNameBangla}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>

            </Select>

            <Select onValueChange={handleChangeDistricts} required  >
                <SelectTrigger id="framework">
                    <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                        {state.districts.map((div) => (
                            <SelectItem key={div._id} value={div._id}>{div.districtNameBangla}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={handleChangeUpazilla} required  >
                <SelectTrigger id="framework">
                    <SelectValue placeholder="Upazilla" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                        {state.upazillas.map((div) => (
                            <SelectItem key={div._id} value={div.upazillaName}>{div.upazillaNameBangla}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div>{`${state.division} ${state.district} ${state.upazilla}`}</div>
            <button onClick={() => console.log(state)}>Buut</button>
        </div>
    )
}


