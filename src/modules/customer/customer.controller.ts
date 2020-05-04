'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { CustomersPageDto } from './dto/CustomersPageDto';
import { CustomersPageOptionsDto } from './dto/CustomersPageOptionsDto';
import { CustomerEntity } from './customer.entity';
import { CustomerService } from './customer.service';
import { AuthCustomerInterceptor } from 'interceptors/auth-customer-interceptor.service';


@Controller('customer')
@ApiTags('customer')
@UseGuards(AuthGuard)
@UseInterceptors(AuthCustomerInterceptor)
@ApiBearerAuth()
export class CustomerController {
    constructor(private _customerService: CustomerService) {}

    @Get('customer')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get customer list',
        type: CustomersPageDto,
    })
    getCustomers(): Promise<CustomersPageDto> {
        return this._customerService.getCustomers();
    }
}
