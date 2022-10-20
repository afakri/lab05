import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDbService } from './firestore/user-db.service';
import { User } from './model/user';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[] = []
  constructor(private builder:FormBuilder,private store:UserDbService) { }
  userForm = this.builder.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    phone:['',[Validators.minLength(10),Validators.maxLength(10),Validators.pattern('\[1-9]\\d{2}[1-9]\\d{6}')]],
    email : ['',[Validators.email]]
  })

  get firstName(): AbstractControl<string> {return <AbstractControl>this.userForm.get('firstName'); }
  get lastName(): AbstractControl<string> {return <AbstractControl>this.userForm.get('lastName'); }
  get phone(): AbstractControl<string> {return <AbstractControl>this.userForm.get('phone'); }
  get email(): AbstractControl<string> {return <AbstractControl>this.userForm.get('email'); }



  ngOnInit(): void {
    this.store.getUsers().subscribe(data=>{
      this.users = data.map(e => {
         return {
         id: e.payload.doc.id,...(e.payload.doc.data() as object)
        } as User;
      });

    })
  }

  submit():void{
    const user = new User(
      <string>this.userForm.value.firstName,
      <string>this.userForm.value.lastName,
      <string>this.userForm.value.phone,
      <string>this.userForm.value.email
    )
    this.store.createUser(user)

    this.userForm.reset()
  }

}
