const express = require("express")
import bodyParser from "body-parser"
import { UserModel } from "./user.model"
import cors from "cors"

const app = express()
app.use(cors())
const port = 3000
const urlEncodedParser = bodyParser.urlencoded()

const people: UserModel[] = [
    {
        name: "Niki",
        age: 17,
        favoriteColor: "blue"
    },
    {
        name: "Marti",
        age: 18,
        favoriteColor: "black"
    },
    {
        name: "Parti",
        age: 16,
        favoriteColor: "green"
    },

]

app.get('/users', (req, res) => {
    let { name, age, favoriteColor } = req.query
    age = Number.parseInt(age)

    let filteredPeople: UserModel[] = people.slice()

    if (name)
        filteredPeople = filteredPeople.filter(p => p.name == name)
    if (age)
        filteredPeople = filteredPeople.filter(p => p.age == age)
    if (favoriteColor)
        filteredPeople = filteredPeople.filter(p => p.favoriteColor == favoriteColor)

    const peopleJson = JSON.stringify(filteredPeople)
    res.json(peopleJson)
})

app.post('/users', urlEncodedParser, (req, res) => {
    let { name, age, favoriteColor } = req.body
    age = Number.parseInt(age)

    const newPerson: UserModel = { name, age, favoriteColor }
    people.push(newPerson)

    console.log(people)
    res.sendStatus(201)
})
app.delete('/users', (req, res) => {
    const { name } = req.query
    const userToDelete = people.find(p => p.name == name)

    if (userToDelete) {
        const index = people.indexOf(userToDelete)
        people.splice(index, 1)
        res.sendStatus(200)
    }
    else { res.sendStatus(404) }
    console.log(people)
})

app.put("/users",urlEncodedParser,(req,res)=>{
    const newUserData = req.body
    console.log(newUserData)

    res.sendStatus(200)
})

app.listen(port, () => { console.log(`Example app listening on port ${port}`) })