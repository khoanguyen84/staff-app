import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { StaffService } from '../../../services/StaffService';
import Spinner from "../../Spinner/Spinner";

function StaffList() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        staffs: [],
        errorMessage: ''
    });

    useEffect(function () {
        try {
            setState({ ...state, loading: true });
            async function fetchStaffs() {
                let resStaff = await StaffService.getStaffs();
                setState({
                    ...state,
                    staffs: resStaff.data,
                    loading: false
                })
            }
            fetchStaffs();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
    }, [])
    const handleDelete = async function(staffId){
        let confirmed = window.confirm("Are you sure to remove this staff?");
        if(confirmed){
            try {
                let resStaff = await StaffService.deleteStaff(staffId);
                if(resStaff.data){
                    navigate("/staff-app", {replace : true});
                }
            } catch (error) {
                setState({ ...state, errorMessage: error.message });
            }
        }
    }
    const handleSearch = async function(event){
        setState({...state, loading: true});
        let resStaffs = await StaffService.getStaffs();
        setState({
            ...state,
            staffs: resStaffs.data.filter(staff => staff.name.toLowerCase().includes(event.target.value.toLowerCase())),
            loading : false
        })
    }
    const { loading, staffs, errorMessage } = state;
    return (
        <React.Fragment>
            <section className="staff-info my-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h4>Staff Manager</h4> 
                        <Link to={"/staff-app/staff/add"} className="btn btn-primary btn-sm ms-2"><i className="fa fa-plus-circle me-1"></i>New</Link>
                    </div>
                    <p className="fst-italic">Deserunt ex minim ipsum consectetur incididunt nostrud qui sunt qui. Deserunt reprehenderit quis esse dolore officia elit sit. Ad deserunt voluptate quis consectetur aliqua proident cupidatat exercitation aliqua consequat occaecat. Labore ex occaecat enim elit sit qui velit id. Qui ut sit anim excepteur ullamco ipsum. Consequat aliqua incididunt anim ex dolore.</p>
                    <div className="d-flex align-items-center">
                        <input onInput={handleSearch} type="search" className="form-control w-25 me-2" placeholder="Search staff name" />
                        <button className="btn btn-outline-secondary btn-sm">Search</button>
                    </div>
                </div>
            </section>
            <section className="staff-list">
                <div className="container">
                    <div className="row">
                        {loading ? <Spinner /> : (
                            staffs.map(staff => {
                                return (
                                    <div key={staff.id} className="col-6">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-3">
                                                        <img className="avatar-md m-auto" src={staff.avatar} alt="" />
                                                    </div>
                                                    <div className="col-8">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">Name: <span className="fw-bold">{staff.name}</span></li>
                                                            <li className="list-group-item">Mobile: <span className="fw-bold">{staff.mobile}</span></li>
                                                            <li className="list-group-item">Email: <span className="fw-bold">{staff.email}</span></li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-1">
                                                        <div className="d-flex flex-column align-items-center">
                                                            <Link to={`/staff-app/staff/view/${staff.id}`} className="btn btn-warning btn-sm mb-1"><i className="fa fa-eye"></i></Link>
                                                            <Link to={`/staff-app/staff/edit/${staff.id}`} className="btn btn-primary btn-sm mb-1"><i className="fa fa-edit"></i></Link>
                                                            <button onClick={()=> handleDelete(staff.id)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default StaffList;