import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: {email} });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email }});
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: {id} });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async delete(id: number) {
    const user = await this.usersRepository.findOne({where: {id}});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete(id);
    return {message: 'User deleted'};
  }
}
