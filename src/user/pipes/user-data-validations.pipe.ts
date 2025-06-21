import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class RegistrationDataValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: Record<string, any>) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(
        `Validation failed: ${error.message.replace(/(\"|\[|\d\])/g, '')}`,
      );
    }
    // If validation passes, return the value
    return value;
  }
}
