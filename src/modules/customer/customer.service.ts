import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { IFile } from '../../interfaces/IFile';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { CustomerRegisterDto } from '../auth/dto/CustomerRegisterDto';
import { CustomersPageDto } from './dto/CustomersPageDto';
import { CustomersPageOptionsDto } from './dto/CustomersPageOptionsDto';
import { CustomerEntity } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerUpdateDto } from 'modules/auth/dto/CustomerUpdateDto';
import { MessageDto } from '../../common/dto/MessageDto';

@Injectable()
export class CustomerService {
    constructor(
        public readonly customerRepository: CustomerRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single customer
     */
    findOne(findData: FindConditions<CustomerEntity>): Promise<CustomerEntity> {
        return this.customerRepository.findOne(findData);
    }

    async createCustomer(
        customerRegisterDto: CustomerRegisterDto,
    ): Promise<CustomerEntity> {
        const customer = this.customerRepository.create({
            ...customerRegisterDto,
        });

        return this.customerRepository.save(customer);
    }

    async getCustomers(): Promise<CustomersPageDto> {
        const customers = await this.customerRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });

        return new CustomersPageDto(customers.toDtos());
    }

    async deleteCustomer(email: string): Promise<MessageDto> {
        await this.customerRepository
            .createQueryBuilder()
            .delete()
            .from(CustomerEntity)
            .where('email = :email', { email: email })
            .execute();
        return new MessageDto('Successfully delte customer');
    }

    async updateCustomer(
        customerUpdateDto: CustomerUpdateDto,
    ): Promise<CustomerEntity> {
        let updateCustomer = await this.customerRepository.findOne({
            email: customerUpdateDto.email,
        });
        updateCustomer.name = customerUpdateDto.name;
        updateCustomer.email = customerUpdateDto.email;
        updateCustomer.dob = customerUpdateDto.dob;
        updateCustomer.address = customerUpdateDto.address;
        updateCustomer.phone = customerUpdateDto.phone;
        return this.customerRepository.save(updateCustomer);
    }
}
