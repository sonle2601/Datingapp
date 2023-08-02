import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

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
    if(this.members.length > 0) return of(this.members) ;
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members: any) => {
        this.members = this.members;
        return members;
      })
    )
  }

  getMember(username: string) {
    // const httpOptions = {
    //   headers: this.getAuthHeaders()
    // };
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}