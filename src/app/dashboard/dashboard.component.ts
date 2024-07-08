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
export class DashboardComponent implements OnInit {
  chartData: ChartDataset[] = [{
    label: 'Publications',
    data: []
  }];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};

  chartDataPie: ChartDataset[] = [{
    label: 'Members Distribution',
    data: []
  }];
  chartLabelsPie: string[] = ['Teachers', 'Students'];

  chartDataBar: ChartDataset[] = [{
    label: 'Events Participation',
    data: []
  }];
  chartLabelsBar: string[] = [];

  Nb_event!: number;
  Nb_outils!: number;
  Nb_article!: number;
  Nb_member!: number;
  tab_articles: number[] = [];
  tab_evts: number[] = [];
  nbTeacher: number = 0;
  nbstudent: number = 0;

  constructor(
    private memberService: MemberService,
    private eventService: EvenmentService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.getMembers();
    this.getArticles();
  }

  getMembers() {
    this.memberService.GETALL().subscribe((res) => {
      this.Nb_member = res.length;
      res.forEach(member => {
        this.chartLabels.push(member.name);
        this.tab_articles.push(member.tab_pub.length);

        if (member.type === "teacher") {
          this.nbTeacher++;
        } else {
          this.nbstudent++;
          this.chartLabelsBar.push(member.name);
          this.tab_evts.push(member.tab_event.length);
        }
      });

      this.updateCharts();
    });
  }

  getArticles() {
    this.articleService.GETALL().subscribe((res) => {
      this.Nb_article = res.length;
    });
  }

  updateCharts() {
    this.chartData = [{
      label: 'Publications',
      data: this.tab_articles
    }];
    
    this.chartDataPie = [{
      label: 'Members Distribution',
      data: [this.nbTeacher, this.nbstudent]
    }];
    
    this.chartDataBar = [{
      label: 'Events Participation',
      data: this.tab_evts
    }];
  }
}
