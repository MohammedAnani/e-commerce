import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Iproducts } from '../../core/interfaces/iproducts';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {



  // var
  productsList:WritableSignal<Iproducts[]>=signal([])
  inputSearch:WritableSignal<string>=signal('')
  // inject Services
  _ProductsService=inject(ProductsService)
  _CartService=inject(CartService)
  _ToastrService=inject(ToastrService)


ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList.set(res.data)

      }
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
