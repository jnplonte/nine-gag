import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, JsonpModule } from '@angular/http';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostComponent } from './post.component';
import {formatMentionPipe} from './../../pipes/format-mention/format-mention.pipe';
import {formatNumberPipe} from './../../pipes/format-number/format-number.pipe';

import { ConfigService } from './../../services/config/config.service';
import { HelperService } from './../../services/helper/helper.service';

describe('Component: PostComponent', function () {
  let el: HTMLElement;
  let de: DebugElement;
  let comp: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    ConfigService.loadInstance('./base/site/test-config.json').then(() => {
      TestBed.configureTestingModule({
        declarations: [
          PostComponent,
          formatMentionPipe, formatNumberPipe
        ],
        providers: [
          {provide: 'configService', useFactory: () => ConfigService.getInstance()},
          {provide: 'helperService', useClass: HelperService} ],
        imports: [ RouterTestingModule, HttpModule ]
      })
      .compileComponents();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should have expected thumbnail div', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.thumbnail'));
    expect(de.nativeElement).toBeDefined();
  });
});
