import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import { validateHash } from '../../common/utils.ts';
import { TokenType } from '../../constants/token-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { UserEntity } from '../user/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import type { UserLoginDto } from './dto/user-login.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: {
    role?: string;
    userId: Uuid;
    allowedMenus?: string[];
  }): Promise<string> {
    return await this.jwtService.signAsync({
      userId: data.userId,
      type: TokenType.ACCESS_TOKEN,
      role: data.role,
      allowedMenus: data.allowedMenus,
    });
  }

  setAccessTokenCookie(res: Response, token: string): void {
    const cookieConfig = this.configService.cookieConfig;
    
    res.cookie('access_token', token, {
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      maxAge: cookieConfig.maxAge,
      domain: cookieConfig.domain,
      path: cookieConfig.path,
    });
  }

  clearAccessTokenCookie(res: Response): void {
    const cookieConfig = this.configService.cookieConfig;
    
    res.clearCookie('access_token', {
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      domain: cookieConfig.domain,
      path: cookieConfig.path,
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({where:{
      email: userLoginDto.email,
    },relations:['role']});

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }
}
