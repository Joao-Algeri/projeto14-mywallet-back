import express from "express";
import cors from "cors"
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import dayjs from 'dayjs'
import joi from 'joi'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());


const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect()
    db = mongoClient.db()
} catch (error) {
    console.log(error)
    console.log('Houve um problema no servidor, tente novamente mais tarde')
}
const signInSchema = joi.object({
    email: joi.string().min(3).required(),
    password:joi.string().min(3).required()
})
const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(3).required(),
    password:joi.string().min(3).required()
})
const entrySchema = joi.object({
    value: joi.number().required().min(1),
    description:joi.string().required().min(1),
    type:joi.string().valid("deposit","withdraw").required()

})
app.post("/sign-up", async (req, res) => {
    
    const { name, email, password } = req.body;
    const validation=signUpSchema.validate(req.body,{abortEarly:false})
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(detail => detail.message))
    }
    try {
      const hash = bcrypt.hashSync(password, 10)
    //   await db.collection("users").insertOne({ name, email, password: hash })
      const user = await db.collection('users').findOne({ email });
      const token = uuid();        
    //   await db.collection("sessions").insertOne({userId: user._id,token})
res.status(200).send(token);
      
    } catch (err) {
      res.status(500).send(err.message)
    }
  });

//   app.post("/sign-in", async (req, res) => {
//     const { email, password } = req.body;
//     const validation=signInSchema.validate(req.body,{abortEarly:false})
//     if (validation.error) {
//         return res.status(422).send(validation.error.details.map(detail => detail.message))
//     }
    
    
//     try {
//       const user = await db.collection("users").findOne({ email });
  
//       if (user && !bcrypt.compareSync(password, user.password)) {
//         const token = uuid();
        
// 				await db.collection("sessions").insertOne({userId: user._id,token})
//         res.send(token);
        
//       } else {
//         return res.status(401).send("Usuario não encontrado");
//       }
//     } catch (err) {
//       res.status(500).send(err.message)
//     }
//   });

//   app.post("/new-entry", async (req, res) => {

//     const { value, description,type } = req.body;
    
//     const { authorization } = req.header;

//     const token = authorization?.replace('Bearer ', '');
  
//     if(!token) return res.sendStatus(401);
  
//     const session = await db.collection("sessions").findOne({ token });
//     if (!session) return res.sendStatus(401);

//     const validation=entrySchema.validate(req.body,{abortEarly:false})
//     if (validation.error) {
//         return res.status(422).send(validation.error.details.map(detail => detail.message))
//     }
    
//     try {
//         const entry={value,description,type,date:dayjs().format("DD/MM")}
//       const entries = await db.collection("registry").insertOne(entry);
  
//       if (user && !bcrypt.compareSync(password, user.password)) {
//         return res.sendStatus(200);
//       } else {
//         return res.sendStatus(401);
//       }
//     } catch (err) {
//       res.status(500).send(err.message)
//     }
//   });

//   app.get("/registry",async (req,res)=>{

//     const { authorization } = req.header;

//     const token = authorization?.replace('Bearer ', '');
  
//     if(!token) return res.sendStatus(401);
  
//     const session = await db.collection("sessions").findOne({ token });
//     if (!session) return res.sendStatus(401);

//     const user = await db.collection("users").findOne({ 
// 		_id: session.userId 
// 	})

//   if(user) {
//     const entries = await db.collection("registry").find().toArray()
//     res.send(entries)
//   } else {
//     res.sendStatus(401);
//   }
//   })

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT} `))