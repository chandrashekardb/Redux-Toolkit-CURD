import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, setEdit, updatePost } from "./../redux/features/PostSlice";
import Spinner from './Spinner';

const Posts = () => {
  const [id, setId]=useState()
  const [textBody, setTextBody]=useState("")
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading, post, edit, body}=useSelector(state=>({...state.app}))

  //UseEffect
  useEffect(()=>{
    if(body){
      setTextBody(body)
    }
  },[body])

  //Function
  const handleFeatchData=(e)=>{
    e.preventDefault();
    if(!id){
      window.alert("Please Provide Post Id")
    }else{
      dispatch(getPost({id}))
      setId("")
    }
  }

  //Delete
  const handleDelete=({id})=>{
    dispatch(deletePost({id:post[0].id}));
    window.location.reload();
    window.alert("Post delteted !");
  }
  return (
    <>
    <div className="row mt-4 d-flex align-items-center justify-content-center">
      <div className="col-md-8">
        <form action="">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Select Your ID
            </label>
            <input
              type="number"
              value={id}
              onChange={(e)=>setId(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div>
            <button onClick={handleFeatchData} type="submit" className="btn btn-info">
              Fetch Post
            </button>
            <button onClick={()=>navigate('/creatpost')} type="button" className="ms-4 btn btn-warning" >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="container mt-4">
      {loading ? <Spinner />:(
        <>
        {post.length > 0 && (
          <> 
     <div className="card mt-4" >
  <div className="card-body">
    <h5 className="card-title">{post[0].title}</h5>
    {
      edit ? (<>
      <textarea
      className="form-control"
      value={textBody}
      onChange={(e)=>setTextBody(e.target.value)}
      id="floatingTextarea"
      />
      <div className="d-flex align-items-end justify-content-end mt-4">
    <button
    className="btn btn-success btn-sm"
    onClick={()=>{
      dispatch(updatePost({
        id:post[0].id,
        title:post[0].title,
        body:textBody
      }))
      dispatch(setEdit({edit:false, body:""}))
    }}
    >Save
    </button>
    <button 
    className="btn btn-danger btn-sm ms-4"
    onClick={()=>{
      dispatch(setEdit({edit:false, body:""}))
    }}
    >cancel</button>
    </div>
      </>):(<>
      <p className="card-text">{post[0].body}</p>
      </>)
    }
    
    {
      !edit && (<div className="d-flex align-items-end justify-content-end">
      <button 
      onClick={()=>dispatch(setEdit({edit:true, body:post[0].body}))}
      className="btn btn-success"
      >Edit
      </button>
      <button onClick={handleDelete} className="btn btn-danger ms-4">Delete</button>
      </div>)
    }
    
    
  </div>
</div>

          </>
        )}
        </>
      )}
    </div>
    </>
  );
};

export default Posts;
