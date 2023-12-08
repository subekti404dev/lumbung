/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

class Socket {
  private _socket: ReturnType<typeof io> | null = null;

  public init(host: string) {
    if (!this._socket) this._socket = io(host, { path: "/io" });
  }

  public socket() {
    return this._socket;
  }

  public emit(evName: string, evData?: string) {
    if (this._socket) {
      this._socket.emit(evName, evData);
    }
  }

  public on(evName: string, callback: (...args: any[]) => void) {
    if (this._socket) {
      this._socket.on(evName, callback);
    }
  }
}

export const socket = new Socket();
