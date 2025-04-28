export class Book {
  constructor(
    private _title: string,
    private _author: string,
    private _isbn: string
  ) {
    if (!_title.trim()) {
      throw new Error('Title cannot be empty');
    }
    if (!_author.trim()) {
      throw new Error('Author cannot be empty');
    }
    if (!_isbn.trim()) {
      throw new Error('ISBN cannot be empty');
    }
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get isbn(): string {
    return this._isbn;
  }

  toJSON() {
    return {
      title: this._title,
      author: this._author,
      isbn: this._isbn
    };
  }
} 