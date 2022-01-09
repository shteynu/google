export interface BookModel {
  title: string;
  subtitle: string;
  authors: Array<string>;
  publishedDate: string;
  imageLinks: {thumbnail: string};
  language: string;
  categories: Array<string>;
}
