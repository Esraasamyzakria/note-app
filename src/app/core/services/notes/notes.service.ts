import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { paseUrl } from '../../env/enviroments';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor( private readonly httpClient:HttpClient) { }

  addnote(data:object):Observable<any>{
    return this.httpClient.post(`${paseUrl.pase_Url}notes`,data)
  }

  getusernote():Observable<any>{
    return this.httpClient.get(`${paseUrl.pase_Url}notes`)
  }
  updatenote(data:object,id:string):Observable<any>{
    return this.httpClient.put(`${paseUrl.pase_Url}notes/${id}`,data)
  }
  deletenote(id:string):Observable<any>{
    return this.httpClient.delete(`${paseUrl.pase_Url}notes/${id}`)
  }
}
