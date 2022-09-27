import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Spinner from "../../Spinner/Spinner";
import { StaffService } from './../../../services/StaffService';
import { GroupService } from './../../../services/GroupServce';
import noAvatar from '../../../assets/images/no-avatar.jpg';
function ViewStaff() {
    const { staffId } = useParams();
    const [state, setState] = useState({
        loading: false,
        staff: {},
        group: {},
        errorMessage: ''
    });
    useEffect(function () {
        try {
            setState({ ...state, loading: true });
            async function fetchStaff() {
                let resStaff = await StaffService.getStaff(staffId);
                let resGroup = await GroupService.getGroup(resStaff.data);
                setState({
                    ...state,
                    staff: resStaff.data,
                    group : resGroup.data,
                    loading: false
                })
            }
            fetchStaff();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
    }, [])

    const { loading, staff, group,  errorMessage } = state;

    return (
        <React.Fragment>
            <section className="staff-view my-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h4 className="text-warning">View Staff</h4>
                    </div>
                    <p className="fst-italic">Duis dolore minim in anim aliquip occaecat Lorem aliquip qui excepteur aliquip. Eu proident officia do ut sunt ullamco incididunt cupidatat occaecat pariatur dolore minim velit. Ex excepteur sint officia tempor Lorem eu consequat. Laborum eiusmod elit irure esse dolor eu est. Duis duis voluptate id commodo.</p>
                </div>
            </section>
            <section className="staff-detail">
                {
                    loading ? <Spinner /> :
                        (
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-2">
                                        <img className="w-100" src={ staff.avatar || noAvatar } alt="" />
                                    </div>
                                    <div className="col-md-10">
                                        <ul className="list-groups">
                                            <li className="list-group-item">Name: <span className="fw-bold">{ staff.name }</span></li>
                                            <li className="list-group-item">Mobile: <span className="fw-bold">{ staff.mobile }</span></li>
                                            <li className="list-group-item">Email: <span className="fw-bold">{ staff.email }</span></li>
                                            <li className="list-group-item">Company: <span className="fw-bold">{ staff.company }</span></li>
                                            <li className="list-group-item">Title: <span className="fw-bold">{ staff.title }</span></li>
                                            <li className="list-group-item">Group: <span className="fw-bold">{ group.groupName}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <Link to={"/staff-app"} className="btn btn-warning">Back</Link>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </section>
        </React.Fragment>
    )
}

export default ViewStaff;