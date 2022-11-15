
const jwt  = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const { User, Blog } = require('../databace/schema');



const SECRET_KEY ='asdfgghjklmnbvcxz';


// Sign up 

async function signUp(req,res){
    let {name, email, password} =req.body;

    const user =await User.findOne({email})
 

    
    if(user){
        return res.send({
            response:"error",
            message:"User already register"
        })
    }else{
        password = bcrypt.hashSync(password, 10)
        await User.create({
            name,
            email,
            password,
            verifyEmailotp: crypto.randomInt(10000, 100000),
            verifiedEmail: false
        })

        return res.send({
            response:"success",
            message:'user sign up Successfuly'
        })
    }

}


// Login user 


async function login(req,res){
    const {email, password} =req.body

    const userFound =await User.findOne({
        email
    })

    if(!userFound){
       return  res.status(400).send({
        response:"error",
        message:"email not  found"
       })
    }else{
        let matched = bcrypt.compareSync(password , userFound.password)
        if(matched){
            let {name ,email,verifiedEmail} = userFound
            const token = jwt.sign({name, email, verifiedEmail }, SECRET_KEY)
            res.send({
                response:'success',
                message:'successfully loged in',
                token,
                user:{
                    name,
                    email,
                    verifiedEmail
                }
            })
        }else{
            return res.status(400).send({
                response:'error',
                message:'Invalid Password'
            })
        }
    }
}

async function createBlog(req,res){
    let {title, category,author ,content}=req.body

    let userId =User.id
    if(!title){
        return res.send({
            response:"error",
            message:"add title "
        })
    }else{
        await Blog.create({
            userId,
            title,
            category,
            author,
            content
        })

        return res.send({
            response:'success',
            message:"Blog is Crated Successufuly"
        })
    }
}


//request for   get all blogs 


async function getBlog(req,res){
    const query =req.query
    let data

    if(query.author && query.category){
        data =await Blog.find({author: query.author , category:query.category})
    }
    else if(query.author){
        data = await Blog.find({author: query.author})
    }
    else if(query.category){
        data =await Blog.find({category: query.category})

    }
    else if(!query.author && !query.category){
        data =await Blog.find({})
    }
    return res.send(JSON.stringify(data))
    
}
// Delete blog 

async function deleteBlog(req,res){
    const{id} = req.params;
    console.log(id)
const del =await Blog.deleteOne({_id:id})
if(del){
    res.send({
        response:"succeess",
        message:"Blog deleted successfully"
    })

}else{
    res.status(400).send({
        response:"error",
        message:"Blog Not found"
    })
}


}

// update Blog 
async function updateBlog(req,res){
    const {id} =req.params;
    let {title, author,content,category}= req.body
    const update =await Blog.findByIdAndUpdate(id,{title:title, author:author, content:content, category:category})
    if(!update){
      return  res.status(400).send({
            response:"error",
            message:"Blog not found"
        })
    }
    else{
        return res.send({
            response:"sucess",
            message:" Blog successfuly updated"
        })
    }
}




module.exports ={signUp,login , createBlog ,getBlog , deleteBlog,updateBlog}

