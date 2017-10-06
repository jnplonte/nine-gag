import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private static cache: any = null;

  constructor(private data: any) { }

  public static loadInstance(jsonFile: string) {
      return new Promise((resolve, reject) => {
          let xobj: any = new XMLHttpRequest();
          xobj.overrideMimeType('application/json');
          xobj.open('GET', jsonFile, true);
          xobj.onreadystatechange = () => {
              if (xobj.readyState === 4) {
                  if (xobj.status === 200) {
                      this.cache = new ConfigService(JSON.parse(xobj.responseText));
                      resolve();
                  } else {
                      reject(`Could not load file '${jsonFile}': ${xobj.status}`);
                  }
              }
          }
          xobj.send(null);
      });
  }

  public static getInstance() {
    if (this.cache) {
      return this.cache;
    } else {
      return {};
    }
  }
}
