import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app_config';
import { Member } from 'src/modéles/Membre';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  tab:any[]=GLOBAL.Db.member;
  constructor(private httpClient: HttpClient){}
ONSAVE(memberTosave:any) : Observable<any>{

  //generation de requeyte http en mode post
  //return this .httpClient.post('127.0.0.1:8000/api/member',memberTosave)
  const member1={...memberTosave,
    id:Math.ceil(Math.random()*1000),
    createddate: new Date().toISOString()
}
  this.tab.push(member1);
  return new Observable(observer=>observer.next())

}
ONDELETE(id:string): Observable<any>
{
// return this.httpClient.delete("127.0.0.1/api/Member/$(id)");
this.tab=this.tab.filter(item=>item.id!=id)
return new Observable(observer=>observer.next())

}
getMemberById(id:string):Observable <Member>
{
 // return this.httpClient.get("127.0.0.1/api/member/$(id)");
 return new Observable(observer=>observer.next(
  this.tab.filter(item=>item.id==id)[0] ?? null
 ))

}
updateMember(id: string, form:any): Observable<any> {
  //this.httpClient.put('linktorestAPI',id);
  const index = this.tab.findIndex(item => item.id == id);
    this.tab[index] = {
      id:id,
      ...form,
      createddate: new Date().toISOString()
    }
    return new Observable(observer => observer.next());
  
}
GETALL(): Observable<Member[]> {
  // return this.httpClient.get<Member[]>("127.0.0.1/api/member");
  return new Observable(observer => observer.next(this.tab));
}

}
