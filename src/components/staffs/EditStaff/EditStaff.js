import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GroupService } from './../../../services/GroupServce';
import { StaffService } from './../../../services/StaffService';
import noAvatar from '../../../assets/images/no-avatar.jpg';
import Spinner from "../../Spinner/Spinner";
function EditStaff() {
    const navigate = useNavigate();
    const { staffId } = useParams();
    const [state, setState] = useState({
        loading: false,
        staff: {
            name: '',
            avatar: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: '0'
        },
        groups: [],
        errorMessage: ''
    });
    useEffect(function () {
        try {
            setState({ ...state, loading: true });
            async function fetchGroups() {
                let resGroup = await GroupService.getGroups();
                let resStaff = await StaffService.getStaff(staffId);
                setState({
                    ...state,
                    groups: resGroup.data,
                    staff: resStaff.data,
                    loading: false
                })
            }
            fetchGroups();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
    }, [])
    const { loading, groups, staff, errorMessage } = state;
    const handleChange = function (event) {
        event.preventDefault();
        setState({
            ...state,
            staff: {
                ...staff,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async function (event) {
        event.preventDefault();
        try {
            setState({ ...state, loading: true });
            let resStaff = await StaffService.updateStaff(staff, staffId);
            setState({ ...state, loading: false });
            if (resStaff.data) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            navigate(`/staff/edit/${staffId}`, { replace: false });
        }
    }
    return (
        <React.Fragment>
            <section className="update-staff my-3">
                <div className="container">
                    <h4 className="text-primary">Update Contact</h4>
                    <p className="fst-italic">Reprehenderit pariatur do deserunt eu et Lorem mollit enim nostrud non. Dolor commodo eiusmod labore occaecat. Voluptate Lorem laboris dolore cupidatat quis commodo veniam esse exercitation nostrud quis. Tempor esse consectetur exercitation Lorem incididunt labore do excepteur. Eu dolore eiusmod dolor quis. Ex excepteur cupidatat magna incididunt minim occaecat qui.</p>
                </div>
            </section>
            <section className="update-staff-detail">
                <div className="container">
                    {loading ? <Spinner /> : (
                        <div className="row align-items-center">
                            <div className="col-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2">
                                        <input onChange={handleChange} value={staff.name} type="text" className="form-control" name="name" placeholder="Name" required />
                                    </div>
                                    <div className="mb-2">
                                        <input onChange={handleChange} value={staff.avatar} type="url" className="form-control" name="avatar" placeholder="Avatar" required />
                                    </div>
                                    <div className="mb-2">
                                        <input onChange={handleChange} value={staff.mobile} type="tel" className="form-control" name="mobile" placeholder="Mobile" required />
                                    </div>
                                    <div className="mb-2">
                                        <input onChange={handleChange} value={staff.email} type="email" className="form-control" name="email" placeholder="Email" required />
                                    </div>
                                    <div className="mb-2">
                                        <input onChange={handleChange} value={staff.company} type="text" className="form-control" name="company" placeholder="Company" required />
                                    </div>
                                    <div className="mb-2">
                                        <input onChange={handleChange} value={staff.title} type="text" className="form-control" name="title" placeholder="Title" required />
                                    </div>
                                    <div className="mb-2">
                                        <select onChange={handleChange} className="form-control" name="groupId" value={staff.groupId}>
                                            <option value="0" key="0">Select a group</option>
                                            {
                                                groups.map(group => (
                                                    <option value={group.id} key={group.id}>{group.groupName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <button className="btn btn-primary btn-sm me-2">Update</button>
                                        <Link to={"/"} className="btn btn-dark btn-sm">Back</Link>
                                    </div>
                                </form>
                            </div>
                            <div className="col-8">
                                <img className="avatar-lg" src={staff.avatar || noAvatar} alt="" />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </React.Fragment>
    )
}

export default EditStaff;