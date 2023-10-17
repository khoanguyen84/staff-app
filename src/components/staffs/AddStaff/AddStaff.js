import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import noAvatar from '../../../assets/images/no-avatar.jpg';
import { StaffService } from "../../../services/StaffService";
import Spinner from "../../Spinner/Spinner";
import { GroupService } from './../../../services/GroupServce';
import FileUploadService from './../../../services/FileUploadService';
function AddStaff() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        staff: {
            name: '',
            avatar: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: '0',
            group: {
                id: 0,
                groupName: ""
            }
        },
        groups: [],
        errorMessage: ''
    });
    const [avatar, setAvatar] = useState({
        uploading: false,
        imageFile: ""
    });

    useEffect(function () {
        try {
            setState({ ...state, loading: true });
            async function fetchGroups() {
                let resGroup = await GroupService.getGroups();
                setState({
                    ...state,
                    groups: resGroup.data,
                    loading: false
                })
            }
            fetchGroups();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
        return () => {
            if(staff.avatar){
                async function deleteData(){
                    let filename = staff.avatar.split('/').pop().split('.')[0];
                    await FileUploadService.destroyImage(filename);
                }
                deleteData()
            }
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
            let group = {
                id : parseInt(staff.groupId),
                groupName: 
                document.getElementsByName("groupId")[0].options[document.getElementsByName("groupId")[0].selectedIndex].text
            }
            staff.groupId = parseInt(staff.groupId);
            staff.group = group;
            console.log(staff);
            let resStaff = await StaffService.createStaff(staff);
            setState({ ...state, loading: false });
            if (resStaff.data) {
                navigate("/staff-app", { replace: true });
            }
        } catch (error) {
            navigate("/staff-app/staff/add", { replace: false });
        }
    }

    const changeAvatar = (e) => {
        const fakeImageUrl = URL.createObjectURL(e.target.files[0]);
        staff.avatar = fakeImageUrl;
        setAvatar({ ...avatar, imageFile: e.target.files[0] });
    }
    const handleUpload = () => {
        if (avatar.imageFile) {
            setAvatar({ ...avatar, uploading: true })
            async function uploadAvatar() {
                let result = await FileUploadService.uploadImage(avatar.imageFile);
                staff.avatar = result.data.url;
                setAvatar({
                    ...avatar,
                    imageFile: result.data.secure_url,
                    uploading: false
                });
                toast.success("Avatar has been uploaded succeess.");
            }
            uploadAvatar();
        }
        else {
            toast.info("Please click on avatar area to select a photo.", { autoClose: 2000 })
        }
    }

    return (
        <React.Fragment>
            <section className="create-staff my-3">
                <div className="container">
                    <h4 className="text-success">Create Contact</h4>
                    <p className="fst-italic">Commodo non elit magna consequat et adipisicing. Veniam elit mollit ex duis aute culpa eiusmod incididunt exercitation mollit occaecat nisi minim exercitation. Ullamco adipisicing quis eu do. Incididunt amet dolor reprehenderit do id ad ullamco quis eu. Ipsum ut mollit eu non deserunt ex nisi Lorem aliqua veniam velit ipsum velit fugiat. Veniam anim fugiat commodo magna proident ad tempor anim et culpa qui fugiat dolor. Amet id Lorem mollit qui sunt aliquip et elit.</p>
                </div>
            </section>
            <section className="create-staff-detail">
                <div className="container">
                    {
                        loading ? <Spinner /> : (
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <input onChange={handleChange} value={staff.name} type="text" className="form-control" name="name" placeholder="Name" required />
                                        </div>
                                        {/* <div className="mb-2">
                                            <input onChange={handleChange} value={staff.avatar} type="url" className="form-control" name="avatar" placeholder="Avatar" required />
                                        </div> */}
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
                                                <option value="0" key="0" disabled>Select a group</option>
                                                {
                                                    groups.map(group => (
                                                        <option value={group.id} key={group.id}>{group.groupName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <button className="btn btn-success btn-sm me-2">Create</button>
                                            <Link to={"/staff-app"} className="btn btn-dark btn-sm">Back</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-8">
                                    <div className="d-flex flex-column w-50 align-items-center avatar-hover">
                                        <img className="img-thumbnail avatar-lg" src={staff.avatar || noAvatar} alt="" onClick={() => document.querySelector("#fileAvatar").click()} />
                                        {
                                            avatar.uploading ? (
                                                <button className="btn btn-warning btn-sm" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                </button>
                                            ) :
                                                <button className="btn btn-warning btn-sm" onClick={handleUpload}>Upload</button>
                                        }

                                        <input id="fileAvatar" accept="image/*" className="form-control d-none" type="file" onChange={changeAvatar} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

export default AddStaff;