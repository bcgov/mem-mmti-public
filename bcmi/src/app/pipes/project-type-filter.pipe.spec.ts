import { ProjectTypeFilterPipe } from '@pipes/project-type-filter.pipe';
import { Project } from '@models/project';

describe('ProjectTypeFilterPipe', () => {

  const string = 'Energy-Electricity';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new ProjectTypeFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({type: 'Energy-Electricity'})];
      expectedResponse = [new Project({type: 'Energy-Electricity'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'})
      ];
      expectedResponse = [
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different types', () => {
    beforeEach(() => {
      value = [
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Industrial'}),
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Industrial'})
      ];
      expectedResponse = [
        new Project({type: 'Energy-Electricity'}),
        new Project({type: 'Energy-Electricity'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same type value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].type))
        .toBe(JSON.stringify(expectedResponse[0].type));
      expect(JSON.stringify(pipe.transform(value, string)[1].type))
      .toBe(JSON.stringify(expectedResponse[1].type));
    });
  });
});
