import { Component, Inject} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent  {
  private config: any;
  constructor(@Inject('configService') configService: any) {
    this.config = configService.data;
  }
}
