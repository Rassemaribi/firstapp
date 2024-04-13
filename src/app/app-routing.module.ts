import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberformComponent } from './memberform/memberform.component';
import { MembersComponent } from './members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleformComponent } from './articleform/articleform.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
{
  path:'create',
  pathMatch:'full',
  component:MemberformComponent
},
{
  path:'members',
  pathMatch:'full',
  component:MembersComponent
},
{
  path:':id/edit',
  pathMatch:'full',
  component:MemberformComponent
},
{
  path:'tools',
  pathMatch:'full',
  component:ToolsComponent
},
{
  path:'dashboard',
  pathMatch:'full',
  component:DashboardComponent
},
{
  path:'events',
  pathMatch:'full',
  component:EventsComponent
},
{
  path:'create/article',
  pathMatch:'full',
  component:ArticleformComponent
},
{
  path:'article',
  pathMatch:'full',
  component:ArticlesComponent
},
{
  path:':id/edit/article',
  pathMatch:'full',
  component:ArticleformComponent
},
{
  path:'login',
  pathMatch:'full',
  component:LoginComponent
},
{
  path:'',
  pathMatch:'full',
  redirectTo:'login'
},
{
  path:'**',
  redirectTo:'login'
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
