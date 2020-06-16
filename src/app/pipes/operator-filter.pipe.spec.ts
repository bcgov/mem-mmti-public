import { OperatorFilterPipe } from 'app/pipes/operator-filter.pipe';
import { Project } from 'app/models/project';

describe('OperatorFilterPipe', () => {

  const string = 'Energy-Electricity';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new OperatorFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({proponent: {name: 'Energy-Electricity'}})];
      expectedResponse = [new Project({proponent: {name: 'Energy-Electricity'}})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}})
      ];
      expectedResponse = [
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different types', () => {
    beforeEach(() => {
      value = [
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Industrial'}}),
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Industrial'}})
      ];
      expectedResponse = [
        new Project({proponent: {name: 'Energy-Electricity'}}),
        new Project({proponent: {name: 'Energy-Electricity'}})
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same type value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].operator))
        .toBe(JSON.stringify(expectedResponse[0].operator));
      expect(JSON.stringify(pipe.transform(value, string)[1].operator))
      .toBe(JSON.stringify(expectedResponse[1].operator));
    });
  });
});
