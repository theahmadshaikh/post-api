const express = require("express");
const path = require("path");
const fs = require("fs");
const {createDirectory,createFile} = require("./utils");
const { error } = require("console");
const app = express();


//middleware to parse icoming data
app.use(express.json());

//Creating Directory to store file of data
createDirectory(path.join(__dirname,"data"));
createFile(path.join(__dirname,"data","data.json"));


//File Path
const filePath = path.join(__dirname,"data","data.json");

//home route
app.get("/",(req,res)=>{
    
    res.send("<h1>Home Route</h1>");
})


//All posts route
app.get("/posts",(req,res)=>{
    fs.readFile(filePath,(error,data)=>{
        if(error)
        {
            res.statusCode = 500;
            res.send("Server error can't fetch posts");
        }
        else
        {
            const postArray =JSON.parse(data.toString());
            res.type("json");
            res.send(postArray)
        }
    })
    
})

//Single post route
app.get("/posts/:id",(req,res)=>{
    fs.readFile(filePath,(error,data)=>{
        if(error)
        {
            res.statusCode=500;
            res.send("Server error");
        }
        else
        {
            const {id} = req.params;
            const postArray = [...JSON.parse(data.toString())];
            const post = postArray.filter((post)=>{
                return post.id == id;
            })
            if(post.length>0)
                res.send(post);
            else
                res.send("Post doesn't exists");
            
        }
    })
})


//create post route.

app.post("/posts",(req,res)=>{
    const post = req.body;
    fs.readFile(filePath,(error,data)=>{
        if(error)
            res.send({"Message":"Server erro"});
        else
        {
            const postArray = JSON.parse(data.toString());
            console.log(postArray);
            postArray.unshift(post);
            fs.writeFile(filePath,JSON.stringify(postArray,null,2),(error)=>{
                if(error)
                res.send({"message":"server error"});
                else
                res.send({"message":"Post Created Succesfully"});
            })
        }
    })
})


app.put("/posts/:id",(req,res)=>{
    const {id} = req.params;
    console.log(id);
    res.send("<h1> Update post route");
})


//Delete Route

app.delete("/posts/:id",(req,res)=>{
    const {id} = req.params;
    fs.readFile(filePath,(error,data)=>{
        if(error)
        {
            res.statusCode=500;
            res.send("Server error");
        }
        else
        {
            const postArray = JSON.parse(data.toString());
            let deletedPost = undefined;
            const postAfterDeletion=[];
            postArray.forEach(element => {
                if(id!=element.id)
                    postAfterDeletion.push(element);
                else
                    deletedPost = element;

            });
            console.log(postAfterDeletion)
            console.log(typeof postAfterDeletion)
            if(!deletedPost)
                res.send("Post doesn't exists");
            else{
                fs.writeFile(filePath,JSON.stringify(postAfterDeletion,null,2),(error)=>{
                    if(error)
                        console.log(error);
                })
                res.send(deletedPost)
            }
        }
    })
})


app.listen(3000,()=>{
    console.log("Server is up and running")
})