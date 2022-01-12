import { omitUnderscoredProps } from './helpers';

describe('helpers', () => {
  describe('omitUnderscoredProps', () => {
    it('should remove underscored props from the object', () => {
      expect(omitUnderscoredProps({ a: 1, _b: 2, c: 3 })).toEqual({ a: 1, c: 3 });
    });

    it('should remove underscored props from the array', () => {
      expect(omitUnderscoredProps([{ a: 1, _b: 2 }])).toEqual([{ a: 1 }]);
    });

    it('should remove underscored props from nested object', () => {
      expect(omitUnderscoredProps({ d: { a: 1, _b: 2 }, _e: 4 }))
        .toEqual({ d: { a: 1 } });
      expect(omitUnderscoredProps([{ d: [{ a: 1, _b: 2 }], _e: 4 }]))
        .toEqual([{ d: [{ a: 1 }] }]);
    });
  });
});
