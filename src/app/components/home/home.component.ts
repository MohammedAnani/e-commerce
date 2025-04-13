import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Icatagory } from '../../core/interfaces/icatagory';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { ProductsComponent } from "../products/products.component";
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, FormsModule, ProductsComponent,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //caosul

    customMainSlider: OwlOptions = {
      rtl:true,
      loop: true,
      autoplay:true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],

      items:1,
      nav: false
    }
    //
    customOptions: OwlOptions = {
      rtl:true,
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: true
    }



  _ProductsService=inject(ProductsService)
  _CategoriesService=inject(CategoriesService)
  // productsList:Iproducts[]=[];
  productsList:WritableSignal<Iproducts[]>=signal([])
  categoryList:WritableSignal<Icatagory[]>=signal([])
// input search
  // inputSearch:string=''

  inputSearch:WritableSignal<string>=signal('')

  // add cart
  _CartService=inject(CartService)
  // tostar
  _ToastrService=inject(ToastrService)


ngOnInit(): void {


    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList.set(res.data)

      }
    })

    // get all categories
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data)

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


