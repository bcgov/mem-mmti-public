import { ProjectTypeFilterPipe } from './project-type-filter.pipe';

describe('TypeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectTypeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
