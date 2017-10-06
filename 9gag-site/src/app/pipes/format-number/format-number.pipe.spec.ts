import { inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import {formatNumberPipe} from './format-number.pipe';

import { HelperService } from './../../services/helper/helper.service';

describe('Pipe: formatNumber', () => {
    let pipe: formatNumberPipe;
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
        pipe = new formatNumberPipe(service);
    });

    it('should check if the formatNumber works', () => {
        expect(pipe.transform('12345', ',')).toMatch('12,345');
    });
});
