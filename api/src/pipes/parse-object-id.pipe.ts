import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isString } from 'lodash';

const ID_REGEX = /^[0-9a-zA-Z]{24}$/;

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  constructor() {}

  transform(value: any) {
    if (!isString(value) || !ID_REGEX.test(value)) {
      throw new BadRequestException('Not an mongo ObjectId');
    }
    return new ObjectId(value);
  }
}
