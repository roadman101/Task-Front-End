/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import arrow from "../assets/v4.png"
import { Link, useNavigate, useParams, useSubmit } from 'react-router-dom';
import arrdown from "../assets/v5.png";
import { Dropdown } from 'bootstrap';
import DropDown from '../components/DropDown';
import { useFetch } from '../hooks/useFetch';
import toast from 'react-hot-toast';

const EditTask = ( { baseURL } ) => {
  const { id } = useParams();

  const { data } = useFetch(`${baseURL}/api/task/${id}`);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [sending, setSending] = useState(false);
  
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setTag(data.tag);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();
    

    const editedData = {
      title,
      description,
      tag,
    };

    const oldData = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    };

    const response = await fetch(`${baseURL}/api/task/${id}`, oldData);

    const resData = await response.json();
    

    if (response.status === 200) {
      toast.success(resData.message);
      setSending(false);
      navigate("/tasks");
      return;
    } else {
      toast.error(resData.message);
    }
  
    // toast.success(data.message);
    // navigate("/tasks");

    setSending(false);
  };

  return (
    <div className='editt-con text-start'>
        <div className='back-to2 d-flex align-items-center gap-4'>
          <Link to={"/tasks"} >
          <img src={arrow} alt="" />
          </Link>
          <h2 className='m-0'>Edit Task</h2>
        </div>
        <form onSubmit={handleSubmit}   className='editt-form' action="">

            <div className='title-edit position-relative'>
              <label className='position-absolute' htmlFor="task-title">Task Title</label>
              <input onChange={(event) => {
                setTitle(event.target.value);
              }}  className='w-100 py-4 px-5 rounded-2' type="text" id="task-title" name="task-title" placeholder='E.g Project Defense, Assignment ...' required />
            </div>

            {/* =============== */}
            <div className='describe-edit position-relative'>
              <label className='position-absolute' htmlFor="">Description</label>
              <textarea onChange={(event) => {
                setDescription(event.target.value);
              }}  className='w-100 py-4 px-5 rounded-2' name="" id="" placeholder='Briefly describe your task...' cols="30" rows="7" value={description}></textarea>
            </div>
            {/* =============== */}

            <DropDown setTag={setTag} />

            {/* =============== */}

            <button disabled={sending} className='but-edit mt-5'>Done</button>

        </form>
        <div className='my-5 bk-top text-center' >
            <a href="#">Back To Top</a>
        </div>
    </div>
  )
}

export default EditTask;