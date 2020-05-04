import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthCustomer = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.customer;
    },
);
