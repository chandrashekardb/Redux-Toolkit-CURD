import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from './../redux/features/PostSlice';
import Spinner from './Spinner';

const CreatePost = () => {
  const [values, setValues]=useState({title:"", body:""});
  const [showPost, setShowPost]=useState(false)
  const {loading, post}=useSelector(state=>({...state.app}));
  const {title, body}=values
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  //handle Post function
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(createPost({values}))
    setValues({title:" ", body:""})
    setShowPost(true)
  }

  //Show Created Post function
  const showCreatedPost=()=>{
    return(
      <>
      {loading ? (<Spinner />):(
        <div className="card mt-4">
          <h5 className="card-title">{post[0].title}</h5>
          <p className="card-text">{post[0].body}</p>
        </div>
      )}
      </>
    )
  }
  return (
    <>
    <h1 className="text-center bg-warning text-white p-2 mt-2">Create Post</h1>
    <form action="">
          <div className="mb-3 mt-4">
              <input
              type="text"
              placeholder='Enter Post Title'
              value={title}
              onChange={(e)=>setValues({...values, title:e.target.value})}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div>
              <div className="form-floating">
          <textarea
           className="form-control" 
           value={body}
           onChange={(e)=>setValues({...values, body:e.target.value})}
           placeholder="Leave a comment here" id="floatingTextarea2" 
           style={{height: 100}} defaultValue={""} />
          <label htmlFor="floatingTextarea2">add post description</label>
        </div>
        <div className='d-flex align-items-end justify-content-end mt-2'>
            <button onClick={()=>navigate('/')}   type="submit" 
            className="btn btn-outline-primary">
              Go Home
            </button>
            <button type="submit"
             className="ms-4 btn btn-outline-danger" 
             onClick={handleSubmit}>
              Submit
            </button>
          </div>
          </div>
    </form>     
    <div className="mt-4 p-2">
    {
      showPost && <div className='mt-2'>{showCreatedPost()}</div>
    }  
    </div> 
    </>
  )
}

export default CreatePost