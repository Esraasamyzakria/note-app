import { Component, inject } from '@angular/core';
import{FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  masgsucess:string='';
  errmasage:string='';
  isloading:boolean=false;

  registerform:FormGroup= new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{6,}$/)]),
    age: new FormControl(null,[Validators.required,Validators.pattern(/^(1[0-9]|[2-7][0-9]|80)$/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })
  submitform():void{
    console.log(this.registerform.value)

if(this.registerform.valid){
  this.isloading=true
  this.authService.sendregisterdata(this.registerform.value).subscribe({
    next:(res)=>{
      if(res.msg === 'done'){
        console.log(res)
        this.registerform.reset();
        this.masgsucess=res.msg
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 600);
        this.isloading=false;
      }
    },
    error:(err)=>{
      this.errmasage=err.error.msg
      this.isloading=false;
    }
  })
}
else{
  this.registerform.markAllAsTouched()
}
  }
}
