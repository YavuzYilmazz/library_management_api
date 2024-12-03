import UserRepository from '../../repositories/UserRepository';
import AppError from '../../utils/AppError';

export default class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(name: string) {
        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const newUser = {
            name,
            books: {
                past: [],
                present: [],
            },
        };

        return await this.userRepository.createUser(newUser);
    }
}
