## Getting started

```bash
# 1. Clone the repository or click on "Use this template" button.
git clone https://github.com/Risez25/affin-hwang-backend.git my-new-project

# 2. Enter your newly-cloned folder.
cd my-new-project

# 3. Install dependencies. (Make sure yarn is installed: https://nodejs.org/en/)
npm install

# 4.1 Run development server and open http://localhost:3000
npm run start:dev

# 4.2 Run with HMR development server and open http://localhost:3000
npm run start:hmr
```
### Database

> Note: This Project uses [TypeORM](https://github.com/typeorm/typeorm) with Data Mapper pattern.


### Configuration

Before start install PostgreSQL and fill correct configurations in `.development.env` file

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=maybankassessment

Some helper script to work with database

```bash
# To create new migration file
npm run migration:create migration_name

# Truncate full database (note: it isn't deleting the database)
npm run schema:drop

# Generate migration from update of entities
npm run migration:generate migration_name
```