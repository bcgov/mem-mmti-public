import { RemoveStringValuePipe } from 'app/pipes/remove-string-value.pipe';

describe('RemoveStringValuePipe', () => {

  const toReplace = ' Amendment';
  let value: string;
  let expectedResponse: string;

  const pipe = new RemoveStringValuePipe();

  describe('given input with string value match', () => {
    it('returns expected output', () => {
      value = 'Permit Amendment Amended';
      expectedResponse = 'Permit Amended';

      expect(pipe.transform(value, toReplace)).toBe(expectedResponse);
    });
  });

  describe('given input with no string value match', () => {
    it('returns expected output', () => {
      value = 'Permit Amended';
      expectedResponse = 'Permit Amended';

      expect(pipe.transform(value, toReplace)).toBe(expectedResponse);
    });
  });
});
