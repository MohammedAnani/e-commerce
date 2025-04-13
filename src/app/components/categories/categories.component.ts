import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  _CategoriesService=inject(CategoriesService)
  //
  allCategories:WritableSignal<Ibrands[]>=signal([])

  ngOnInit(): void {
   this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.allCategories.set(res.data)
    }
   })
  }}
