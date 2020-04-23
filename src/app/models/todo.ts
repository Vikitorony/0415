export interface ToDo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  authorID: number;
}