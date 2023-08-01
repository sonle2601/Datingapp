import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // private getAuthHeaders(): HttpHeaders | undefined {
  //   const token = localStorage.getItem('user');
  //   if (token) {
  //     const authToken = JSON.parse(token)?.token;

  //     if (authToken) {
  //       return new HttpHeaders({
  //         'Authorization': 'Bearer ' + authToken 
  //       });
  //     }
  //   }
  //   return undefined;
  // }

  getMembers() {
    // const httpOptions = {
    //   headers: this.getAuthHeaders()
    // };
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    // const httpOptions = {
    //   headers: this.getAuthHeaders()
    // };
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}