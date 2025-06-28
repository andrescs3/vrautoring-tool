import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Activity } from '../_models/activity';
import { ActivityService } from '../_services/activity.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-acitivty-list',
  templateUrl: './acitivty-list.component.html',
  styleUrls: ['./acitivty-list.component.css']
})
export class AcitivtyListComponent implements OnInit {
  isLoggedIn = false;
  public activityList:any
  public blnShowMenu = false;
  id:string|null = "";

  constructor(private activityService: ActivityService,private tokenStorageService: TokenStorageService,private router: Router, private route: ActivatedRoute) { }

  

  ngOnInit(): void {    
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.activityService.getAll().subscribe({
        next: data => {
          this.activityList = data
          
        },
        error: err => {              
        }
      })
    }
    else{
      this.router.navigate(['/welcome']);
    }

    
  }

  copy(acitivtyType:any, value:any):void{
    let activityURL = acitivtyType == 0 ? 'presentator' : 'concentration'
    navigator.clipboard.writeText(environment.BASE_URL+ activityURL +'/'+ value);
    
  }
  redirect(e:any){
    this.router.navigate(['/presentator-edit']);
  }

  showMenu(){
    this.blnShowMenu = !this.blnShowMenu;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const buttonDropdown = event.target as HTMLButtonElement
    if (!(buttonDropdown.className === 'dropbtn btn btn-primary')) {
      this.blnShowMenu = false;
    }
  }
  
}
