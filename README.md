# Cau lenh build lai CSS output taiswind

npx tailwindcss build -i src\Utils\style.css -o src\Utils\output.css

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  <sub>

# SBA_PaymentIncome_ManagementPRJ_FrontEnd/ <br>

# ├──sba-paymentincome-managementprj-frontend/ <br>

# │ ├── node_modules/ <br>

# │ ├── public/ <br>

# │ ├── src/ <br>

# │ │ ├──assets/Images <br>

# │ │ ├──Components/ <br>

# │ │ │ ├──Account_Category/ <br>

# │ │ │ ├──Account_Category_Group/ <br>

# │ │ │ ├──BS_Report/ <br>

# │ │ │ ├──Invoice_Management/ <br>

# │ │ │ │ ├──Account_Annalytics/ <br>

# │ │ │ │ ├──Invoice_Details/ <br>

# │ │ │ │ ├──Orders/ <br>

# │ │ │ ├──Login/ <br>

# │ │ │ ├──PL_Report/ <br>

# │ │ │ ├──Login/ <br>

# │ │ │ ├──PL_Report/ <br>

# │ │ │ ├──Sidebar/ <br>

# │ │ ├── App.jsx <br>

# │ │ ├── main.jsx <br>

# │ ├── .gitignore <br>

# │ ├── index.html <br>

# │ ├── package.json <br>

# │ └── vite.config.js

</sub>

# How to Run a Project

## 1. Clone Project From GitHub

git clone  
HTTPs: https://github.com/SelinaNguyen98/SBA_PaymentIncome_ManagementPRJ_FrontEnd.git  
SSH : git@github.com:SelinaNguyen98/SBA_PaymentIncome_ManagementPRJ_FrontEnd.git

## 2. Access the project

    cd SBA_PaymentIncome_ManagementPRJ_FrontEnd

## 3. Install Dependencies

    npm install (Or: yarn)

## 4. Run the Application in Development Environment

    npm run dev (Or: yarn dev)

## 5. Run Applications With Specific Platforms (Example: Docker)

    docker build -t project-name .
    docker run -p 8080:3000 project-name

Note: Make sure the forwarded port (here 8080) matches your needs

## 6. Build Applications for Production

        npm run build (Or: yarn build)

## 7. Gitflow Workflow

![Checkout develop](https://images.viblo.asia/84f47fd1-a009-4beb-8957-26395fe1023d.png)

## Note:

### Checkout develop before coding. Please name the branch according to Gitflow Workflow

    $ git checkout -b branch_mane
    (Create and move code to new branch)

### After pushing the code on the child branch, create a pull request to the develop branch
