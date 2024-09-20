import { OperatorFilterPipe } from '@pipes/operator-filter.pipe';
import { Project } from '@models/project';

describe('OperatorFilterPipe', () => {

  const string = 'Energy-Electricity';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new OperatorFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({permittee: 'Energy-Electricity'})];
      expectedResponse = [new Project({permittee: 'Energy-Electricity'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'})
      ];
      expectedResponse = [
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different types', () => {
    beforeEach(() => {
      value = [
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Industrial'}),
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Industrial'})
      ];
      expectedResponse = [
        new Project({permittee: 'Energy-Electricity'}),
        new Project({permittee: 'Energy-Electricity'})
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same type value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].permittee))
        .toBe(JSON.stringify(expectedResponse[0].permittee));
      expect(JSON.stringify(pipe.transform(value, string)[1].permittee))
      .toBe(JSON.stringify(expectedResponse[1].permittee));
    });
  });
});
