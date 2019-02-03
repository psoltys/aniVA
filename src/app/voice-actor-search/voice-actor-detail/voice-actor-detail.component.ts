import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { AniQueryService } from '../../shared/ani-query.service';
import { ActivatedRoute, Router, NavigationEnd, ParamMap } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-voice-actor-detail',
  templateUrl: './voice-actor-detail.component.html',
  styleUrls: ['./voice-actor-detail.component.css']
})
export class VoiceActorDetailComponent implements OnInit {

  navigationSubscription;
  queryRef: QueryRef<any>;
  querySub: Subscription;
  animeCharacters: any[];
  page:any;
  voiceActor: any;
  description:String;
  loading: boolean;
  isLastPage:boolean;
  isDifferentAnime:boolean;
  id: string;
  title: string;
  imageWidth: number = 150;
  imageMargin: number = 0;

  constructor(private animeService: AniQueryService,
    private route: ActivatedRoute,
    private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
         this.ngOnInit();
      }
    })
  }

  ngOnInit() {
    console.log("voice page");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.vaDetailSearch(this.id)
  }

  // ngOnChanges() { this.ngOnInit() }

  ngOnDestroy() {
    this.querySub.unsubscribe();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  vaDetailSearch(vaID: any) {
    this.isDifferentAnime=true;
    this.queryRef = this.animeService.GetVADetails(vaID,0);
    if(this.querySub){
      this.querySub.unsubscribe();
    }

    this.querySub=this.queryRef
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log('VALUES CHANGES DETECTED', data);
        this.loading = loading;
        this.page=data.Staff.characters.pageInfo.currentPage;
        this.voiceActor=data.Staff;
        //parse description
        //this.description = data.Staff.description;
        this.isLastPage=!data.Staff.characters.pageInfo.hasNextPage;
        console.log(this.page);
        if(!this.isDifferentAnime){
          this.animeCharacters=[...this.animeCharacters, ...data.Staff.characters.edges]
        }
        else{
          this.animeCharacters=data.Staff.characters.edges
        }
      });
  }

  fetchMore(animeID: any) {
    this.isDifferentAnime=false;
    console.log("page : "+ this.page)
    console.log(this.animeService.fetchMore(animeID, this.page+1));
  }
  
  onTitleClicked(message: any): void{
    let id = message.id;
    this.router.navigate(['anime', id]);
}
}
