import express from "express";
import {PrismaClient} from "@prisma/client";


const app = express();
const prisma =new PrismaClient();

app.use(express.json());


// READ ALL USERS CRUD
app.get("/users", async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        if (users.length === 0){
            return res.status(404).json({ message: "Users not found "});
    
        }
        res.status(200).json(users)

    }catch(err){
        console.error("Error in GET /users:", err);  
        res.status(500).json({message: "Internal server error"});
    }
});

app.get("/users/:id", async (req, res) => {
    try{
        const id =parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if(!user){
           return res.status(404).json({
                message: "user not found"
            })
        }

        console.log(user)
        res.status(200).json(user)
    }catch(err){
        console.error("Error in GET /users/:id:", err);  
        res.status(500).json({message: "Internal server error"});

    }
})

app.post("/users", async (req, res) => {
    try {
        const {firstName, lastName, emailAddress} = req.body;
        if(!firstName || !lastName || !emailAddress){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                emailAddress
            }
        }) 
        console.log(user);
        console.log(req.body)
        res.status(201).json({message: "Users created successfully", user})
    }catch(err){
        console.error("Error in POST /users:", err);  
        res.status(500).json({message: "Internal server error"});
    }
});

app.patch("/users/:id", async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const {firstName, lastName, emailAddress} = req.body;
        
        const user = await prisma.user.findUnique({
            where: {id: id}
        })
        if (!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

// Build update data dynamically
        const updateData = {};
        if (firstName!== undefined)
            updateData.firstName = firstName;
        if (lastName!== undefined)
            updateData.lastName = lastName;
        if (emailAddress!== undefined)
            updateData.emailAddress = emailAddress;



        const newUser = await prisma.user.update({
            where: {id},
            data: updateData
        })

        res.status(200).json({message: `user updated successfully (${id})`, newUser})
    }catch(err){
        console.error("Error in PATCH /users/:id:", err);  
        res.status(500).json({message: "Internal server error"});
    }
});

app.delete("/users/:id", async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const deletedUser = await prisma.user.delete({
            where: {id: id}
        });
        
        console.log(deletedUser)
        res.status(200).json({message: `User deleted successfully (${id})`, id})
    }catch(err){
        console.error("Error in DELETE /users/:id:", err);  
        res.status(500).json({message: "Internal server error"})
    }
})




const port = 5000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}...`)
})



