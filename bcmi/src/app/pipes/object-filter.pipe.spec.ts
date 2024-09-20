import { ObjectFilterPipe } from '@pipes/object-filter.pipe';
import { Project } from '@models/project';

describe('ObjectFilterPipe', () => {

  const string = 'Test';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new ObjectFilterPipe();

  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({name: 'Test'})];
      expectedResponse = [new Project({name: 'Test'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({name: 'Test'}),
        new Project({name: 'Test'}),
        new Project({name: 'Test'}),
        new Project({name: 'Test'})
      ];
      expectedResponse = [
        new Project({name: 'Test'}),
        new Project({name: 'Test'}),
        new Project({name: 'Test'}),
        new Project({name: 'Test'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different names', () => {
    beforeEach(() => {
      value = [
        new Project({name: 'Project Test'}),
        new Project({name: 'Public Comment Period'}),
        new Project({name: 'Test'}),
        new Project({name: 'Public Comment Period'})
      ];
      expectedResponse = [
        new Project({name: 'Project Test'}),
        new Project({name: 'Test'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same name value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].name))
        .toBe(JSON.stringify(expectedResponse[0].name));
      expect(JSON.stringify(pipe.transform(value, string)[1].name))
      .toBe(JSON.stringify(expectedResponse[1].name));
    });
  });
});
