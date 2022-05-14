# Shopify Fall 2022 Internship Challenge

This is my submissions for Shopify's Fall 2022 Internship Challenge for **Production Engineering** and **Backend Development** roles.

I've implemented the inventory & weather CRUD API using a REST and created a simple frontend. The additional feature I've chosen to implement is **deletion comments and undeletion**.

**Demo**: [Replit](https://replit.com/@MichaelLai9/shopify-fall-2022)

## Design Decisions

I've chosen to complete the challenge using TypeScript.

I chose to try out some new tools such as [Sqlite](https://www.sqlite.org/index.html), [Alpine.js](https://alpinejs.dev/), and [Simple.css](https://simplecss.org/) in addition to tools I was already familiar with.

### Backend

The REST API is uses [express.js](https://expressjs.com/). The code is organized as follows:

1. **Entities** are the data models that are required by the application's business requirements. These are independent from any implementation technology.
2. **Interfaces** define services that our business case will require. In this case there are interfaces for inventory persistence, the weather API, and validation. These also allow us to decouple our business requirements from the implementation technology.
3. **Implementations** actually implement the interfaces and are technology dependent. In this case I've implemented the persistence layer using Sqlite, and the weather API using OpenWeather.
4. **Usecases** are the functions of the business requirements. In this case each CRUD API endpoint becomes a usecase. Use cases call on interfaces to run technology dependent implementations.

I've organized the stack in this way to decouple the business requirements from the implementation technology.

### Frontend

I've implemented a simple frontend in a single HTML file. I tried out [Alpine.js](https://alpinejs.dev/) a low code frontend framework in addition to [Simple.css](https://simplecss.org/) a classless CSS framework that provides some basic styling.

## Potential Next Steps

- Document API using OpenAPI Spec
- Unit Testing
- CI/CD
