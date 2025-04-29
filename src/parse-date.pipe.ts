import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata --------- ', metadata);
    const date = this.convertTimestamp(value);
    if (!date || isNaN(+date)) {
      throw new BadRequestException('Invalid date');
    }
    return date;
  }

  private convertTimestamp(timestamp: string | number) {
    timestamp = +timestamp;
    console.log('This is from pipe ----- ', timestamp);
    const isSecond = !(timestamp > (Date.now() + 26 * 60 * 60 * 1000) / 1000);
    return isSecond ? new Date(timestamp * 1000) : new Date(timestamp);
  }
}
