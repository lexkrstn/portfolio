import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from './parse-object-id.pipe';

describe('ParseObjectIdPipe.transform()', () => {
  let pipe: ParseObjectIdPipe;

  beforeEach(() => {
    pipe = new ParseObjectIdPipe();
  });

  it('should return a valid ObjectId for valid values', () => {
    expect(pipe.transform('61de413236f11cd33f928cb1')).toBeInstanceOf(ObjectId);
  });

  it('should throw an error if the value is not valid', () => {
    expect(() => pipe.transform('123')).toThrow(BadRequestException);
  });
});
