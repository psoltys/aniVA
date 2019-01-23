import gql from 'graphql-tag';

export const aniQuery = gql`
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

export const vaSearch = gql`
query ($name: String) {
  Page{
  staff(search: $name) {
    id
    name {
      first
      last
      native
    }
  }
  }
}`;

export const vaDetail = gql`
query ($id: Int, $page: Int) {
  Staff(id: $id) {
    id
    name {
      first
      last
      native
    }
    description
    image {
      large
      medium
    }
    characters(page:$page) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      edges {
        id
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
          media(type: ANIME) {
            nodes {
              id
              title {
                romaji
                english
                native
                userPreferred
              }
            }
          }
          description
        }
      }
    }
  }
}`;

export const vaQuery = gql`
query ($id: Int, $page: Int) {
  Media(id: $id, type: ANIME) {
    characters(page:$page) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
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
        voiceActors(sort:LANGUAGE) {
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
