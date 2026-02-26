export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  likes: number;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectsResultDto {
  items: ProjectDto[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
