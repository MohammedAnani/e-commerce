import { AuthService } from './../../core/services/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

    private readonly _FormBuilder=inject(FormBuilder);
    private readonly _AuthService=inject(AuthService);
    private readonly _Router=inject(Router);

    // step:number=1;
    step:WritableSignal<number>=signal(1)


  verifyEmail: FormGroup = this._FormBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],

    },

  );
  verifyCode: FormGroup = this._FormBuilder.group(
    {
      resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],

    },

  );
  resetPassword: FormGroup = this._FormBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^\d{6,}/)]],

    },

  );


  verifyEmailSubmit(){
    // input email auto
    let value=this.verifyEmail.get('email')?.value
    this.verifyEmail.get('email')?.patchValue(value)


    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg=='success'){
          this.step.set(2)
        }
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  verifyCodeSubmit(){

    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        if(res.status=='Success'){
          this.step.set(3)
        }
        console.log(this.verifyCode.value)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  verifyRePassSubmit(){
    this._AuthService.setRestPass(this.resetPassword.value).subscribe({
      next:(res)=>{
          localStorage.setItem('tokenUser',res.token);
          this._AuthService.saveUserData();
          // navigate
          this._Router.navigate(['/home'])
        },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
