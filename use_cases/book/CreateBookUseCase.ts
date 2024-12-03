import BookRepository from '../../repositories/BookRepository';

export default class CreateBookUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(name: string) {
        if (!name) {
            throw new Error('Name is required');
        }

        return await this.bookRepository.createBook({ name, averageRating: 0, ratings: [] });
    }
}
