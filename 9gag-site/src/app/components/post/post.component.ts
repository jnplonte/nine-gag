import { Component, Input, Inject } from '@angular/core';

import timeago from 'timeago.js';

@Component({
    selector: 'post-component',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})

export class PostComponent {
    @Input() postData: Object;

    private siteConfig: Object = {};
    private helperService: any;

    private putUrl: string;

    constructor(@Inject('configService') configService: any, @Inject('helperService') helperService: any) {
        this.siteConfig = configService.data;
        this.helperService = helperService;
    }

    get timeAgo(){
        return timeago().format(this.postData['createdTime'] * 1000 || new Date());
    }

    onSaveFeatured(iId: string, event: any): void {
        this.putUrl = this.siteConfig['api']['url'] + '/' + iId;

        return this.helperService.putData(this.putUrl, {'featured': 1}).subscribe(data => {
            if (typeof(data[0]) !== 'undefined' && data[0].affected_rows >= 1) {
                event.srcElement.remove();
                return true;
            } else {
                return false;
            }
        });
    }
}
