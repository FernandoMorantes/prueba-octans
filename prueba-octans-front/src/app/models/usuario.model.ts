import { Rol } from "./rol.model";

export interface IUsuario {
    id?: number;
    nombre?: string;
    activo?: string;
    rol_id?: Rol; 
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public nombre?: string,
        public activo?: string,
        public rol_id?: Rol,
    ) {}
}
