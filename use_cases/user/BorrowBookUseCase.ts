import UserRepository from '../../repositories/UserRepository';
import BookRepository from '../../repositories/BookRepository';

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
            throw new Error('User or Book not found');
        }

        const isAlreadyBorrowed = user.borrowedBooks.some(b => b.bookId === bookId);
        if (isAlreadyBorrowed) {
            throw new Error('Book is already borrowed');
        }

        user.borrowedBooks.push({ bookId });
        await this.userRepository.updateUser(user);

        return { message: 'Book borrowed successfully' };
    }
}
