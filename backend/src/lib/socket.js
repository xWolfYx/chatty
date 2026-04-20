import http from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
	},
});

io.on("connection", (socket) => {
	console.log("User has connected", socket.id);

	socket.on("disconnect", () => {
		console.log("A user has been disconnected", socket.id);
	});
});

export { app, io, server };
