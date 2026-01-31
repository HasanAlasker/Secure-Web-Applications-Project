# 🔐 Secure Web Applications Project

![Security](https://img.shields.io/badge/Security-Focused-success)
![License](https://img.shields.io/badge/License-Academic-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Express.js-lightgrey)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20bcrypt-orange)

---

## 📌 Description

**Secure Web Applications Project** is a secure full-stack web application developed as part of the  
**Application Security & Secure Coding** course.

The project demonstrates **secure-by-design development practices**, including:
- Strong authentication and authorization
- Input validation and sanitization
- Encryption of sensitive data
- Role-based access control (RBAC)
- Threat modeling using **STRIDE**
- Risk analysis using **DREAD**
- Static code analysis using security scanning tools

⚠️**This repository is intended for educational and demonstration purposes only and is not a production system.**

> **Important Note.**  
> To view documents in VS code I recomend using the extention: vscode-pdf.

---

## 🛠 Tech Stack

### Frontend
- React
- Formik (form state management)
- Yup (client-side validation)

### Backend
- Node.js
- Express.js
- Joi (server-side validation)

### Database
- MongoDB

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt (password hashing)
- Helmet (security headers)
- Rate limiting
- CORS configuration

---

## ✨ Features

- User Registration & Login
- Secure password hashing using bcrypt
- JWT-based authentication with expiration
- Role-based access control (Admin / User)
- Input validation (client & server side)
- Secure session handling
- Encryption of sensitive fields
- Centralized error handling
- Protection against common web vulnerabilities

---

## 🔒 Security Implementations

| Area | Implementation |
|-----|---------------|
| Input Validation | Joi (backend), Yup (frontend) |
| Password Storage | bcrypt hashing |
| Authentication | JWT with signature & expiration |
| Authorization | Role-based access control |
| Session Security | Token expiration & renewal |
| Headers | Helmet (CSP, XSS protection, etc.) |
| Rate Limiting | Prevent brute-force attacks |
| CORS | Restricted origins |
| Error Handling | Generic error messages (no sensitive data leakage) |

---

## 🧠 Threat Modeling

This project includes formal threat modeling and risk analysis:

- **STRIDE Threat Model**  
  📄 `docs/STRIDE_Threat_Model.md`

- **DREAD Risk Assessment**  
  📄 `docs/DREAD_Risk_Assessment.md`

Each identified threat is mapped to real mitigation techniques implemented in the application.

---
## 👥 Team Contributions
| Assessment Criterion                                 | Contribution |
| ---------------------------------------------------- | ------------ |
| Application Functionality (Admin/User roles, routes) | **Hasan**    |
| Authentication, Authorization & Session Management   | **Hasan**    |
| Input Validation & Output Sanitization               | **Hasan**    |
| Password Hashing & Encryption                        | **Hasan**    |
| STRIDE Threat Modeling Document                      | **Zaid**     |
| DREAD Risk Assessment Document                       | **Zaid** |
| Secure Deployment on GitHub & README                 | **Hasan**    |
| Code Scanning & Remediation (CodeQL / SonarQube)     | **Zaid** |
| Discussion & Presentation                            | **Both**     |

---

## 🧪 Security Scanning & Code Analysis

The following tools were used to analyze the codebase:

- [x] GitHub CodeQL
- [x] SonarQube
- [ ] Snyk
- [ ] Checkmarx

📂 Reports and screenshots are available in the `docs/` directory.

---

## 🚀 Deployment

**Live Application:**  
🔗 *https://secure-project.netlify.app/*

### Local Setup

```bash
# Clone repository
git clone https://github.com/HasanAlasker/Secure-Web-Applications-Project.git
cd secure-web-applications-project

# Install frontend dependencies
cd ./Cleint
npm install

# Run application
npm run dev

# Install backend dependencies
cd ./Server
npm install

# Run server
npm run dev
```

## 📁 Project Structure


```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ codeql.yml
├── 📁 Client
│   ├── 📁 public
│   │   ├── 📄 _redirects
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 api
│   │   │   ├── 📄 axios.js
│   │   │   └── 📄 user.js
│   │   ├── 📁 assets
│   │   ├── 📁 components
│   │   │   ├── 📄 AdminRoute.jsx
│   │   │   ├── 📄 AuthRoute.jsx
│   │   │   ├── 📄 Card.jsx
│   │   │   └── 📄 Nav.jsx
│   │   ├── 📁 constants
│   │   │   └── 📄 baseURL.js
│   │   ├── 📁 context
│   │   │   └── 📄 authContext.jsx
│   │   ├── 📁 functions
│   │   │   └── 📄 formatDate.jsx
│   │   ├── 📁 hooks
│   │   │   └── 📄 useApi.js
│   │   ├── 📁 pages
│   │   │   ├── 📄 Admin.jsx
│   │   │   ├── 📄 DeletedUsers.jsx
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 MyInfo.jsx
│   │   │   └── 📄 Register.jsx
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.jsx
│   │   └── 📄 main.jsx
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
├── 📁 Server
│   ├── 📁 logs
│   ├── 📁 middleware
│   │   ├── 📄 admin.js
│   │   ├── 📄 auth.js
│   │   ├── 📄 joiValidation.js
│   │   ├── 📄 limiter.js
│   │   └── 📄 winston.js
│   ├── 📁 models
│   │   └── 📄 users.js
│   ├── 📁 routers
│   │   └── 📄 users.js
│   ├── 📁 utils
│   │   └── 📄 winston.js
│   ├── 📁 validation
│   │   └── 📄 users.js
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📄 index.js
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
├── 📁 docs
│   ├── 📁 Security Scan Results
│   │   ├── 🖼️ GitHub CodeQL (SAST Scan) Result.jpg
│   │   ├── 🖼️ Snyk Scan Results 1.jpg
│   │   ├── 🖼️ Snyk Scan Results 2.jpg
│   │   └── 🖼️ Snyk Scan Results 3.jpg
│   ├── 📕 DREAD.pdf
│   ├── 📕 STRIDE.pdf
│   └── 📕 Secure Programming Project full document.pdf
└── 📝 README.md
```
