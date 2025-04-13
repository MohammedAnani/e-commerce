import { NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  msgError:WritableSignal<string>=signal('')
  isLoading:WritableSignal<boolean>=signal(true)
  idCart:WritableSignal<string|null>=signal('')

  // msgError:string=''
  // isLoading:boolean=true
  // idCart:string|null=''
  _ActivatedRoute=inject(ActivatedRoute)
  _OrdersService=inject(OrdersService)

  _FormBuilder=inject(FormBuilder)
  userForm: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    city: [null, [Validators.required]]
  });

  submitForm(){
    console.log(this.userForm.value)
    this._OrdersService.checkOut(this.idCart(),this.userForm.value).subscribe({
      next:(res)=>{
        if(res.status= 'success'){
          window.open(res.session.url)
        }
      },

    })
  }
  ngOnInit(): void {
   
    this._ActivatedRoute.paramMap.subscribe({
      next:(g)=>{
        this.idCart.set(g.get('id'))
      }
    })
  }

}
