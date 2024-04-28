import { Router } from 'express';
import jetValidator from 'jet-validator';
import Paths from '../constants/Paths';
import Cancion from '@src/models/cancion.model';
import CancionRoutes from './cancion.routes';

const apiRouter = Router(), validate = jetValidator();
const cancionRouter = Router();
apiRouter.use(Paths.Canciones.Base, cancionRouter);

cancionRouter.get(
  Paths.Canciones.Get,
  CancionRoutes.getAll
);

cancionRouter.post(
  Paths.Canciones.Add,
  validate(['cancion', Cancion.isCancion]),
  CancionRoutes.add
);

cancionRouter.put(
  Paths.Canciones.Update,
  validate(['cancion', Cancion.isCancion]),
  CancionRoutes.update,
);

cancionRouter.delete(
  Paths.Canciones.Delete,
  validate(['id', 'number', 'params']),
  CancionRoutes.delete,
);

export default apiRouter;