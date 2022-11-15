import React, { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button';

const Blog =()=>{

    const [data, setData] = useState([])

    // get all blog 
  useEffect(()=>{
    getData()
  }, [])
    const getData= ()=>{
        fetch(`http://localhost:8080/blog`)
        .then(res=>res.json())
        .then(res =>{
            setData(res)
        })
    }
    console.log(data)
    return(
        <>
        <h1>
            ALL Blog Are Here...  
        </h1>
        <div style={{display:"flex" , justifyContent:"space-around",width:"80%",margin:"20px auto"}}>
            <h1 >Title</h1>
            <h1>category</h1>
            <h1>author</h1>
            <h1>content</h1>
        </div>
      {
        data?.map((el)=>(
           
            <div style={{border:"1px solid #cecece" , display:"flex" , justifyContent:"space-around",width:"80%",margin:"20px auto"}}>
                < p style={{color:"purple"}}>{el.title}</p>
                <p style={{color:"purple"}}>{el.category}</p>
                <p style={{color:"purple"}}>{el.author}</p>
                <p style={{color:"purple"}}>{el.content}</p>
            </div>
        ))
      }
   <Button  variant="contained"  style={{height:"50px", color:"white",backgroundColor:"darkgreen",marginTop:"6px"}} > <h4>UPDATE</h4></Button>
            <Button  variant="contained"  style={{height:"50px", color:"white",backgroundColor:"darkgreen",marginTop:"6px"}}> <h4>DELETE</h4></Button>
        
        </>
    )
}
export default Blog