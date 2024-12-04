import BookRepository from '../../repositories/BookRepository';
import AppError from '../../utils/AppError';

export default class CreateBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(name: string) {
        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const book = await this.bookRepository.createBook({ name });

        return {
            id: book._id,
            name: book.name,
            score: book.score
        };
    }
}
