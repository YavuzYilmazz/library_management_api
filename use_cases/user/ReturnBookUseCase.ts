import UserRepository from '../../repositories/UserRepository';
import BookRepository from '../../repositories/BookRepository';
import AppError from '../../utils/AppError';

export default class ReturnBookUseCase {
    private userRepository: UserRepository;
    private bookRepository: BookRepository;

    constructor(userRepository: UserRepository, bookRepository: BookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    async execute(userId: string, bookId: string, score?: number) {
        const user = await this.userRepository.getUserById(userId);
        const book = await this.bookRepository.getBookById(bookId);

        if (!user || !book) {
            throw new AppError('User or Book not found',404);
        }

        const borrowedBook = user.borrowedBooks.find(b => b.bookId === bookId);
        if (!borrowedBook) {
            throw new AppError('Book was not borrowed by the user',400);
        }

        if (score) {
            book.ratings.push(score);
            book.averageRating =
                book.ratings.reduce((sum, rating) => sum + rating, 0) / book.ratings.length;

            await this.bookRepository.updateBook(book);
        }

        user.borrowedBooks = user.borrowedBooks.filter(b => b.bookId !== bookId);
        await this.userRepository.updateUser(user);

        return { message: 'Book returned successfully' };
    }
}
