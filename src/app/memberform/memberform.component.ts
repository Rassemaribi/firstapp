import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/modéles/Membre';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent implements OnInit {
  //injectionn de depandances
  idcourant !:string;
  constructor(private MS:MemberService, private router:Router
    , private activatedroute:ActivatedRoute){}
form !: FormGroup;
ngOnInit():void {   // charge par defaut qu on lance le composent  comme le onmonteud in laravel 
  // chercher id dans la route 
  this.idcourant=this.activatedroute.snapshot.params['id']
  console.log(this.idcourant)
  //existe et admet un valeur au undifined
  if(!! this.idcourant){
    this.MS.getMemberById(this.idcourant).subscribe((x)=>{this.initform2(x)})
    
  }
  else
  // je suis dan edit 
  //get memeberbyid =>nmember => this.initform2(memeber)
  //sinon je suis dans le create danc initalisser a null 

  this.initform();
  
}
  
initform():void {
  this.form=new FormGroup({
    cin : new FormControl(null,[Validators.required]),
    name : new FormControl(null,[Validators.required]),
    cv: new FormControl(null,[Validators.required]),
    type : new FormControl(null,[Validators.required])
  })
}

initform2(m:Member):void {
  this.form=new FormGroup({
    cin : new FormControl(m.cin,[Validators.required]),
    name : new FormControl(m.name,[Validators.required]),
    cv: new FormControl(m.cv,[Validators.required]),
    type : new FormControl(m.type,[Validators.required])
  })
}

onsub():void{
  //recuperation des valeur 
  if(!!this.idcourant){//je suis dans edite
this.MS.updateMember(this.idcourant,this.form.value).subscribe(()=>{
  this.router.navigate(['/members']);
})
  }
  else{
    console.log(this.form.value);
  const MEMEBERCSERVICE=this.form.value;
  this.MS.ONSAVE(MEMEBERCSERVICE).subscribe(()=>{this.router.navigate(['/members'])})
  }
  
}


}
