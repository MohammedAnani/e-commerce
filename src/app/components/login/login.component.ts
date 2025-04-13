import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)

  // msgError:string='';
  // isLoading:boolean=false;
  isLoading:WritableSignal<boolean>=signal(false)


  loginForm: FormGroup = this._FormBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\d{6,}/)]],

    },

  );





  submitForm(){
   if(this.loginForm.valid){
    this.isLoading.set(true)
    this._AuthService.setLoginForm(this.loginForm.value).subscribe({

      next:(res)=>{
        this.isLoading.set(false)
        // navigate
        if(res.message=='success'){
          //save token in local storage
          localStorage.setItem('tokenUser',res.token)

          //decode token
          this._AuthService.saveUserData()
          this._Router.navigate(['/home'])

        }

      },

    })
   }
   else{
    this.loginForm.markAllAsTouched()
    this.loginForm.setErrors({mismatch:true})
   }
  }
}
