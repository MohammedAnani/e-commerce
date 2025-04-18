import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { sign } from 'crypto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)

  isLoading:WritableSignal<boolean>=signal(false)



  rgisterForm: FormGroup = this._FormBuilder.group(
    {
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}/)]],
      rePassword: [null],
      phone: [null, [Validators.required, Validators.pattern(/^0[0125][0-9]{9}$/)]],
    },
    { validators: this.confirmPassword }
  );





  submitForm(){
   if(this.rgisterForm.valid){
    this.isLoading.set(true)
    this._AuthService.setRegisterForm(this.rgisterForm.value).subscribe({

      next:(res)=>{
        this.isLoading.set(false)
        // navigate
        if(res.message=='success'){
          this._Router.navigate(['/login'])

        }

      },
      error:(err)=>{
        this.isLoading.set(false)

      }
    })
    console.log(this.rgisterForm.value)
   }
   else{
    this.rgisterForm.markAllAsTouched()
    this.rgisterForm.setErrors({mismatch:true})
   }
  }

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value===g.get('rePassword')?.value){
      return null

    }
    else{
      return {mismatch:true}
    }
  }
}
