const express = require('express');
const app = express();
const fsPromises = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const handleNewUser = async (req,res) => {
    const { username, password } = req.body; // get the username and password
    if(!username && !password) return res.status(400).send({ "message": "Please provide username and password"});
    if(!username && password) return res.status(400).send({ "message": "Please provide username"});
    if(username && !password) return res.status(400).send({ "message": "Please provide password"});
    const duplicate = usersDB.users.find(person => person.username === username);
    if(duplicate) return res.sendStatus(409);
    try{
        //en- crpyt the password 
        var hashedPassword ;
        //store new user
        const newUser = {
            "username": username,
            "password": password
        }
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users),
        )
        return res.status(201).send({ "message": "Profile created"})
    }
    catch(err){
        console.log(err)
    }
};

module.exports = {handleNewUser};