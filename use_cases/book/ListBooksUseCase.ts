import BookRepository from '../../repositories/BookRepository';

export default class ListBooksUseCase {
    private bookRepository: BookRepository;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute() {
        return await this.bookRepository.listBooks();
    }
}
