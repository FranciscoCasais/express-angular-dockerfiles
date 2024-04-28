import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import cancionService from "@src/services/cancion.service";
import { Cancion } from "@src/models/cancion.model";
import { IReq, IRes } from "./types/express/misc";

async function getAll(_: IReq, res: IRes): Promise<IRes> {
  const canciones = await cancionService.getAll();
  return res.status(HttpStatusCodes.OK).json({ canciones });
}

async function add(req: IReq<{ cancion: Cancion }>, res: IRes): Promise<IRes> {
  const { cancion } = req.body;
  await cancionService.add(cancion);
  return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<{ cancion: Cancion }>, res: IRes): Promise<IRes> {
  const { cancion } = req.body;
  await cancionService.update(cancion);
  return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes): Promise<IRes> {
  const id = +req.params.id;
  await cancionService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getAll,
  add,
  update,
  delete: delete_
} as const;