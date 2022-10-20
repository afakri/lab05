import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './model/user';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private builder:FormBuilder,private userService:UsersService) { }
  userForm = this.builder.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    phone:['',[Validators.minLength(10),Validators.maxLength(10),Validators.pattern('\[1-9]\\d{2}[1-9]\\d{6}')]],
    email : ['',[Validators.email]]
  })

  users = this.userService.getUsers()
  get firstName(): AbstractControl<string> {return <AbstractControl>this.userForm.get('firstName'); }
  get lastName(): AbstractControl<string> {return <AbstractControl>this.userForm.get('lastName'); }
  get phone(): AbstractControl<string> {return <AbstractControl>this.userForm.get('phone'); }
  get email(): AbstractControl<string> {return <AbstractControl>this.userForm.get('email'); }



  ngOnInit(): void {
  }

  submit():void{
    const user = new User(
      <string>this.userForm.value.firstName,
      <string>this.userForm.value.lastName,
      <string>this.userForm.value.phone,
      <string>this.userForm.value.email
    )
    this.userService.addUser(user)
      this.users = this.userService.getUsers()

    this.userForm.reset()
  }

}
