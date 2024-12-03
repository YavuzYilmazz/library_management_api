import User, { IUser } from '../domain/entities/User';

export default class UserRepository {
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async listUsers(): Promise<IUser[]> {
        return await User.find({}, 'id name');
    }

    async updateUser(user: IUser): Promise<IUser> {
        return await user.save();
    }
}
