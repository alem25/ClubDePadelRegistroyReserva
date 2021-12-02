import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  url: string = environment.url + 'users'
  nombre: string | undefined
  email1: string | undefined
  clave1: string | undefined
  fecha: string | undefined
  phone: string | undefined
  alreadyExists = true
  min = new Date(1900, 1, 1)
  max = new Date()

  ngOnInit() {
  }
  
  checkIfExists() {
    if (this.nombre !== null && this.nombre.length > 2) {
      const urlCheck = this.url + '/' + this.nombre;
      return this.http.get(urlCheck, { observe: 'response'}).toPromise().then(
        response => {
          switch (response.status) {
            case 200:
              this.alreadyExists = true
              this.snackBar.open('Este nombre de usuario ya existe', 'Cerrar',
                { duration: 10000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
              break;
            default:
              break;
          }
        }).catch( (error) => {
        switch (error.status) {
          case 404:
            this.alreadyExists = false
            this.snackBar.open('Usuario válido', 'Cerrar',
              { duration: 10000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
            break;
          case 500:
            this.alreadyExists = true
            this.snackBar.open('Error interno', 'Cerrar',
              { duration: 10000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          default:
            break;
        }
      });
    }
  }

  isDisabled(miform: any) {
    let fn = new Date(this.fecha)
    if (fn < this.min || fn > this.max)
      return true
    return miform !== undefined && miform.valid === false || this.alreadyExists === true
  }

  register() {
    const date = this.fecha !== undefined ? new Date(this.fecha).getTime() : undefined;
    const body = {
      username: this.nombre,
      email: this.email1,
      password: this.clave1,
      phone: this.phone,
      birthdate: date !== undefined ? date : undefined,
    };
    return this.http.post(this.url, body, { observe: 'response'}).toPromise().then(
      response => {
        switch (response.status) {
          case 201:
            this.snackBar.open('Usuario registrado correctamente. Por favor, ingresa al sistema', 'Cerrar',
              { duration: 10000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.router.navigate(['/login']);
            break;
          default:
            break;
        }
      }).catch( (error) => {
        switch (error.status) {
          case 400:
            this.snackBar.open('Usuario, contraseña o email requerido', 'Cerrar',
              { duration: 10000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          case 409:
            this.snackBar.open('Usuario repetido', 'Cerrar',
              { duration: 10000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          case 500:
            this.snackBar.open('Error interno', 'Cerrar',
              { duration: 10000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          default:
            break;
        }
      });
  }
}