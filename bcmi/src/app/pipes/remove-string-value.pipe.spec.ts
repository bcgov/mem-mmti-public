import { RemoveStringValuePipe } from '@pipes/remove-string-value.pipe';

describe('RemoveStringValuePipe', () => {

  let value: string;
  let expectedResponse: string;

  const pipe = new RemoveStringValuePipe();

  describe('given input with string value match', () => {
    it('returns expected output', () => {
      value = 'Permit Amendment Amended';
      expectedResponse = 'Permit Amended';

      expect(pipe.transform(value, ' Amendment')).toBe(expectedResponse);
    });
  });

  describe('given input with duplicate string value match first instance', () => {
    it('returns expected output', () => {
      value = 'Amalgamated Permit Amalgamated';
      expectedResponse = 'Permit Amalgamated';

      expect(pipe.transform(value, 'Amalgamated')).toBe(expectedResponse);
    });
  });

  describe('given input with no string value match', () => {
    it('returns expected output', () => {
      value = 'Permit Amended';
      expectedResponse = 'Permit Amended';

      expect(pipe.transform(value, ' Amendment')).toBe(expectedResponse);
    });
  });
});
