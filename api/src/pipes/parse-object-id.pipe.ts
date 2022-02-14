import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isString } from 'lodash';
import { isObjectId } from '../utils';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any) { // eslint-disable-line class-methods-use-this
    if (!isString(value) || !isObjectId(value)) {
      throw new BadRequestException('Not an mongo ObjectId');
    }
    return new ObjectId(value);
  }
}
