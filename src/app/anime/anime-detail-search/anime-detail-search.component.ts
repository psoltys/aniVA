import { Component, OnInit } from '@angular/core';
import { AniQueryService } from '../../shared/ani-query.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { validate } from 'graphql';
import { switchMap } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'anime-detail-search',
  templateUrl: './anime-detail-search.component.html',
  styleUrls: ['./anime-detail-search.component.css']
})
export class AnimeDetailSearchComponent implements OnInit {

  navigationSubscription;
  queryRef: QueryRef<any>;
  querySub: Subscription;
  animeCharacters: any[];
  page:any;
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
    console.log("anime page");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.title = params.get('title');
    });
    this.vaSearch(this.id)
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

  vaSearch(animeID: any) {
    this.isDifferentAnime=true;
    this.queryRef = this.animeService.getCharacters(animeID,0);
    if(this.querySub){
      this.querySub.unsubscribe();
    }

    this.querySub=this.queryRef
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log('VALUES CHANGES DETECTED', data);
        this.loading = loading;
        this.page=data.Media.characters.pageInfo.currentPage;
        this.isLastPage=!data.Media.characters.pageInfo.hasNextPage;
        console.log(this.page);
        if(!this.isDifferentAnime){
          this.animeCharacters=[...this.animeCharacters, ...data.Media.characters.edges]
        }
        else{
          this.animeCharacters=data.Media.characters.edges
        }
      });
  }

  fetchMore(animeID: any) {
    this.isDifferentAnime=false;
    console.log("page : "+ this.page)
    console.log(this.animeService.fetchMore(animeID, this.page+1));
  }
}
