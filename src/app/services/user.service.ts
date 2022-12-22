import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = 'http://localhost:8080/api/utente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  USER_LIST: User[] = [
    { id: 1, nome: 'Pluto', cognome: 'Plutotto', dataDiNascita: '12/02/2020' },
    { id: 2, nome: 'Topolino', cognome: 'Topolotto', dataDiNascita: '31/01/1990' },
    { id: 3, nome: 'Paperino', cognome: 'Paperotto', dataDiNascita: '09/10/2012' },
    { id: 4, nome: 'Bal', cognome: 'Raj', dataDiNascita: '13/08/1997' },
    { id: 5, nome: 'Ajeje', cognome: 'Brazorf', dataDiNascita: '19/01/1997' },
    { id: 6, nome: 'Mimol', cognome: 'DeMemolinis', dataDiNascita: '19/01/1997' },
    { id: 7, nome: 'Mimol', cognome: 'DeMemolinis', dataDiNascita: '19/01/1997' },
    { id: 8, nome: 'Mimol', cognome: 'DeMemolinis', dataDiNascita: '19/01/1997' },
  ];

  constructor(private http: HttpClient) { }

  getUsers(): User[] {
    return this.USER_LIST;
  }

  getUsersOf(): Observable<User[]> {
    return this.http.get<User[]>(this.apiServer)
  }

  delete(idUser: number) {
    // this.USER_LIST = this.USER_LIST.filter(ele => ele.id !== idUser);
    return this.http.delete(this.apiServer + "/" + idUser);
  }

  save(user: User) {
    if (!user.id) {
      user.id = this.cercaIdMax() + 1;
      this.USER_LIST.push(user);
    }
    this.USER_LIST.filter(u => u.id == user.id).map(u => { u.nome = user.nome; u.cognome = user.cognome; u.dataDiNascita = user.dataDiNascita; });
  }

  findById(id: number){
    return this.http.get<User>(this.apiServer +"/" + id);
  }

  cercaIdMax(): number {
    // let ids = this.USER_LIST.map(a => a.id);
    // return Math.max.apply(null, ids);
    return Math.max(...this.USER_LIST.map(o => o.id!));
  }
}
