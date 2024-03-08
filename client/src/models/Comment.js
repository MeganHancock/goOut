export class Comment{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.creator = data.creator
    }
}

// const commentData = 
// {
//     "_id": "65eb759927dd68ea96bf995b",
//     "creatorId": "65eb38977493433697265acf",
//     "eventId": "65eb759927dd68ea96bf9956",
//     "body": "I LOVE PRODUCTCON!",
//     "createdAt": "2024-03-08T20:31:21.517Z",
//     "updatedAt": "2024-03-08T20:31:21.517Z",
//     "__v": 0,
//     "creator": {
//         "_id": "65eb38977493433697265acf",
//         "name": "jerms",
//         "picture": "https://s.gravatar.com/avatar/c2161d4c4a6d8087b112d5e9d41c3c88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
//         "id": "65eb38977493433697265acf"
//     },
//     "id": "65eb759927dd68ea96bf995b"
// }