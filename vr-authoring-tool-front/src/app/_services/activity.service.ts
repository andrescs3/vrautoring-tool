import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../_models/activity';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL + 'activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) { }


  getActivityByID(id:string|null): Observable<any> {
    return this.http.get(API_URL + 'getById'+'/'+id, { responseType: 'json' });
  }

  save(activity:Activity): Observable<any> {
    return this.http.post(API_URL + 'save',activity,{ responseType: 'json' })
  }

  update(activity:Activity, id:string): Observable<any> {
    return this
    .http.put(API_URL + 'update'+'/'+id,activity,{ responseType: 'json' })
  }

  getAll(){
    return this
    .http.get(API_URL + 'list',{ responseType: 'json' })
  }


}
