'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { Column } from 'typeorm';

export class CustomerUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly dob: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string;
}
