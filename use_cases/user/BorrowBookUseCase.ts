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

        if (!user || !book) {
            throw new AppError('User or Book not found',404);
        }

        const isAlreadyBorrowed = user.borrowedBooks.some(b => b.bookId === bookId);
        if (isAlreadyBorrowed) {
            throw new AppError('Book is already borrowed',400);
        }

        user.borrowedBooks.push({ bookId });
        await this.userRepository.updateUser(user);

        return { message: 'Book borrowed successfully' };
    }
}
