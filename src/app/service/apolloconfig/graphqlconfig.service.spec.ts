import { TestBed } from '@angular/core/testing';

import { GraphqlconfigService } from './graphqlconfig.service';

describe('GraphqlconfigService', () => {
  let service: GraphqlconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
