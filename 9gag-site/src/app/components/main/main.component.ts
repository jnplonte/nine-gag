import { Component, Inject, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})

export class MainComponent implements OnInit {
    private siteConfig: Object = {};
    private helperService: any;

    private postUrl: string;
    private postPage: number = 1;
    private postDoneProcess: boolean = true;

    postData: Array<any> = [];

    constructor(@Inject('configService') configService: any, @Inject('helperService') helperService: any) {
        this.siteConfig = configService.data;
        this.helperService = helperService;
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        let windowHeight: number = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        let body: any = document.body, html: any = document.documentElement;
        let docHeight: number = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        let windowBottom: number = windowHeight + window.pageYOffset;

        if ((windowBottom / docHeight) > (70 / 100) && this.postDoneProcess) {
            this.postDoneProcess = false;
            this.getPostData();
        }
    }

    get buildPostUrl() {
        return this.postUrl = this.siteConfig['api']['url'] + '?page=' + this.postPage + '&sort=DESC&key=createdTime'; // hardcoded key for now
    }

    ngOnInit(): void {
        this.getPostData();
    }

    getPostData(): void {
        return this.helperService.getData(this.buildPostUrl).subscribe(data => {
            if (typeof(data) !== 'undefined' && data.length >= 1) {
                this.postPage++;
                this.postDoneProcess = true;
                this.postData = this.postData.concat(data);
            }
        });
    }
}