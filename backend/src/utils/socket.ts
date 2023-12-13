import { database } from "../db/db";
import { Server as SocketServer } from "socket.io";

class Socket {
  private _io: SocketServer | null = null;

  public init(app: any) {
    this._io = new SocketServer(app, { path: "/io", cors: { origin: "*" } });
    this._io.use((socket, next) => {
      try {
        const token = (socket.handshake.headers || {})["x-api-token"];
        if (!token) throw Error("token not found");
        const isExist = database.getAllToken().find((t) => t.token === token);
        if (!isExist) throw Error("invalid token");
        next();
      } catch (error: any) {
        next(error);
      }
    });
    this._subEvents();
  }

  private _subEvents() {
    this._io?.on("connection", (socket: any) => {
      // console.log("A user connected");

      // Listen for messages
      socket.on("chat message", (msg: string) => {
        console.log(`Message: ${msg}`);
        this._io?.emit("chat message", msg);
      });

      socket.on("disconnect", () => {
        // console.log("User disconnected");
      });
    });
  }

  public io() {
    return this._io;
  }

  public emit(evName: string, evData?: string) {
    if (this._io) {
      this._io.emit(evName, evData);
    }
  }

  public on(evName: string, callback: (...args: any[]) => void) {
    if (this._io) {
      this._io.on(evName, callback);
    }
  }
}

export const socket = new Socket();
