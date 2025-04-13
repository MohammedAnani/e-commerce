import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

_BrandsService=inject(BrandsService)
//
allBrands:WritableSignal<Ibrands[]>=signal([])

ngOnInit(): void {
 this._BrandsService.getAllBrands().subscribe({
  next:(res)=>{
    this.allBrands.set(res.data)
  }
 })

}


}
