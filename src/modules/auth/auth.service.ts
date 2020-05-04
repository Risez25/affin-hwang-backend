import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomerNotFoundException } from '../../exceptions/customer-not-found.exception';
import { ContextService } from '../../providers/context.service';
import { UtilsService } from '../../providers/utils.service';
import { ConfigService } from '../../shared/services/config.service';
import { CustomerDto } from '../customer/dto/CustomerDto';
import { CustomerEntity } from '../customer/customer.entity';
import { CustomerService } from '../customer/customer.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { CustomerLoginDto } from './dto/CustomerLoginDto';

@Injectable()
export class AuthService {
    private static _authCustomerKey = 'customer_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly customerService: CustomerService,
    ) {}

    async createToken(customer: CustomerEntity | CustomerDto): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: 36000,
            accessToken: await this.jwtService.signAsync({ id: customer.id }),
        });
    }

    async validateCustomer(customerLoginDto: CustomerLoginDto): Promise<CustomerEntity> {
        const customer = await this.customerService.findOne({
            email: customerLoginDto.email,
        });
        const isPasswordValid = await UtilsService.validateHash(
            customerLoginDto.password,
            customer && customer.password,
        );
        if (!customer || !isPasswordValid) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }

    static setAuthCustomer(customer: CustomerEntity) {
        ContextService.set(AuthService._authCustomerKey, customer);
    }

    static getAuthCustomer(): CustomerEntity {
        return ContextService.get(AuthService._authCustomerKey);
    }
}
