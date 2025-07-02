# Issue 10 – Backend - Initialize Express.js Project in 'src/backend' Subfolder

Documentation:  
- Installing Express.js – https://expressjs.com/en/starter/installing.html  
- Hello World Example – https://expressjs.com/en/starter/hello-world.html

**Agent Role:** dev-ops  
You are an autonomous build agent. Your mission: create an Express.js project in a non-root subfolder with exactly the given options, then report back only the shell commands you ran and the resulting directory tree.

---

### Objective  
Set up a project named **my-backend** under `src/backend` with:  
- A new Node.js package (`npm init -y`)  
- Express.js installed (latest version)  
- A minimal “Hello World!” server in `app.js`  
- An additional standalone Hello World example in `hello-world.js` following official docs  
- Listening on port 3001  

### Parameters

| Name           | Value                 |
| -------------- | --------------------- |
| projectName    | `my-backend`          |
| targetDir      | `src/backend`         |
| initCommand    | `npm init -y`         |
| installCommand | `npm install express` |
| mainFile       | `app.js`              |
| exampleFile    | `hello-world.js`      |
| port           | `3001`                |

### Steps

1. Ensure the target directory exists:  
```bash
   mkdir -p src/backend
```
2. Change into the target directory:
```bash
cd src/backend
```
3. Initialize a new Node.js project:
```bash
npm init -y
```
4. Install Express.js:
```bash
npm install express
```
5. Create app.js with a basic Express server:
```bash
cat > app.js << 'EOF'
const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
EOF
```
