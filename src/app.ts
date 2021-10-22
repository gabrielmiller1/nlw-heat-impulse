import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

import { router } from './routes';

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connectoin", socket => console.log("Usuario conectado no socket"));

app.use(express.json());

app.use(router);

app.get("/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code);
}); 

export { serverHttp, io };