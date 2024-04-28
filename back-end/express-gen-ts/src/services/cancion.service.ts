import cancionRepo from "@src/repos/cancion.repo";
import { Cancion } from "@src/models/cancion.model";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

export const SONG_NOT_FOUND_ERR = 'Song not found.';

function getAll(): Promise<Cancion[]> {
  return cancionRepo.getAll();
}

function add(cancion: Cancion): Promise<void> {
  return cancionRepo.add(cancion);
}

async function update(cancion: Cancion): Promise<void> {
  const persists: boolean = await cancionRepo.persists(cancion.id);
  if(!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, SONG_NOT_FOUND_ERR);
  }
  return cancionRepo.update(cancion);
}

async function _delete(id: number): Promise<void> {
  const persists: boolean = await cancionRepo.persists(id);
  if(!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, SONG_NOT_FOUND_ERR);
  }
  return cancionRepo.delete(id);
}

export default {
  getAll,
  add,
  update,
  delete: _delete
} as const;