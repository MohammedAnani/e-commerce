import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,SweetAlert2Module ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

_CartService=inject(CartService)
_TranslateService=inject(TranslateService)
x:boolean=true;


cartDetailes:Icart|null=null;


ngOnInit(): void {

  this._CartService.getProductfromCart().subscribe({
    next:(res)=>{
      this.cartDetailes=res
    },

  })
}
// delete
deleteItem(id:string){
  this._CartService.removeSpesificItem(id).subscribe({
    next:(res)=>{
      this.cartDetailes=res
      this._CartService.cartNumber.set(res.numOfCartItems);
    },

  })
}
// update
updateCart(id:string,count:number){
  this._CartService.updateNumberOfCart(id,count).subscribe({
    next:(res)=>{
      this.cartDetailes=res
    },

  })
}
// clear cart
deleteCart(){
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      if(res.message==='success')
      {
        this.cartDetailes={} as Icart
        this._CartService.cartNumber.set(0)
        this.x=false

      }
    },

  })
}
  // alret
 saveFile(): void {
  this.deleteCart()

}
}
