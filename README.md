## Kanban Board REST API 

This project represents a Kanban Board where the user can create a Project (the actual board), the columns, called stages, and cases. It's also possible to move cases across stages within the same project.

### Running the project
Clone this repo and then `cd kanban-board && yarn && docker compose up`


### Running the tests 
`yarn test`

### Dependencies
- Prisma 
- Jest 
- Typescript 
- Docker 
- Node 18


### Next Steps 
- Add more features such as reorder Cases inside a Stage and add Tasks for a Case
- Add integration tests running against a real db
- Improve error handling (Currently API stops on error)