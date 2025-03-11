import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
 categories: Category[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log("le categorie sono state trovate")
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Errore nel recupero delle categorie';
        console.log("errore nel recupero delle catgeorie ")
        this.loading = false;
      }
    });
  }

}
