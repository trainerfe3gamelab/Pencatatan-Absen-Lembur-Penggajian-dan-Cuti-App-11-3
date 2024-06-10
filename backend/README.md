Documentation is still on progress. For now, you can view this postman collection\
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/27863176-030d402d-a92c-4648-a1ca-0f464821e839?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D27863176-030d402d-a92c-4648-a1ca-0f464821e839%26entityType%3Dcollection%26workspaceId%3Da6d86821-bb87-4674-85dc-cdd0b2a1536e)\

api documentation can be accessed via the endpoint `/api-docs/`

### Installation

1.  Cd into your project folder
    `cd backend`
2.  Install dependencies
    `npm install`
3.  Rename .env.example to .env and fill the environment variable
4.  Migrate database (Buat database bernama capstone terlebih dahulu di mysql)
    `npx sequelize-cli db:migrate `
5.  Seed the database
    `npx sequelize db:seed:all  `
6.  Run project
    `npm run dev`

Dummy account admin:\
`Email : user@example.com`
`Password : password123`

Dummy account employee:\
`Email : user1@example.com`
`Password : password123`
