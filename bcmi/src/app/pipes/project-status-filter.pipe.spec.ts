import { ProjectStatusFilterPipe } from '@pipes/project-status-filter.pipe';
import { Project } from '@models/project';

describe('ProjectStatusFilterPipe', () => {

  const string = 'In Progress';
  let value: Project[];
  let expectedResponse: Project[];

  const pipe = new ProjectStatusFilterPipe();

  describe('given no filter string', () => {
    it('returns items in same order as given', () => {
      value = [new Project()];
      expectedResponse = [new Project()];

      expect(pipe.transform(value, null).length).toBe(expectedResponse.length);
    });
    it('returns items in same order as given', () => {
      value = [
        new Project(),
        new Project(),
        new Project(),
        new Project()
      ];
      expectedResponse = [
        new Project(),
        new Project(),
        new Project(),
        new Project()
      ];

      expect(pipe.transform(value, null).length).toBe(expectedResponse.length);
    });
  });
  describe('given a valid response', () => {
    it('returns 1 item', () => {
      value = [new Project({status: 'In Progress'})];
      expectedResponse = [new Project({status: 'In Progress'})];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns n items', () => {
      value = [
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'})
      ];
      expectedResponse = [
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'})
      ];

      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
  });
  describe('given a mix of different statuss', () => {
    beforeEach(() => {
      value = [
        new Project({status: 'In Progress'}),
        new Project({status: 'Certificate Not Required'}),
        new Project({status: 'In Progress'}),
        new Project({status: 'Certificate Not Required'})
      ];
      expectedResponse = [
        new Project({status: 'In Progress'}),
        new Project({status: 'In Progress'}),
      ];
    });
    it('returns two items', () => {
      expect(pipe.transform(value, string).length).toBe(expectedResponse.length);
    });
    it('returns Project with same status value as value passed in', () => {
      expect(JSON.stringify(pipe.transform(value, string)[0].status))
        .toBe(JSON.stringify(expectedResponse[0].status));
      expect(JSON.stringify(pipe.transform(value, string)[1].status))
      .toBe(JSON.stringify(expectedResponse[1].status));
    });
  });
});
