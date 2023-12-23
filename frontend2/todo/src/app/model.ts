
export class User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
  }

  export class Task {
    id?: number;
    name?: string;
    description?: string;
    statut?: string;
    created_at!:Date;
    due_date!: Date;
    user_id?: number;
  }