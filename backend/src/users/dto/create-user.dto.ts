export class CreateUserDto {
    username: string;
    password: string;
    role: 'buyer' | 'seller';
  }
  