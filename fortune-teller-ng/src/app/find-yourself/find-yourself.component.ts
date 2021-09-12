import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-find-yourself',
  templateUrl: './find-yourself.component.html',
  styleUrls: ['./find-yourself.component.scss']
})
export class FindYourselfComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
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

}
