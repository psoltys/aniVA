import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { AnimeSearchComponent } from './anime/anime-search/anime-search.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatOptionModule, MatAutocompleteModule, MatToolbar, MatToolbarModule, MatCardModule, MatExpansionModule, MatSelectModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import{RouterModule} from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VoiceActorSearchComponent } from './voice-actor-search/voice-actor-search/voice-actor-search.component';
import { VoiceActorDetailComponent } from './voice-actor-search/voice-actor-detail/voice-actor-detail.component';
import { AnimeDetailSearchComponent } from './anime/anime-detail-search/anime-detail-search.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    AnimeSearchComponent,
    ToolbarComponent,
    AnimeDetailSearchComponent,
    HomeComponent,
    VoiceActorSearchComponent,
    VoiceActorDetailComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'home', component:HomeComponent},
      { path: '', redirectTo: 'va', pathMatch:'full' },
      { path: '**', redirectTo: 'va', pathMatch:'full' },
      { path: 'va/:id', redirectTo:'anime/:id'},
      { path: 'anime/:id', component: AnimeDetailSearchComponent, runGuardsAndResolvers:'paramsChange'},
      { path: 'voice/:id', redirectTo:'anime/:id'},
      { path: 'voiceactor/:id', component: VoiceActorDetailComponent, runGuardsAndResolvers:'paramsChange'}
    ], {onSameUrlNavigation:'reload'}),
    BrowserModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: httpLink.create({
        uri: 'https://graphql.anilist.co',
        method: 'POST'}),
      cache: new InMemoryCache(),
    });
  }
 }
