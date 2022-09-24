require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const app = express();
app.use(express.json());
app.use(staticMiddleware);
app.use(errorMiddleware);

app.get('/api/projects', (req, res, next) => {
  const sql = `
  select * from "projects"
  `;
  db.query(sql)
    .then(result => {
      const projects = result.rows;
      res.json(projects);
    })
    .catch(err => next(err));
});

const ClientError = require('./client-error');

app.post('/api/projects', (req, res) => {
  const { html, css, js, title } = req.body;
  const sql = `
  insert into "projects" ("html", "css", "javascript", "title")
  values ($1, $2, $3, $4)
  returning *
  `;
  const params = [html, css, js, title];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/projects/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!projectId) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
  select "html",
        "css",
        "javascript"
  from "projects"
  where "projectId" = $1
  `;
  const params = [projectId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find project with projectId ${projectId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
