import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from './models/usuario.model';
import { Rol } from './models/rol.model';

type UsuarioResponseType = HttpResponse<IUsuario>;
type UsuarioArrayResponseType = HttpResponse<IUsuario[]>;
type RolArrayResponseType = HttpResponse<Rol[]>;

@Injectable({ providedIn: 'root' })
export class AppService {
    public resourceUrlUsuario = 'http://localhost:8080/api/v1/usuario';
    public resourceUrlRol = 'http://localhost:8080/api/v1/rol';

    constructor(protected http: HttpClient) { }

    create(usuario: IUsuario): Observable<UsuarioResponseType> {
        return this.http.post<IUsuario>(this.resourceUrlUsuario, usuario, { observe: 'response' });
    }

    findAll(): Observable<UsuarioArrayResponseType> {
        return this.http.get<IUsuario[]>(this.resourceUrlUsuario, { observe: 'response' });
    }

    update(usuario: IUsuario): Observable<UsuarioResponseType> {
        return this.http.put<IUsuario>(`${this.resourceUrlUsuario}/${usuario.id}`, usuario, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrlUsuario}/${id}`, { observe: 'response' });
    }

    findAllRoles(): Observable<RolArrayResponseType> {
        return this.http.get<Rol[]>(this.resourceUrlRol, { observe: 'response' });
    }
}