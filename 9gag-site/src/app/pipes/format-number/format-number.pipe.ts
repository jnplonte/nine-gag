import { Pipe, PipeTransform, Inject } from '@angular/core';

@Pipe({
    name: 'formatNumber'
})

export class formatNumberPipe implements PipeTransform {
    private helperService: any;

    constructor(@Inject('helperService') helperService: any) {
        this.helperService = helperService;
    }

    transform(numberVal?: string, numberPattern: string = ','): string {
        return this.helperService.formatNumber(numberVal, numberPattern) || '';
    }
}
