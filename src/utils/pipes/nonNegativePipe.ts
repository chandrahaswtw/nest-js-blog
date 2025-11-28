import { PipeTransform, BadRequestException } from '@nestjs/common';

export class NonNegativeIntPipe implements PipeTransform {
  constructor(private readonly fieldName?: string) {}

  transform(value: number) {
    if (value <= 0) {
      throw new BadRequestException(
        `${this.fieldName} cannot be negative or zero: ${value}`,
      );
    }
    return value;
  }
}
