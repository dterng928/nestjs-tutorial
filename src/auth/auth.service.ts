import { ForbiddenException, Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto) {
    // check if user exists throw exception
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (userExists) throw new ForbiddenException('Credentials incorrect');

    // hash the password
    const hashedPassword = await hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashedPassword,
      },
    });
    // store the user in the database
    return { id: user.id, email: user.email };
  }

  async signIn(dto: AuthDto) {
    // get the user by email
    const userFound = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!userFound) throw new ForbiddenException('Credentials incorrect');

    //verify hashed password
    const passwordMatches = await verify(userFound.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    // return user information
    return { id: userFound.id, email: userFound.email };
  }
}
