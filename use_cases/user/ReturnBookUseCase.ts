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

        if (!book) {
            throw new AppError('Book not found', 404);
        }

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const borrowedBookIndex = user.books.present.findIndex(b => b.bookId === bookId);
        if (borrowedBookIndex === -1) {
            throw new AppError('This book is not currently borrowed by the user', 400);
        }

        if (score !== undefined) {
            if (score <= 1 || score >= 10) {
                throw new AppError('Score must be between 1 and 10', 400);
            }

            if (book.score === -1) {
                book.score = score;
                book.voteCount = 1;
            } else {
                book.score = (book.score * book.voteCount + score) / (book.voteCount + 1);
                book.voteCount += 1;
            }
            await this.bookRepository.updateBook(book);
        }

        const borrowedBook = user.books.present[borrowedBookIndex];
        user.books.present.splice(borrowedBookIndex, 1);

        user.books.past.push({
            bookId: borrowedBook.bookId,
            name: book.name,
            userScore: score ?? undefined,
        });

        await this.userRepository.updateUser(user);

        return { message: 'Book returned successfully' };
    }
}
