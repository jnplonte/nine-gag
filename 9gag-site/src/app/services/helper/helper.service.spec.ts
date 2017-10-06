import { inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { HelperService } from './helper.service';

describe('Service: HelperService', function () {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ HelperService ]
    });
  });

  beforeEach(inject([HelperService], s => {
    service = s;
  }));

  it('should check if the helper service is define', () => {
    expect(service).toBeDefined();
  });

  it('should check if the helper formatNumber is define', () => {
    expect(service.formatNumber).toBeDefined();
    expect(service.formatNumber('12345')).toMatch('12,345');
  });

  it('should check if the helper formatMention is define', () => {
    expect(service.formatMention).toBeDefined();
    expect(service.formatMention('test @gag #gag')).toContain('www.instagram.com');
  });
});
