/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import plusLogo from "../assets/plus.png"
import editIcon from "../assets/clarity_note-edit-line.png"
import binIcon from "../assets/fluent_delete-24-regular.png"
import { useFetch } from '../hooks/useFetch'
import toast from 'react-hot-toast'

const MyTask = ( { baseURL } ) => {
    const test = useFetch(`${baseURL}/api/task`);

    const { data, setData, loading, error } = test;

    const handleDelete = async (id) => {
        setData((prevData) => {
            return prevData.filter((task) => {
                return task._id !== id;
            });
        });

        const deleteTask = {
            method: "DELETE",
        };

        const respon = await fetch(`${baseURL}/api/task/${id}`, deleteTask);

        const data = await respon.json();

        if (respon.status === 200) {
            toast.success(data.message);
            return;
        } 
        
        
        toast.error(data.message);
    };

  return (
    <div className='alltasks-con'>
        <div className='my-tasks d-flex justify-content-between align-items-center'>
            <h2 className='m-0'>My Tasks</h2>
            <Link to={"/new"}  className='d-flex justify-content-between align-items-center'>
                <img src={plusLogo} alt="" />
                <p className='m-0'>Add New Task</p>
            </Link>
        </div>

        {/* //=====--------======------======-----====\\ */}

        {data ? data.map((Task) => {
            const { title, description, tag, _id } =  Task;

            const tagColor = tag === "Urgent" ? "#f38383" : "#73c3a6";

            return  (
                <div className='tasks-content' key={_id}>
            <div className='inner-tak d-flex justify-content-between align-items-end'>
                <p style={{ color: tagColor }}  className='m-0 tak-p'>{tag}</p>
                <div className='tasks-but d-flex gap-4'>
                    <Link to={`/edit/${Task._id}`} className='d-flex align-items-center justify-content-center'>
                        <img className='' src={editIcon}  alt="" />
                        <p className='m-0'>Edit</p>
                    </Link>
                    <button onClick={() => {
                      return  handleDelete(_id);
                    }} to={""}  className='d-flex align-items-center justify-content-between'>
                        <img src={binIcon} alt="" />
                        <p className='m-0'>Delete</p>
                    </button>
                </div>
            </div>

            <hr />
                <div className='text-start task-detail'>
                    <h3>{title}</h3>
                    <p>
                        {description}
                    </p>
                </div>

        </div>

            )
        }) : null}

        {loading ? <p>LOADING...</p> : null}
        {error ? <p>{error}</p> : null}
        
        <div className='my-5 bk-top' >
            <a href="#">Back To Top</a>
        </div>

    </div>
  );
};

export default MyTask;