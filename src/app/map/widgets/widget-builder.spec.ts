import { TestBed, inject } from '@angular/core/testing';

import { WidgetBuilder } from './widget-builder';

describe('MapWidgetFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetBuilder]
    });
  });

  it('should be created', inject([WidgetBuilder], (service: WidgetBuilder) => {
    expect(service).toBeTruthy();
  }));
});
