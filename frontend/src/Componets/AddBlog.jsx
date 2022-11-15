import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddBlog =()=>{
    const [title, setTitle] = useState("")
    const [author,setAuthor] = useState("")
    const [category,setCategory] = useState("")
    const [content,setContent] = useState("")
    const navigate =useNavigate()


    // add new blog 
    const addBlog=(title,author,category)=>{
      const data ={
        title,
        author,
        category,
        content
      } 
    
    fetch('http://localhost:8080/addBlog',{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(res=>{
        if(res.responce=="error"){
            alert(res.message)
        }else{
            alert(res.message)
        }
    }).catch(err=>console.log(err))
}
const navigateBlog=()=>{
  
        navigate('/blog')
      
}


    return(
        <>
         <h1>Add Blog </h1>
        <div >

        <TextField className='text' value={title} onChange={(e) => setTitle(e.target.value)} id="outlined-basic"  label="title" variant="outlined" />
    <br />
    <br />
    <TextField value={author} onChange={(e) => setAuthor(e.target.value)} id="outlined-basic" label="author" variant="outlined" />
    <br />
    <br />
    <TextField value={category} onChange={(e) => setCategory(e.target.value)} id="outlined-basic" label="category" variant="outlined" />
    <br />
    <br />
    <TextField value={content} onChange={(e) => setContent(e.target.value)} id="outlined-basic" label="content" variant="outlined" />
    <br />
    <br />
    <br />
    <Button variant="contained" onClick={()=>{addBlog(title,author,category,content)}}>Add BLog</Button>
        </div>
 <br />
 <br />
    <p>to read all blog click on below  button </p>
        <Button style={{margin:"auto",width:"300px", color:"white",backgroundColor:"darkgreen"}} variant="contained" onClick={()=> {navigateBlog()}}>Blogs</Button>

        </>
    )
}
export default AddBlog;