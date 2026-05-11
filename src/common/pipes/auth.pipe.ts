import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: Record<string, string>) {
    if (!value || !value['authorization']) {
      throw new UnauthorizedException('Authorization header is required');
    }
    return value;
  }
}
