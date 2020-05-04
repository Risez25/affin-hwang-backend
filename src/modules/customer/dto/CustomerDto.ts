'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CustomerEntity } from '../customer.entity';

export class CustomerDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    dob: string;

    @ApiPropertyOptional()
    address: string;

    @ApiPropertyOptional()
    phone: string;

    constructor(customer: CustomerEntity) {
        super(customer);
        this.name = customer.name;
        this.email = customer.email;
        this.dob = customer.dob;
        this.address = customer.address;
        this.phone = customer.phone;
    }
}
