import { inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import {formatMentionPipe} from './format-mention.pipe';

import { HelperService } from './../../services/helper/helper.service';

describe('Pipe: formatMention', () => {
    let pipe: formatMentionPipe;
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

    beforeEach(() => {
        pipe = new formatMentionPipe(service);
    });

    it('should check if the formatMention works', () => {
        expect(pipe.transform('test @gag #gag')).toContain('www.instagram.com');
    });
});
