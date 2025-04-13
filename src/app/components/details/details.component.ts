import { Iproducts } from './../../core/interfaces/iproducts';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  _ActivatedRoute=inject(ActivatedRoute)
  _ProductsService=inject(ProductsService)
  _CartService=inject(CartService)
  _ToastrService=inject(ToastrService)

  idProduct:any
  detailsProducts:Iproducts |null=null;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.idProduct=p.get('id')
      },
      error:(err)=>{
        console.log(err)
      }
    })

    this._ProductsService.getSpesificProducts(this.idProduct).subscribe({
      next:(res)=>{
        this.detailsProducts=res.data;

      },

    })
  }
  addCart(id:string){
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._CartService.cartNumber.set(res.numOfCartItems);

        this._ToastrService.success(res.message)
      },

    })
  }

}
