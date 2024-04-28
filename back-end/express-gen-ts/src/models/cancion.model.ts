const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object with the appropriate song keys.';

export interface Cancion {
  id: number;
  nombre: string;
  artista: string;
  album: string;
  minutos: number;
  segundos: number;
}

function new_(
  nombre?: string,
  artista?: string,
  album?: string,
  minutos?: number,
  segundos?: number,
  id?: number
): Cancion {
  return {
    id: (id ?? -1),
    nombre: (nombre ?? ''),
    artista: (artista ?? ''),
    album: (album ?? ''),
    minutos: (minutos ?? -1),
    segundos: (segundos ?? -1)
  }
}

function from(param: object): Cancion {
  if (!isCancion(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as Cancion;
  return new_(p.nombre, p.artista, p.album, p.minutos, p.segundos, p.id);
}

function isCancion(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'nombre' in arg && typeof arg.nombre === 'string' && 
    'artista' in arg && typeof arg.artista === 'string' &&
    'album' in arg && typeof arg.album === 'string' &&
    'minutos' in arg && typeof arg.id === 'number' &&
    'segundos' in arg && typeof arg.segundos === 'number'
  );
}

export default {
  new: new_,
  from,
  isCancion
} as const;