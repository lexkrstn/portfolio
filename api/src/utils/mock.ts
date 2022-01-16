import { ObjectId } from 'mongodb';
import { padStart } from 'lodash';

let lastObjectId = 0;

/**
 * Generates a Mongo ObjectId.
 */
export function mockObjectId() {
  return new ObjectId(padStart((++lastObjectId).toString(16), 24, '0'));
}

export function mockMongooseModel<T>(fixture: T[]) {
  let many = true;
  return class MockModel {
    constructor(private dto: any) {}

    static find = () => {
      many = true;
      return MockModel;
    };

    static findById = () => {
      many = false;
      return MockModel;
    };

    static exec = async () => many ? fixture : fixture[0];

    static deleteMany = async () => {};

    async save() { return { ...this.dto, _id: mockObjectId() }; }
  };
}
