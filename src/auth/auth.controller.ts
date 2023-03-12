import {
  Controller,
  Session,
  Body,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRout } from './decorators';
import { AuthDto } from './dto';
import { UserSession } from './types';

@PublicRout()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AuthDto, @Session() session: UserSession) {
    const { id, email } = await this.authService.signUp(dto);
    this.serializeSession(id, email, session);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: AuthDto, @Session() session: UserSession) {
    const { id, email } = await this.authService.signIn(dto);
    this.serializeSession(id, email, session);
  }

  private serializeSession(id: number, email: string, session: UserSession) {
    session.user = {
      id,
      email,
    };
  }
}
