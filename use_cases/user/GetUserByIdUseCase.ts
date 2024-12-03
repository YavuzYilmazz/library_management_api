import UserRepository from '../../repositories/UserRepository';
import AppError from '../../utils/AppError';

export default class GetUserByIdUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: string) {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return {
            id: user._id,
            name: user.name,
            books: {
                past: user.books.past.map(book => ({
                    name: book.name,
                    userScore: book.userScore,
                })),
                present: user.books.present.map(book => ({
                    name: book.name,
                })),
            },
        };
    }
}
