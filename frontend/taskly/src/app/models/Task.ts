import { Category } from "./Category";

export class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;  
    categories: Category[];
  
    constructor(
      id: number,
      title: string,
      description: string,
      completed: boolean,
      dueDate: string,
      categories: Category[]
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.dueDate = dueDate;
      this.categories = categories;
    }
  }
  