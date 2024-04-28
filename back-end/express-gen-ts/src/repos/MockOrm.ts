import jsonfile from 'jsonfile';
import { Cancion } from '@src/models/cancion.model';

const DB_FILE_NAME = 'database.json';

export interface Db {
  canciones: Cancion[];
}

function openDb(): Promise<Db> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<Db>;
}

function saveDb(db: Db): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}

export default {
  openDb,
  saveDb,
} as const;