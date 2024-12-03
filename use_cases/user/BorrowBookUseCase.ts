import UserRepository from '../../repositories/UserRepository';
import BookRepository from '../../repositories/BookRepository';
import AppError from '../../utils/AppError';

export default class BorrowBookUseCase {
    private userRepository: UserRepository;
    private bookRepository: BookRepository;

    constructor(userRepository: UserRepository, bookRepository: BookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    async execute(userId: string, bookId: string) {
        const user = await this.userRepository.getUserById(userId);
        const book = await this.bookRepository.getBookById(bookId);

        if (!book) {
            throw new AppError('Book not found', 404);
        }

        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.books = user.books || { past: [], present: [] };

        const isAlreadyBorrowed = user.books.present.some(b => b.bookId === bookId);
        if (isAlreadyBorrowed) {
            throw new AppError('Book is already borrowed by this user', 400);
        }

        user.books.present.push({ bookId, name: book.name });
        await this.userRepository.updateUser(user);

        return { message: 'Book borrowed successfully' };
    }
}
