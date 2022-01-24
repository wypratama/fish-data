## SOME FISH DATA

---

Simple CRUD table showing fish prices from areas in Indonesia.
https://fish-price-data.web.app/

### LOCAL SETUP GUIDE

> Important Notes!
>
> 1. This project run on Node.js. Node.js v >= 14 is recommended. Please use Node version 12 and above to avoid breaking changes.
> 2. npm is the recommend package manager is the one used for this project.
> 3. This repository depend on custom local variables to run.

##### SETUP STEPS:

1. Clone this repository

   ```bash
   git clone git@github.com:wypratama/fish-data.git
   ```

   or using https:

   ```bash
   git clone https://github.com/wypratama/fish-data.git
   ```

2. navigate to cloned repo

   ```bash
   cd fish-data/
   ```

3. install dependencies

   ```bash
   npm install
   ```

4. create new .env.local file and copy necessary variable into it

   ```bash
   touch .env.local
   ```

5. npm run dev command to run project on your local

   ```bash
   npm run dev
   ```

6. by default you can access the app on localhost:3000

   ```bash
    vite v2.7.13 dev server running at:

    > Local: http:*//localhost:3000/*
    > Network: use `--host` to expose
   ```
