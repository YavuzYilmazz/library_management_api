import BookRepository from '../../repositories/BookRepository';
import AppError from '../../utils/AppError';

export default class GetBookByIdUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id: string) {
        const book = await this.bookRepository.getBookById(id);
        if (!book) {
            throw new AppError('Book not found',404);
        }
         return {
            id: book._id,
            name: book.name,
            score: book.score,
        };
;
    }
}
