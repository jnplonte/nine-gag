import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MainComponent } from './components/main/main.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { PostComponent } from './components/post/post.component';

import { ConfigService } from './services/config/config.service';
import { HelperService } from './services/helper/helper.service';

import {formatNumberPipe}  from './pipes/format-number/format-number.pipe';
import {formatMentionPipe}  from './pipes/format-mention/format-mention.pipe';

const appRoutes: Routes = [
  { path: '',
    component: MainComponent
  },
  { path: 'featured',
    component: FeaturedComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  JsonpModule,
                  RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, MainComponent, FeaturedComponent, PageNotFoundComponent, PostComponent,
                  formatNumberPipe, formatMentionPipe ],
  providers:    [ {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'helperService', useClass: HelperService} ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
