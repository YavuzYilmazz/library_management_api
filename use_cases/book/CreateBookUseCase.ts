import BookRepository from '../../repositories/BookRepository';
import AppError from '../../utils/AppError';

export default class CreateBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(name: string) {
        if (!name) {
            throw new AppError('Name is required',400);
        }

        return await this.bookRepository.createBook({ name, averageRating: 0, ratings: [] });
    }
}
