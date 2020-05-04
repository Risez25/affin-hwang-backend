import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { CustomerDto } from './CustomerDto';

export class CustomersPageDto {
    @ApiProperty({
        type: CustomerDto,
        isArray: true,
    })
    readonly data: CustomerDto[];

    constructor(data: CustomerDto[]) {
        this.data = data;
    }
}
