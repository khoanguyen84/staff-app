import React, { useState, useEffect } from "react";
import axios from 'axios';
function Location() {
    const [state, setState] = useState({
        provinces: [],
        districts: [],
        wards: []
    })

    const [select, setSelect] = useState({
        province_id: "46",
        district_id: "481"
    })
    const { province_id, district_id } = select;
    
    useEffect(() => {
        try {
            async function getData() {
                let resProvinces = await axios.get("https://vapi.vnappmob.com/api/province/");
                let resDistricts = await axios.get(`https://vapi.vnappmob.com/api/province/district/${province_id}`);
                let resWards = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district_id}`);
                setState({
                    provinces: resProvinces.data.results,
                    districts: resDistricts.data.results,
                    wards: resWards.data.results
                })
            }
            getData();
        } catch (error) {

        }
    }, [province_id, district_id])

    const { provinces, districts, wards } = state;


    const handleChange = async (e) => {
        if (e.target.name === "province_id") {
            let province_value = e.target.value;
            let resDistricts = await axios.get(`https://vapi.vnappmob.com/api/province/district/${province_value}`);
            let first_district_id = resDistricts.data.results[0].district_id;
            setSelect({
                ...select,
                province_id: province_value,
                district_id: first_district_id
            })
            
        } else {
            setSelect({
                ...select,
                [e.target.name]: e.target.value
            })
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <select className="form-control" name="province_id" value={province_id} onChange={handleChange}>
                        {
                            provinces.map(province => (
                                <option key={province.province_id} value={province.province_id}>{province.province_name}</option>
                            ))
                        }
                    </select>
                    <select className="form-control" name="district_id"  value={district_id} onChange={handleChange}>
                        {
                            districts.map(district => (
                                <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
                            ))
                        }
                    </select>
                    <select className="form-control" name="ward_id" onChange={handleChange}>
                        {
                            wards.map(ward => (
                                <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Location;