import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener} from '@angular/core';
import {cloudCss} from './interfaces/cloudCss';
import {Point} from './interfaces/point';
import { Observable, Subscriber } from 'rxjs';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'fortune-teller-ng';
  //@ViewChild('quoteCloud') cloud;
  
  @ViewChild('canvasEl', { static: true }) 
  canvasEl:ElementRef<HTMLCanvasElement>;

  @ViewChild('quoteText')
  quoteText:ElementRef;

  @ViewChild('mainGrid')
  mainGrid:ElementRef;
  
  
  private ctx: CanvasRenderingContext2D;
  public startProps= {
      'position': 'fixed',
      'top':'30vh',
      'right':'30vw',
      'display':'none'
   };

   public gridProps= {
    'position': 'relative',
    'top': '60px',
    'display': 'grid',
    // 'grid-template-columns': 'repeat(3, 1fr)'
    'grid-template-columns': '1fr'
  };
  
   public cloudProps: cloudCss;
   public updatedProps: cloudCss;
   public focalPoint: Point;
   public pointsList: Array<Point>;
   public topicQueue: Array<String>;
   public gridRow: number;
   public topicObservable;
   public isConsuming:boolean;
                     
  constructor(private httpClient: HttpClient){
    //this.updatedProps = Object.assign({}, this.startProps);
    datadogRum.addRumGlobalContext('hey there', 'value here');
    this.cloudProps = Object.assign({}, this.startProps);
    this.gridProps['grid-template-rows'] =  + (document.documentElement.clientHeight - 60) + "px";
    datadogRum.init({
      applicationId: 'bf97d17c-15d9-43f7-9058-2929c414755a',
      clientToken: 'pubecd1d4823887980a4a7c96a476ac55f1',
      site: 'datadoghq.com',
      service:'fortune-teller',
      // Specify a version number to identify the deployed version of your application in Datadog 
      // version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true
    });
    datadogLogs.init({
      clientToken: 'pubecd1d4823887980a4a7c96a476ac55f1',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
      env: 'testing'
    });
    datadogLogs.addLoggerGlobalContext('anotherAttribute', 'hereiam')

  }


  ngOnInit(): void{
    this.initializeCanvas();
    this.isConsuming = false;
    this.topicQueue = new Array<String>();
  }
  ngAfterViewInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //console.log("resize here");
    event.target.innerWidth;
    this.gridProps['grid-template-rows'] =  + (document.documentElement.clientHeight - 60) + "px";
    this.initializeCanvas();
  }

  //contains all the code to initialize the canvas element: 
  initializeCanvas(){
    //sizes the canvas to be everything on the page beneath the toolbar
    this.canvasEl.nativeElement.width = window.innerWidth;
    this.canvasEl.nativeElement.height = window.innerHeight - 60;

    //sets the ctx property of the class to the 2d context of the canvas element
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
    //sets the focal point of the purple bands behind zoltbits
    this.focalPoint = {xPosition:window.innerWidth * 0.5, yPosition: (window.innerHeight-60) * 0.5}
    //creates the list of the 3 different band positions to base the animation on
    this.pointsList= [{xPosition:2, yPosition: 0},{xPosition:0, yPosition: 2},{xPosition:1, yPosition: 1}]
    //sets the purple bands to their deault position
    this.animate(1, 1);

  }

  //function to handle the click event from each topic button
  initializeCloudAction(event){
    //push the new topic onto the topicQueue array
    this.topicQueue.push(event.currentTarget.innerHTML)
    //check if consumer function is already initialized
    if(!this.isConsuming){
      this.consume();
    }
  }

  consume(){
    //consume function calls itself recursively in the timeout block so long as there are more
    //topics in the topicQueue array to be consume
    this.isConsuming = true;
    if(this.topicQueue.length > 0){
      //initializes backend server call and cloud actions to display the next topic
      this.getFortune(this.topicQueue.shift());
      this.moveCloud();
      //timeout matches the timing of the cloud actions
      setTimeout(() => {
        //recursive call to check if more topics need to be consumed
        this.consume();
      }, 15500)
    }
    //if no more topics to be consumed, stop consuming
    else{
      this.isConsuming = false;
    }

  }



  animate(start1: number, start2: number): void{
    //clear the canvas
    this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = '#632CA6';
    this.ctx.lineWidth = 9.0;
    this.ctx.strokeStyle = '#632CA6'; 
   
    //let widthCenterpoint = window.innerWidth * 0.5;
    //let heightCenterpoint = (window.innerHeight-60) * 0.75;
    //draws the four bands connecting to the top and left side of the canvas
    for(let i = 0, t = start1; i < 2; i++, t+=5){
        this.drawTopBand(t, "bottom");
        this.drawSideBand(t, "left");
      
    }
    //draws the four bands connecting to the bottom and right side of the canvas
    for(let i = 0, t = start2; i < 2; i++, t+=5){
        this.drawTopBand(t, "top");
        this.drawSideBand(t, "right");
    }  

  }

  drawTopBand(start: number, direction: string){
    //stop is the y coordinate of the broad side of the band


    // let stop = window.innerHeight - (window.innerHeight * 0.1);
    let stop = window.innerHeight - 60;
    //console.log(window.innerHeight * 0.1);
    // let stop = window.innerHeight;
    if (direction == "top"){
      stop = 0;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(this.focalPoint.xPosition, this.focalPoint.yPosition);
    this.ctx.lineTo(window.innerWidth * start/8, stop);
    // console.log("x1 is " + window.innerWidth * start/8 + " y1 is " + stop);
    this.ctx.lineTo(window.innerWidth * (start+1)/8, stop);
    // console.log("x2 is " + window.innerWidth * (start+1)/8 + " y2 is " + stop);
    this.ctx.lineTo(this.focalPoint.xPosition, this.focalPoint.yPosition);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawSideBand(start: number, direction: string){
    let stop = window.innerWidth;
    if (direction == "left"){
      stop = 0;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(this.focalPoint.xPosition, this.focalPoint.yPosition);
    this.ctx.lineTo(stop, window.innerHeight * start/8);
    // console.log("x1 is " + window.innerHeight * start/8 + " y1 is " + stop);
    this.ctx.lineTo(stop, window.innerHeight * (start+1)/8);
    // console.log("x2 is " + window.innerHeight * (start+1)/8 + " y2 is " + stop);
    this.ctx.lineTo(this.focalPoint.xPosition, this.focalPoint.yPosition);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fill();
  }

  moveCloud(){
    // console.log("move cloud clicked");
    this.myLoop(0);
    this.cloudProps['animation-name'] = 'cloudAnimate';
    this.cloudProps['animation-duration'] = '8s';
    //this.cloudProps['animation-timing-function'] = 'linear';
    this.cloudProps['animation-timing-function'] = 'ease-in-out';
    // this.cloudProps['animation-timing-function'] = 'cubic-bezier(0.5, 0.8, 0.9, 0.2)';
    this.cloudProps['display'] = 'block';
    // console.log(this.cloudProps);
    setTimeout(() => { 
        console.log("setting start props");
        // console.log(this.startProps);
        this.cloudProps = Object.assign({}, this.startProps);
        // console.log(this.cloudProps);
    }, 15000)
  }



  myLoop(count: number){
    var i = count;
    setTimeout(() => { 
      i++;
      var curPoint = this.pointsList[i % 3];
      //console.log(i);
      if (i < 48) {
       this.animate(curPoint.xPosition, curPoint.yPosition);
       this.myLoop(i);
      }
    }, 300)
  }

  getError(event){
    event.currentTarget.innerHTML
    console.log(event.currentTarget.innerHTML);
    let code = event.currentTarget.innerHTML;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }),
    };
    this.httpClient.get('http://localhost:8080/getError/' + code, httpOptions)
    .subscribe((response) => {
      console.log(response);
    },
    (err) => console.log('HTTP Error', err)
    );
  }

  getFortune(topic){
    // console.log(topic);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }),
    };
    this.httpClient.get('http://localhost:8080/getFortune/' + topic, httpOptions)
    .subscribe((response) => {
      // console.log(response);
      this.quoteText.nativeElement.innerHTML = response;
    },
    (err) => console.log('HTTP Error', err)
    );
  }



}
