import UserRepository from '../../repositories/UserRepository';

export default class GetUserByIdUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: string) {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user._id,
            name: user.name,
            books: {
                past: user.borrowedBooks
                    .filter(book => book.score !== null)
                    .map(book => ({
                        bookId: book.bookId,
                        score: book.score,
                    })),
                present: user.borrowedBooks
                    .filter(book => book.score === null)
                    .map(book => ({
                        bookId: book.bookId,
                    })),
            },
        };
    }
}
