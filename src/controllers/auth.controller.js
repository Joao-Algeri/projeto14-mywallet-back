import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { usersCollection, sessionsCollection } from '../database/db.js'


export async function signUp(req, res) {
    const newUser = res.locals.user
    const hash = bcrypt.hashSync(password, 10)


    try {
        await usersCollection.insertOne({ ...newUser, password: hash })
        const user = await db.collection('users').findOne({ email });
        const token = uuidV4()
        await sessionsCollection.insertOne({ userId: user._id, token })
        res.status(201).send(token);

    } catch (err) {
        res.status(500).send("Houve um problema no servidor, tente novamente mais tarde")
    }
};

export async function signIn(req, res) {

    const user = res.locals.user

    const token = uuidV4()

    try {

        await sessionsCollection.insertOne({ userId: user._id, token })

        res.send({ token })
    } catch (error) {
        res.status(500).send("Houve um problema no servidor, tente novamente mais tarde")
    }
};