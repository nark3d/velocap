export interface Page<T> {
  data: T[];
  meta: {
    count: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
