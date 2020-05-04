'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { CustomerDto } from '../../customer/dto/CustomerDto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
    @ApiProperty({ type: CustomerDto })
    customer: CustomerDto;
    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(customer: CustomerDto, token: TokenPayloadDto) {
        this.customer = customer;
        this.token = token;
    }
}
