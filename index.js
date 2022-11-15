const express = require('express');
const { signUp, login, createBlog, getBlog, deleteBlog, updateBlog } = require('./controllers/user');
const connectDataBace = require('./databace/db');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT ||8080 ;
app.use(cors())
app.use(express.json());


app.post('/signup', signUp)

app.post('/login', login)
app.post('/addBlog',createBlog )

app.get('/blog',getBlog)

app.delete('/blog/:id',deleteBlog)

app.patch('/blog/:id',updateBlog)

connectDataBace().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started at prot No. ${PORT}`)
    })
})
