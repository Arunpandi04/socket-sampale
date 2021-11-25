import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import * as bodyParser from "body-parser";
import cors from "cors";
import { initialRoutes } from './Routes/index.Routes'

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    private io: socketIO.Server
    public expressApp: express.Application;
       public initialroutes: initialRoutes = new initialRoutes();
    constructor(port: number) {
        this.port = port
        this.expressApp = express()
        this.config();
        this.initialroutes.initialRoutes(this.expressApp)
        this.server = new http.Server(this.expressApp)
        this.Start()
        this.io = new socketIO.Server(this.server,{
         cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
          }})
        this.socketConfig()
    }

    private config(): void {
      this.expressApp.use(bodyParser.json());
      this.expressApp.use(bodyParser.urlencoded({ extended: false }));
      this.expressApp.use(cors({ credentials: true, origin: true, }));
   }
private socketConfig(): void {
   let interval: any
          this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)
            if (interval) {
               clearInterval(interval);
            }
            interval = setInterval(() => this.getApiAndEmit(socket), 1000);
            socket.on("disconnect", () => {
               console.log("Client disconnected");
               clearInterval(interval);
            });
        })
   }

   private getApiAndEmit(socket: any): void {
      console.log("getApiAndEmit called")
      const response = new Date();
      // Emitting a new message. Will be consumed by the client
      socket.emit("FromAPI", response);
   }
    public Start() {
        this.server.listen(this.port)
        console.log(`Server listening on port ${this.port}.`)
    }
}

new App(port)