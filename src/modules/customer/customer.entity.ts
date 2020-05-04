import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { CustomerDto } from './dto/CustomerDto';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'customers' })
export class CustomerEntity extends AbstractEntity<CustomerDto> {
    @Column({ nullable: true })
    name: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    dob: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true, transformer: new PasswordTransformer() })
    password: string;

    dtoClass = CustomerDto;
}
