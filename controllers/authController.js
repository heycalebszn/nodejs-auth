const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const handleLogin = (req, res) => {
    const { username, password } = req.body;
    if(!username && !password) return res.status(400).send({ "message": "Please provide username and password"});
    if(!username && password) return res.status(400).send({ "message": "Please provide username"});
    if(username && !password) return res.status(400).send({ "message": "Please provide password"});
    try{
        const nameMatch = usersDB.users.find(person => person.username  === username);
        const pwdMatch = usersDB.users.find(person => person.password  === password);
        if(nameMatch && pwdMatch){
            //create JWTs
            const accessToken = jwt.sign(
                {"username": nameMatch.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            const refreshToken = jwt.sign(
                {"username": nameMatch.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
        res.status(202).send({ "message": "User is logged in"})
    }
        if(!nameMatch || !pwdMatch){
        res.status(400).send({ "message": "Please provide correct details"})
    }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {handleLogin};