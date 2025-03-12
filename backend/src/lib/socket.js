import express from "express"
import http from "http"
import {Server} from "socket.io"


const app=express()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
    }
});

const userSocket= {}

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)
    const userid = socket.handshake.query.userid;
    if (userid) userSocket[userid] = socket.id;

    io.emit("getonlineusers",Object.keys(userSocket));

    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id)
        delete userSocket[userid];
        io.emit("getonlineusers",Object.keys(userSocket));
    })
})

export {app,server,io}