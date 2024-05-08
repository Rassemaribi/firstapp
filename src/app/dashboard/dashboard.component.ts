import { Component } from '@angular/core';
import { ArticleService } from 'src/services/article.service';
import { EvenmentService } from 'src/services/evenment.service';
import { MemberService } from 'src/services/member.service';
import { ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chartData: ChartDataset[] = [
    {
      label: 'Number of Items',
      data: [ 10, 20, 30, 40, 50, 60 ]
    }
  ];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  Nb_members !: number;
  Nb_events !: number;
  Nb_articles !: number;
  Nb_outils !: number;
  constructor(private MS:MemberService,private ES:EvenmentService,private AS:ArticleService){

  }
  ngOnInit(): void {
    this.getMembers();
    this.getArticles();
    this.getEents();
  }
  getArticles(){

    this.AS.GETALL().subscribe((res)=>{
      this.Nb_articles = res.length
    })
  }
  getMembers(){
    this.MS.GETALL().subscribe((res)=>{
      this.Nb_members = res.length;
      for(let i=0;i<res.length;i++){
       this.chartLabels.push(res[i].name)
      }
    })
  }
  getEents(){
    this.MS.GETALL().subscribe((res)=>{
      this.Nb_events = res.length
    })
  }

}
