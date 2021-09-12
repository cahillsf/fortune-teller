import { Component, OnInit} from '@angular/core';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fortune-teller-ng';
  constructor(){}

  ngOnInit(): void{
    datadogRum.addRumGlobalContext('hey there', 'value here');
    datadogRum.init({
      applicationId: environment.ddAppId,
      clientToken: environment.ddClientToken,
      site: 'datadoghq.com',
      service:'fortune-teller',
      // Specify a version number to identify the deployed version of your application in Datadog 
      version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true,
      allowedTracingOrigins:["http://localhost:8080"]
    });
    datadogLogs.init({
      clientToken: environment.ddClientToken,
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
      env: 'testing'
    });
    datadogLogs.addLoggerGlobalContext('anotherAttribute', 'hereiam')
  }

}
