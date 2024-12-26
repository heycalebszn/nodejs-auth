const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path')

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};

const deleteProfile = (req, res) => {
    const { username } = req.body;
    try{
        const index = usersDB.users.find(person => person.username === username);
        if(index){
            const deletedNote = usersDB.users.splice(index, 1);
            res.status(200).json(deletedNote);
        } 
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {deleteProfile};
