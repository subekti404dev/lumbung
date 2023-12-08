import { getMemoryInfo } from "./memory";
import { socket } from "./socket";

const timeout: any = {};

export const initMemInfoScheduler = () => {
  if (timeout.memory) {
    clearTimeout(timeout.memory);
  }
  timeout.memory = setTimeout(() => {
    socket.emit("memory_info", JSON.stringify(getMemoryInfo()));
    initMemInfoScheduler();
  }, 1000 * 1);
};
