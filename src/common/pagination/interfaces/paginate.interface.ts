export interface IPaginated<T> {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
  };
  links: {
    first: URL;
    last: URL;
    current: URL;
    next: URL | undefined;
    previous: URL | undefined;
  };
}
