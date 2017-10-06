import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { ConfigService } from './services/config/config.service';

describe('Component: AppComponent', function () {
  let el: HTMLElement;
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    ConfigService.loadInstance('./base/site/test-config.json').then(() => {
      TestBed.configureTestingModule({
        declarations: [
            AppComponent
        ],
        providers: [ {provide: 'configService', useFactory: () => ConfigService.getInstance()} ],
        imports: [ RouterTestingModule ]
      })
      .compileComponents();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });
});
