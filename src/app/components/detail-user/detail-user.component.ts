import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

export interface UserForm extends FormGroup <{
  nome: FormControl<string>;
  cognome: FormControl<string>;
  id: FormControl<number>;
  dataDiNascita: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  // sesso: FormControl<string>;
}>{}

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnChanges, OnInit{

  idUser?: number;
  user: User = {};
  modalita: 'detail' | 'edit' | 'create' = 'detail';

  sessi: string[] = [
    'MASCHIO',
    'FEMMINA'
  ];

  userReactive: UserForm = this.fb.group({
    id: this.fb.nonNullable.control(0),
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    dataDiNascita: this.fb.nonNullable.control('', [Validators.required]),
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    // sesso: this.fb.nonNullable.control('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null){
      let id = this.route.snapshot.paramMap.get('id');
      this.idUser = parseInt(id!);
      this.userService.findById(this.idUser).subscribe(u => this.userReactive.patchValue(u));
      this.modalita = this.router.url.includes('detail') ? 'detail' : 'edit'; 
      if(this.router.url.includes('detail'))
        this.userReactive.disable(); // lo posso fare anche particolareggiato con la get del parametro
    }else{
      this.modalita = 'create';
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.idUser)
      this.userService.findById(this.idUser).subscribe(u => this.user = u);
  }

  save(){
    if(this.userReactive.valid){
      this.userService.save(this.userReactive.value).subscribe(res => this.router.navigate(['list']));
    }
  }

  back(){
    this.router.navigate(['list']);
  }

  disable(): boolean {
    if(this.router.url.includes('detail'))
      return false;
    else
      return true;
  }
}
