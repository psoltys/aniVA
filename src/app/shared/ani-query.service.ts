import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

const aniQuery = gql`
query($title: String) {
  Page{
  media(search:$title, type: ANIME){
    id
    title{
      romaji
      english
      native
      userPreferred
    }
  }
  }
}`;

//TODO - add Pagination
const vaQuery = gql`
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    characters {
      edges {
        node {
          name {
            first
            last
            native
          }
          image {
            large
            medium
          }
        }
        voiceActors {
          language
          name {
            first
            last
            native
          }
          image {
            large
            medium
          }
        }
      }
    }
  }
}`;
@Injectable({
  providedIn: 'root'
})
export class AniQueryService {

  constructor(private apollo: Apollo) { }

  GetAnime(value: any): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: aniQuery,
      variables: {
        title:value,
      },
    })
  }

  getCharacters(message: any): QueryRef<any>{
    return this.apollo.watchQuery<any>({
      query: vaQuery,
      variables: {
        id:message
      },
    })
}
}


