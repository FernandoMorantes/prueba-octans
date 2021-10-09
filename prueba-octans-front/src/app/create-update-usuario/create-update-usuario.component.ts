import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { Rol } from '../models/rol.model';
import { IUsuario, Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-create-update-usuario',
  templateUrl: './create-update-usuario.component.html',
  styleUrls: ['./create-update-usuario.component.scss']
})

export class CreateUpdateUsuarioComponent implements OnInit {
  userForm = this.fb.group({
    id: [null],
    nombre: [null, [Validators.required]],
    rol: [null, [Validators.required]],
    activo: [null, [Validators.required]],
  });

  roles: Rol[] = [];
  error: boolean = false;
  errorMsg: string = "";

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateUsuarioComponent>,
    protected appService: AppService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      nombre: string,
      activo: string,
      rol_id: Rol 
    }) { }

  async ngOnInit(): Promise<void> {
    if(this.data !== null){
      this.userForm.get(['id'])?.setValue(this.data.id);
      this.userForm.get(['nombre'])?.setValue(this.data.nombre);
      this.userForm.get(['rol'])?.setValue(this.data.rol_id.id);
      this.userForm.get(['activo'])?.setValue(this.data.activo);
    }
    this.roles = (await this.appService.findAllRoles().toPromise()).body
  }

  async updateUsuario(): Promise<void> {
    this.error = false;
    this.errorMsg = "";
    const usuario = this.updateFromForm();
    await this.appService.update(usuario).toPromise().then(() => {
      this.dialogRef.close(true);
    }).catch(() => {
      this.error = true;
      this.errorMsg = "No es posible actualizar el usuario";
    })
    
  }

  async saveUsuario(): Promise<void> {
    this.error = false;
    this.errorMsg = "";
    const usuario = this.createFromForm();
    await this.appService.create(usuario).toPromise().then(() => {
      this.dialogRef.close(true);
    }).catch(() => {
      this.error = true;
      this.errorMsg = "No es posible crear el usuario";
    })
  }

  async deleteUsuario(): Promise<void> {
    this.error = false;
    this.errorMsg = "";
    await this.appService.delete(this.data.id).toPromise().then(() => {
      this.dialogRef.close(true);
    }).catch(() => {
      this.error = true;
      this.errorMsg = "No es posible eliminar el usuario";
    })
  }

  cancelar(): void{
    this.dialogRef.close(false);
  }

  createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      nombre: this.userForm.get(['nombre'])!.value,
      activo: this.userForm.get(['activo'])!.value,
      rol_id: this.roles.find(rol => rol.id === this.userForm.get(['rol'])!.value)
    };
  }

  updateFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.data.id,
      nombre: this.userForm.get(['nombre'])!.value,
      activo: this.userForm.get(['activo'])!.value,
      rol_id: this.roles.find(rol => rol.id === this.userForm.get(['rol'])!.value)
    };
  }
}
