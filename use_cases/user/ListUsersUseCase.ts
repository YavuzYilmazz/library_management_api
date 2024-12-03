import UserRepository from '../../repositories/UserRepository';

export default class ListUsersUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        return await this.userRepository.listUsers();
    }
}
