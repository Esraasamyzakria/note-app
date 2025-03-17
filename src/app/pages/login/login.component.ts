import { Component, inject } from '@angular/core';
import{FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  masgsucess:string='';
  errmasage:string='';
  isloading:boolean=false;

  loginform:FormGroup= new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{6,}$/)]),
  })
submitform():void{
console.log(this.loginform.value)
if(this.loginform.valid){
  this.isloading=true
  this.authService.sendlogindata(this.loginform.value).subscribe({
    next:(res)=>{
      if(res.msg === 'done'){
        console.log(res)
        localStorage.setItem('token',res.token)
        this.loginform.reset();
        this.authService.savedatetoken();
        this.masgsucess=res.msg
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500);
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
  this.loginform.markAllAsTouched()
}
  }

}
