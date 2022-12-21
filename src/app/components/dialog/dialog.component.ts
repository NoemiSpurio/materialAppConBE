import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ListUserComponent } from '../list-user/list-user.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  idUser?: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private userService: UserService, private snackService: SnackbarService){
    if(data)
      this.idUser = data;
  }

  delete(){
    this.userService.delete(this.idUser!);
    this.snackService.openSnackbar("Utente eliminato!");
  }
}
