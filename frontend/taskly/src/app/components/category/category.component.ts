import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
 categories: Category[] = [];
  error: string | undefined;
  editingCategory: Category | undefined;

  constructor(private categoryService: CategoryService,  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getCategories();
  }

  showErrorSnackbar(message: any): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 1500,
      panelClass: ['error-snackbar']      
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        this.error = err.error.message;
        this.showErrorSnackbar(this.error);
      }
    });
  }

  addCategory(): void {
    const newCategoryName = prompt("Inserisci il nome della nuova categoria:");
  
    if (newCategoryName && newCategoryName.trim() !== "") {
      const newCategory: Category = { id: 0, name: newCategoryName.trim() }; 
  
      this.categoryService.createCategory(newCategory).subscribe({
        next: (category) => {
          this.categories.push(category);
          console.log("Categoria aggiunta con successo:", category);
        },
        error: (err) => {
          this.error = err.error.message;
          this.showErrorSnackbar(this.error);
          console.error("Errore:", err);
        }
      });
    }
  }

  editCategory(category: Category) {
    this.editingCategory = { ...category }; 
  }
  
  saveEdit() {
    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (err) => {
          this.error = err.error.message;
          this.showErrorSnackbar(this.error);
        }
      });
    }
  }
  
  deleteCategory(id: number) {
    if (confirm("Sei sicuro di voler eliminare questa categoria?")) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (err) => {
          console.error("Errore durante l'eliminazione della categoria:", err);
          this.error = err.error.message;
          this.showErrorSnackbar(this.error);
        }
      });
    }
  }

}
