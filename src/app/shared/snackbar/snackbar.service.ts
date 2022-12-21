import { Injectable } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackbar(data: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: 3000,
      panelClass: 'mycsssnackbartest'
    });
  }
}
