import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { PageComponent } from '@app/static-pages/page/page.component';
import { ContentResolver } from './content-resolver';
import { ContentService } from './content-service';

@Injectable()
export class ConfigService {
  // defaults
  private configuration = {};
  public globalContent = null;

  constructor(
    private httpClient: HttpClient,
    public http: HttpClient,
    private router: Router,
    private contentService: ContentService
  ) { }

  get config(): any {
    return this.configuration;
  }

  /**
   * Initialize the Config Service.  Get configuration data from front-end build, or back-end if nginx
   * is configured to pass the /config endpoint to a dynamic service that returns JSON.
   */
  async init() {
    //Dynamically build routes based on pages in the CMS
    const results = await this.contentService.getRoutes();
    const routes: Route[] = [];
    results.forEach( (page) => {
      if(!this.router.config.some((route) => route.path === page.attributes.route)) {
        routes.push({path: page.attributes.route, component: PageComponent, resolve: {pageData: ContentResolver}})
      }
    })
    const newRoutes = [...routes, ...this.router.config];
    this.router.resetConfig(newRoutes);

    //fetch global content
    this.globalContent = await this.contentService.getGlobalContent();
    const application = 'BCMI';
    try {
      // Attempt to get application via this.httpClient. This uses the url of the application that you are running it from
      // This will not work for local because it will try and get localhost:4200/api instead of 3000/api...
      this.configuration = await this.httpClient.get(`api/config/${application}`).toPromise();

      console.log('Configuration:', this.configuration);
      if (this.configuration['debugMode']) {
        console.log('Configuration:', this.configuration);
      }
    } catch (e) {
      console.log('Error getting configuration:', e);
      try {
        // This try is to attempt to get config in your local environment.
        // It will try and do a get on localhost:3000/api/config...
        const res = await this.http.get<any>(`${window['__env']['API_LOCATION']}${window['__env']['API_PATH']}/config/${application}`).toPromise();
        this.configuration = window['__env'];
        this.configuration = { ...this.configuration, ...res };
      } catch (error) {
        // If all else fails, use variables found in env.js of the application calling config service.
        this.configuration = window['__env'];
        console.log('Error getting local configuration:', error);
        if (this.configuration['debugMode']) {
          console.log('Configuration:', this.configuration);
        }
      }
    }
    return Promise.resolve();
  }

  public getNRCEDURL() {
    if (this.configuration['APPLICATION_URLS'] && this.configuration['ENVIRONMENT']) {
      return this.configuration['APPLICATION_URLS']['nrced'][this.configuration['ENVIRONMENT']];
    }
    return this.configuration['NRCED_LOCATION'];
  }

  public createConfigData(configData, application, pathAPI: string) {
    return this.httpClient.post(`${pathAPI}/config/${application}`, configData, {});
  }

  public editConfigData(configData, configId, application, pathAPI: string) {
    return this.httpClient.put(`${pathAPI}/config/${application}/${configId}`, configData, {});
  }
}
