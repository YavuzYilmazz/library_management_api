import Book, { IBook } from '../domain/entities/Book';

export default class BookRepository {
    async createBook(bookData: Partial<IBook>): Promise<IBook> {
        const book = new Book(bookData);
        return await book.save();
    }

    async getBookById(id: string): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async listBooks(): Promise<IBook[]> {
        return await Book.find({}, 'id name');
    }

    async updateBook(book: IBook): Promise<IBook> {
        return await book.save();
    }
}
