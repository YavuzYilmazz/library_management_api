import UserRepository from '../../repositories/UserRepository';

export default class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(name: string) {
        if (!name) throw new Error('Name is required');
        return await this.userRepository.createUser({ name, borrowedBooks: [] });
    }
}
