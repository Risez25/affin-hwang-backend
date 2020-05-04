import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from '../modules/auth/auth.service';
import { CustomerEntity } from '../modules/customer/customer.entity';

@Injectable()
export class AuthCustomerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const customer = <CustomerEntity>request.customer;
        AuthService.setAuthCustomer(customer);

        return next.handle();
    }
}
