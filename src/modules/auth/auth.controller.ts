import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../../guards/auth.guard';
import { CustomerDto } from '../customer/dto/CustomerDto';
import { CustomerEntity } from '../customer/customer.entity';
import { CustomerService } from '../customer/customer.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { CustomerLoginDto } from './dto/CustomerLoginDto';
import { CustomerRegisterDto } from './dto/CustomerRegisterDto';
import { CustomerUpdateDto } from './dto/CustomerUpdateDto';
import { MessageDto } from 'common/dto/MessageDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly customerService: CustomerService,
        public readonly authService: AuthService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'Customer info with access token',
    })
    async customerLogin(
        @Body() customerLoginDto: CustomerLoginDto,
    ): Promise<LoginPayloadDto> {
        const customerEntity = await this.authService.validateCustomer(
            customerLoginDto,
        );

        const token = await this.authService.createToken(customerEntity);
        return new LoginPayloadDto(customerEntity.toDto(), token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: CustomerRegisterDto,
        description: 'Successfully Registered',
    })
    async customerRegister(
        @Body() customerRegisterDto: CustomerRegisterDto,
    ): Promise<CustomerDto> {
        const createdCustomer = await this.customerService.createCustomer(
            customerRegisterDto,
        );
        return createdCustomer.toDto();
    }

    @Delete('delete/:email')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Customer Has Been Deleted' })
    async deleteCustomer(@Param('email') email: string): Promise<MessageDto> {
        return await this.customerService.deleteCustomer(email);
    }

    @Put('update')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: CustomerUpdateDto,
        description: 'SuccessFully Update Customer',
    })
    async updateCustomer(
        @Body() customerUpdateDto: CustomerUpdateDto,
    ): Promise<CustomerDto> {
        const updateCustomer = await this.customerService.updateCustomer(
            customerUpdateDto,
        );
        return updateCustomer.toDto();
    }
}
