import cors from 'cors';
import  express  from 'express';
import { MongoClient } from 'mongodb';
import  dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config()
const mongoClient= new MongoClient(process.env.DATABASE_URL);
let db;

try{
   await mongoClient.connect()
   db=mongoClient.db("apiMyWallet");
}catch(error){
    console.log("falha na conexão com o servidor")
    }
const app=express()
app.use(cors)
app.use(express.json)




const PORT=5001;
app.listen(PORT,()=>console.log(`servidor rodando na porta ${PORT}`))