import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from './models/usuario.model';
import { AppService } from './app.service';
import { CreateUpdateUsuarioComponent } from './create-update-usuario/create-update-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userSearch = new FormControl();
  usersNames: string[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'rol_id'];
  users: IUsuario[] = []
  filteredUsers:IUsuario[] = [];
  dataSource = null;
  loadingUsers: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    protected appService: AppService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("in")
    this.obtenerUsuarios();
  }

  async obtenerUsuarios(): Promise<void>{
    this.loadingUsers = true
    this.users = (await this.appService.findAll().toPromise()).body
    this.filteredUsers = this.users
    this.filteredUsers.sort((a,b) => a.id - b.id)
    this.dataSource = new MatTableDataSource<IUsuario>(this.filteredUsers)
    this.dataSource.paginator = this.paginator
    this.usersNames = this.users.map(user => user.nombre)
    this.loadingUsers = false
  } 

  cleanSearchBar(): void{
    console.log("in")
    this.userSearch.reset()
  }

  searchUsuario(option: any):void {
    let searchTerm = option !== null && option !== undefined ? option.value : this.userSearch.value
    
    if(searchTerm === "" || searchTerm === null){
      this.filteredUsers = this.users;
    }else{
      this.filteredUsers = this.users.filter(user => user.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    
    this.filteredUsers.sort((a, b) => a.id - b.id)
    this.dataSource = new MatTableDataSource<IUsuario>(this.filteredUsers);
  } 

  openDeltail(row: any): void{
    let dialogRef = this.dialog.open(CreateUpdateUsuarioComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.obtenerUsuarios()
      }
    });
  }
}
