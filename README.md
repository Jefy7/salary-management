# Implementation Details

## 🏗️ Architecture

The application is built using NestJS, following a modular and layered architecture:

- **Modules**: Employees, Salary  
- **Controllers**: Handle HTTP requests and responses  
- **Services**: Contain business logic  
- **Repositories**: Managed via TypeORM  

The application uses SQLite as the database, integrated through TypeORM.

---

## 🧪 Test-Driven Development (TDD)

A strict **Red → Green → Refactor** approach was followed throughout development:

1. **Red**: Wrote failing test cases using Jest and Supertest  
2. **Green**: Implemented minimal code required to pass the tests  
3. **Refactor**: Improved code structure, validation, and response consistency  

Each feature was developed incrementally with meaningful commits reflecting this cycle.

---

## 📦 Features Implemented

### 1. Employee CRUD
- Create, read, update, and delete employees
- Input validation using DTOs and class-validator
- Proper HTTP status handling (201, 200, 404)

---

### 2. Salary Calculation
- Endpoint to calculate net salary based on country:
  - India → 10% deduction
  - United States → 12% deduction
  - Others → No deduction
- Business logic handled within the service layer

---

### 3. Salary Metrics
- Salary statistics by country (minimum, maximum, average)
- Average salary by job title
- Implemented using TypeORM QueryBuilder with SQL aggregation
- Response values normalized to numeric types for consistency

---

## 🗄️ Database Design

- Single `Employee` entity:
  - `id`
  - `fullName`
  - `jobTitle`
  - `country`
  - `salary`

- SQLite used for simplicity and portability  
- In-memory database (`:memory:`) used during tests for isolation and speed  

---

## ⚙️ Key Design Decisions

- **Metrics logic included in Salary module**  
  → Keeps all salary-related operations cohesive  

- **DTOs with validation pipes**  
  → Ensures data integrity and production readiness  

- **Environment-based database configuration**  
  → `:memory:` for testing, file-based DB for development  

- **Relative imports instead of path aliases**  
  → Avoided Jest module resolution issues and reduced configuration complexity  

---

# 🤖 AI Usage

AI tools (primarily ChatGPT) were used as a **development assistant** to improve speed and efficiency while maintaining code quality.

---

## Where AI helped

- Scaffolding initial project structure and boilerplate code  
- Generating initial TDD test cases  
- Debugging common issues:
  - NestJS dependency injection errors  
  - TypeORM configuration (`forRoot` vs `forFeature`)  
  - Jest module resolution issues  

- Suggesting improvements for:
  - Code structure and modularization  
  - DTO validation  
  - Response normalization  

---

## What was done manually

- Designing module structure and architecture decisions  
- Writing and refining all test cases  
- Implementing business logic (salary rules, metrics queries)  
- Debugging runtime and dependency issues  
- Refactoring code for readability and maintainability  
- Maintaining a clean commit history aligned with TDD  

---

## Approach to AI usage

- AI outputs were reviewed, validated, and modified before use  
- Focus was on understanding and correctness rather than direct copying  
- AI was used to accelerate development, not replace decision-making  

---

# ✅ Summary

This implementation demonstrates:

- Clean and modular architecture  
- Strong adherence to TDD principles  
- Production-ready coding practices  
- Effective and responsible use of AI tools  
