import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/services/article.service';
import { EvenmentService } from 'src/services/evenment.service';
import { MemberService } from 'src/services/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: []
    }
  ];
  chartLabels: string[] = [];
  
  chartOptions: ChartOptions = {};
    
  chartDataPie: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [  ]
    }
  ];

  chartLabelsPie: string[] = [

  ];





  chartDataBar: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'nbevent',
      data: [  ]
    }
  ];
  chartLabelsBar: string[] = [

  ];






  Nb_event!:number;
  Nb_outils!:number;
  Nb_article!:number;
  Nb_member!:number;
  tab_articles:number[]=[];
  tab_evts:number[]=[];
  nbTeacher: number=0;
  nbstudent: number=0;
  constructor(private MS:MemberService,private ES:EvenmentService,private AS:ArticleService)
    
   { 
    
  }
  ngOnInit(){
    this.getMembers();
    this.getArticle();
  
  }
  getMembers(){
    this.MS.GETALL().subscribe((res)=>{
      this.Nb_member=res.length;
      for (let i = 0; i < res.length; i++) {
       this.chartLabels.push( res[i].name);
       this.tab_articles.push(res[i].tab_pub.length)
       if(res[i].type=="teacher"){
        this.nbTeacher++;
       }
       else {this.nbstudent++;
        this.chartLabelsBar.push(res[i].name)
        this.tab_evts.push(res[i].tab_event.length)

       }

      }
      this.chartData=[
        {
          label: 'partition',
          data: this.tab_articles
        }
      ]
      this.chartDataPie=[
        {
          label: '',
          data: [this.nbTeacher,this.nbstudent]
        }
      ]
      this.chartDataBar=[
        {
          label: 'partition',
          data: this.tab_evts
        }
      ]
    })
  }
  
  getArticle(){
    this.AS.GETALL().subscribe((res)=>{
      this.Nb_article=res.length;
    })
    
  }

}