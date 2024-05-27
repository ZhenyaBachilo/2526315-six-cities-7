import { DocumentType } from '@typegoose/typegoose';

import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface UserService {
  create(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<Omit<UserEntity, 'password'>>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<Omit<UserEntity, 'password'>>>;
  updateById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<DocumentType<Omit<UserEntity, 'password'>> | null>;
}
