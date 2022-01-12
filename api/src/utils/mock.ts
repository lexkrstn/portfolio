export function mockMongooseModel<T>(fixture: T[]) {
  let id = 1;
  return class MockModel {
    constructor(private dto: any) {}

    static find = () => MockModel;

    static exec = async () => fixture;

    static deleteMany = async () => {};

    async save() { return { ...this.dto, _id: id++ }; }
  };
}
