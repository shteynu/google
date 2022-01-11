export class BookModel {
  id: string;
  title: string;
  subtitle: string;
  authors: Array<string>;
  publishedDate: string;
  imageLinks: {thumbnail: string};
  language: string;
  categories: Array<string>;

  constructor(id: string, title: string, subtitle: string, authors: Array<string>, publishedDate: string,
              imageLinks: { thumbnail: string }, language: string, categories: Array<string>) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.authors = authors;
    this.publishedDate = publishedDate;
    this.imageLinks = imageLinks;
    this.language = language;
    this.categories = categories;
  }
}
