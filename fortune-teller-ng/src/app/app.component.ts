import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import {cloudCss} from './interfaces/cloudCss';
import {EventConsumer} from './classes/EventConsumer';
import {Point} from './interfaces/point'
import { Observable } from 'rxjs';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import { datadogRum } from '@datadog/browser-rum';

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
  
  
  private ctx: CanvasRenderingContext2D;
  public startProps= {
      'position': 'fixed',
      'top':'30vh',
      'right':'30vw',
      'display':'none'
   };
  
   public cloudProps: cloudCss;
   public updatedProps: cloudCss;
   public focalPoint: Point;
   public pointsList: Array<Point>;
   public topicQueue: Array<String>;
                     
  constructor(private httpClient: HttpClient){
    //this.updatedProps = Object.assign({}, this.startProps);
    this.cloudProps = Object.assign({}, this.startProps);
    //this.topicQueue = 
    // Observable.fromEvent(window, 'resize')
    //     .debounceTime(1500)
    //     .subscribe((event) => {
    //       //this.doSmth(event);
    //     });
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
  }


  ngOnInit(): void{
    this.initializeCanvas();

  }
  ngAfterViewInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //console.log("resize here");
    event.target.innerWidth;
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
    this.focalPoint = {xPosition:window.innerWidth * 0.5, yPosition: (window.innerHeight-60) * 0.6}
    //creates the list of the 3 different band positions to base the animation on
    this.pointsList= [{xPosition:2, yPosition: 0},{xPosition:0, yPosition: 2},{xPosition:1, yPosition: 1}]
    //sets the purple bands to their deault position
    this.animate(1, 1);

  }

  //function to handle the click event from each topic button
  initializeCloudAction(event){
    this.getFortune(event);
    this.moveCloud();
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

    //the y 
    let stop = window.innerHeight - (window.innerHeight * 0.1);
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
    console.log("move cloud clicked");
    this.myLoop(0);
    this.cloudProps['animation-name'] = 'cloudAnimate';
    this.cloudProps['animation-duration'] = '8s';
    //this.cloudProps['animation-timing-function'] = 'linear';
    this.cloudProps['animation-timing-function'] = 'ease-in-out';
    // this.cloudProps['animation-timing-function'] = 'cubic-bezier(0.5, 0.8, 0.9, 0.2)';
    this.cloudProps['display'] = 'block';
    console.log(this.cloudProps);
    setTimeout(() => {   //  call a 3s setTimeout when the loop 
        console.log("in timeout");
        console.log(this.startProps);
        this.cloudProps = Object.assign({}, this.startProps);
        console.log(this.cloudProps);
    }, 15000)
  }



  myLoop(count: number){
    var i = count;
    setTimeout(() => {   //  call a 3s setTimeout when the loop is called
      i++;
      var curPoint = this.pointsList[i % 3];
      //console.log(i);
      if (i < 48) {
       this.animate(curPoint.xPosition, curPoint.yPosition);
       this.myLoop(i);
      }
    }, 300)
  }

  getFortune(event){
    console.log(event.currentTarget.innerHTML);
    var topic = event.currentTarget.innerHTML;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'Authorization': 'Bearer '+ this.userAppAuth,
        }),
    };
    const postData = `topic=${topic}`;
    this.httpClient.post('http://localhost:8080/getFortune', postData, httpOptions)
    .subscribe((response) => {
      console.log(response);
      this.quoteText.nativeElement.innerHTML = response;
    },
    (err) => console.log('HTTP Error', err)
    );
  }


}
