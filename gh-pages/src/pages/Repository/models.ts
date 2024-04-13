export interface Category {
  index: number;
  name: string;
  isSelected: boolean;
  repositoryNames: string[];
}

export interface RepositoryInfo {
  categories: Category[];
}
