import { Pipe, PipeTransform, Inject } from '@angular/core';

@Pipe({
    name: 'formatMention'
})

export class formatMentionPipe implements PipeTransform {
    private helperService: any;

    constructor(@Inject('helperService') helperService: any) {
        this.helperService = helperService;
    }

    transform(text?: string): string {
        return this.helperService.formatMention(text) || '';
    }
}
