import {
  PathOrFileDescriptor,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import path from "path";
import { generateRandomString } from "../utils/string";
const dataDir = path.join(process.cwd(), "data");
const filePathCfg = path.join(dataDir, "config.json");

type IVault = {
  id: string;
  name: string;
  data: any;
  created_at: string | null;
  updated_at: string | null;
};

type IToken = {
  token: string;
  name: string;
};

export type IData = {
  vaults: IVault[];
  tokens: IToken[];
};

const initValue = {
  vaults: [],
  tokens: [],
};

class Database {
  private _data: IData = initValue;

  private _writeToFile() {
    writeFileSync(filePathCfg, JSON.stringify(this._data, null, 3));
  }

  private _loadFromFileCfg(defaultValue: any) {
    return JSON.parse(readFileSync(filePathCfg, "utf-8") || defaultValue);
  }

  public init() {
    if (existsSync(filePathCfg)) {
      this._data = this._loadFromFileCfg(initValue);
    } else {
      if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
      this._writeToFile();
    }
  }

  public getVaults() {
    return this._data.vaults;
  }

  public getVaultById(id: string) {
    return this._data.vaults.find((v) => v.id === id);
  }

  public addVault(name: string, data: any) {
    const isExist = this._data.vaults.find((v) => v.name === name);
    if (!!isExist) throw Error("Vault with its name already exist");
    this._data.vaults = [
      ...this._data.vaults,
      {
        id: generateRandomString(10),
        name,
        data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    this._writeToFile();
  }

  public updateVault(id: string, data: any) {
    const index = this._data.vaults.findIndex((v) => v.id === id);
    if (index < 0) throw Error("Vault with its name already exist");
    this._data.vaults[index].data = data;
    this._data.vaults[index].updated_at = new Date().toISOString();
    this._writeToFile();
  }

  public deleteVaultById(id: string) {
    this._data.vaults = this._data.vaults.filter((v) => v.id !== id);
    this._writeToFile();
  }

  public generateNewToken(name: string) {
    const isExist = this._data.tokens.find((t) => t.name === name);
    if (isExist) throw Error("Name already inused");
    const token = generateRandomString(32);
    this._data.tokens = [...this._data.tokens, { token, name }];
    this._writeToFile();
    return token;
  }

  public getAllToken() {
    return this._data.tokens;
  }

  public revokeToken(token: string) {
    this._data.tokens = this._data.tokens.filter((t) => t.token !== token);
    this._writeToFile();
  }
}

export const database = new Database();
