const { execSync } = require("child_process");

export const getMemoryInfo = () => {
  const stdout = execSync("free").toString();
  const lines = stdout.trim().split("\n");
  const memLine = lines[1];
  const swapLine = lines[2] || "";

  const memValues = memLine.split(/\s+/);
  const swapValues = swapLine.split(/\s+/);

  return {
    memory: {
      total: parseInt(memValues[1]),
      used: parseInt(memValues[2]),
      free: parseInt(memValues[3]),
      shared: parseInt(memValues[4]),
      buff_cache: parseInt(memValues[5]),
      available: parseInt(memValues[6]),
    },
    swap: {
      total: parseInt(swapValues[1]),
      used: parseInt(swapValues[2]),
      free: parseInt(swapValues[3]),
    },
  };
};
