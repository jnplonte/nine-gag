import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HelperService {
    private dataObservers: Array<any> = [];

    constructor (private http: Http) {

    }

    formatNumber(value?: string, pattern: string = ',') {
        if (value) {
            return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + pattern);
        } else {
            return '';
        }
    }

    formatMention(text: string = '') {
        if (text) {
            // replace #hashtags
            let replacePattern1: RegExp = /#([^\s#]+)/g;
            text = text.replace(replacePattern1, '<a class="insta-link" target="_blank" href="https://www.instagram.com/explore/tags/$1">#$1</a>');

            // replace @mentions
            let replacePattern2: RegExp = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            text = text.replace(replacePattern2, '$1<a class="insta-link" target="_blank" href="https://www.instagram.com/$2">@$2</a>');
        }

        return text;
    }

    toJson(jsonData: any) {
        let response: any = '';
        try {
            response = JSON.parse(jsonData);
        } catch (e) {
            response = jsonData;
        }
        return response;
    }

    toString(jsonData: any) {
        let response: any = '';
        if (typeof(jsonData) === 'object') {
            try {
              response = JSON.stringify(jsonData);
            } catch (e) {
              response = jsonData;
            }
        } else {
            response = jsonData;
        }
        return response;
    }

    createStorage(name: string, value: any, param: string = 'local') {
      let returnValue: boolean = false;
      if (localStorage) {
          value = this.toString(value);
          switch (param) {
              case 'local':
                  localStorage.setItem(name, value);
                  break;
              case 'session':
                  sessionStorage.setItem(name, value);
                  break;
              default:
                  localStorage.setItem(name, value);
          }
          returnValue = true;
      }

      return returnValue;
    }

    readStorage(name: string, param: string = 'local') {
        let returnValue: any = '';
        if (localStorage) {
            switch (param) {
                case 'local':
                    returnValue = localStorage.getItem(name);
                    break;
                case 'session':
                    returnValue = sessionStorage.getItem(name);
                    break;
                default:
                    returnValue = localStorage.getItem(name);
            }
        } else {
            returnValue = '';
        }
        return this.toJson(returnValue);
    }

    eraseStorage(name: string, param: string = 'local') {
        let returnValue: boolean = false;
        if (localStorage) {
            switch (param) {
                case 'local':
                    localStorage.removeItem(name);
                break;
                case 'session':
                    sessionStorage.removeItem(name);
                break;
                default:
                    localStorage.removeItem(name);
            }
            returnValue = true;
        }

        return returnValue;
    }

    clearStorage(param: string = 'local') {
        let returnValue: boolean = false;
        if (localStorage) {
            switch (param) {
                case 'local':
                    localStorage.clear();
                break;
                case 'session':
                    sessionStorage.clear();
                break;
                default:
                    localStorage.clear(); sessionStorage.clear();
            }
            returnValue = true;
        }

        return returnValue;
    }

    getData(url: string) {
        if (typeof(this.dataObservers[url]) !== 'undefined') {
            return this.dataObservers[url];
        } else {
            let headers: any = new Headers();
            headers.append('Content-Type', 'application/json');

            let observable: Observable<any> = this.http.get(url, {
            headers: headers
            })
            .map((response: Response) =>  {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return {};
                }
            }).share();

            return this.dataObservers[url] = observable;
        }
    }

    putData(url: string, data: Object = {}) {
        let headers: any = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(url, JSON.stringify(data), {headers: headers}).map((response: Response) => response.json());
    }
}
