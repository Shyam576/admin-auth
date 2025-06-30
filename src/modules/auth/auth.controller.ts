import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth } from '../../decorators/http.decorators.ts';
// import { ApiFile } from '../../decorators/swagger.schema.ts';
// import type { IFile } from '../../interfaces/IFile.ts';
// import type { Reference } from '../../types.ts';
import { UserDto } from '../user/dtos/user.dto.ts';
import { UserEntity } from '../user/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import { AuthService } from './auth.service.ts';
import { UserLoginDto } from './dto/user-login.dto.ts';
import { UserRegisterDto } from './dto/user-register.dto.ts';
import { LogoutResponseDto } from './dto/logout-response.dto.ts';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and set HTTP-only cookie. The access token is automatically stored in a secure HTTP-only cookie.',
  })
  @ApiOkResponse({
    type: UserDto,
    description: 'User info with access token stored in HTTP-only cookie',
    headers: {
      'Set-Cookie': {
        description: 'HTTP-only cookie containing the JWT access token',
        schema: {
          type: 'string',
          example: 'access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Path=/',
        },
      },
    },
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity?.role?.name,
      allowedMenus: userEntity?.role?.allowedMenus,
    });

    // Set HTTP-only cookie
    this.authService.setAccessTokenCookie(res, token);

    return userEntity.toDto();
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User logout',
    description: 'Clear the HTTP-only authentication cookie and log out the user.',
  })
  @ApiOkResponse({ 
    type: LogoutResponseDto,
    description: 'Successfully logged out - authentication cookie cleared',
    headers: {
      'Set-Cookie': {
        description: 'Clears the access token cookie',
        schema: {
          type: 'string',
          example: 'access_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
        },
      },
    },
  })
  async userLogout(@Res({ passthrough: true }) res: Response): Promise<LogoutResponseDto> {
    // Clear HTTP-only cookie
    this.authService.clearAccessTokenCookie(res);
    
    return new LogoutResponseDto('Successfully logged out');
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user account.',
  })
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  // @ApiFile({ name: 'avatar' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    // @UploadedFile() file?: Reference<IFile>,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(
      userRegisterDto,
      // file,
    );

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOperation({
    summary: 'Get current user',
    description: 'Get information about the currently authenticated user. Authentication is handled via HTTP-only cookies.',
  })
  @ApiOkResponse({ type: UserDto, description: 'Current user information' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - No valid authentication cookie found',
  })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
