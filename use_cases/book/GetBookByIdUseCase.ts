import BookRepository from '../../repositories/BookRepository';

export default class GetBookByIdUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: string) {
        const book = await this.bookRepository.getBookById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }
}
