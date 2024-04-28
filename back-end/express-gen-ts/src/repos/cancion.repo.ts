import { Cancion } from '@src/models/cancion.model';
import { Db } from '@src/repos/MockOrm';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

async function getOne(id: number): Promise<Cancion | null> {
  const db: Db = await orm.openDb();
  for(const cancion of db.canciones) {
    if (cancion.id === id) {
      return cancion;
    }
  }
  return null;
}

async function getAll(): Promise<Cancion[]> {
  const db: Db = await orm.openDb();
  let canciones: Cancion[] = [];
  for(const cancion of db.canciones) {
    if(!contains(cancion.id, canciones)) {
      canciones.push(cancion);
    } 
  }
  return canciones;
}

async function add(cancion: Cancion): Promise<void> {
  const db: Db = await orm.openDb();
  do {
    cancion.id = getRandomInt();
  } while(await persists(cancion.id));
  db.canciones.push(cancion);
  return orm.saveDb(db);
}

async function update(cancion: Cancion): Promise<void> {
  const db: Db = await orm.openDb();
  for(let i = 0; i < db.canciones.length; i++) {
    if(db.canciones[i].id === cancion.id) {
      const dbCancion = db.canciones[i];
      db.canciones[i] = {
        ...dbCancion,
        nombre: cancion.nombre,
        artista: cancion.artista,
        album: cancion.album,
        minutos: cancion.minutos,
        segundos: cancion.segundos
      };
      return orm.saveDb(db);
    }
  }
}

async function delete_(id: number): Promise<void> {
  const db: Db = await orm.openDb();
  for (let i = 0; i < db.canciones.length; i++) {
    if (db.canciones[i].id === id) {
      db.canciones.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

function contains(id: number, array: any[]): boolean {
  for(const cancion of array) {
    if(cancion.id === id) {
      return true;
    }
  }
  return false;
}

async function persists(id: number): Promise<boolean> {
  const db: Db = await orm.openDb();
  for(const cancion of db.canciones) {
    if (cancion.id === id) {
      return true;
    }
  }
  return false;
}

export default {
  getOne,
  getAll,
  add,
  update,
  delete: delete_,
  contains,
  persists
}