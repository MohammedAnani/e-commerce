import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
  _TranslationService=inject(TranslationService)
  _TranslateService=inject(TranslateService)
  _AuthService=inject(AuthService)
  _CartService=inject(CartService)

  countNumber:Signal<number>=computed(()=>this._CartService.cartNumber())

  ngOnInit(): void {
    // number of item from api
    this._CartService.getProductfromCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })
    // assign value from services

  }
  logOut(){
    this._AuthService.logOut()
  }

  change(lang:string){
    this._TranslationService.changeLang(lang)

  }

}
