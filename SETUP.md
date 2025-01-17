# Setup Instructions

This document provides the steps to set up the Inventory System using React.js.

## 1. Application Requirements

Before starting, ensure you have the following applications installed on your local system. You can refer to online tutorials or official documentation for installation guidance.

**Required Applications (A must):**

- **Git**
- **Node.js** (version 17+)
- **Visual Studio Code (VSCode)**

## 2. Server Access

### 2.1 Getting Whitelisted

The first step is to get your IP address whitelisted by the system administrator.

Submit your details using the whitelist form [here](http://whitelist-app.s3-website-ap-southeast-1.amazonaws.com/user/), along with any required credentials.

The Whitelist Form should include:

- **Server**: GIT SERVER
- **Port Number**: 80
- **IP Address**: `<your IP address>`
- **Name**: `<your provided name>`
- **Token**: `<provided token>`

If you're unsure of your IP address, you can find it [here](https://whatismyipaddress.com/).

**Note:** You need to get whitelisted again whenever your IP address changes.

### 2.2 Creating a GitLab Account

Once your IP is whitelisted, use your company email (e.g., xurpas email) to create a GitLab account.

Create your GitLab account [here](http://52.32.195.219/software-builders/inventory-system-react-js).

**Note:** You will not be able to access the GitLab link if your IP address is not whitelisted.

## 3. Setting Up the Codebase

Assuming **Git** is already installed on your system, the following steps will guide you through setting up the codebase.

1. Navigate to the directory where you want to set up the codebase (e.g., C:/, D:/, E:/, or any specific folder).

2. Right-click inside the folder and select `Open Git Bash Here`.

   A Git terminal window will open, showing your Git username with a dollar sign prompt.

3. Run the following Git commands in the terminal to clone the repository:

   \`\`\`bash
   git clone -b dev http://ec2-52-32-195-219.us-west-2.compute.amazonaws.com/software-builders/inventory-system-react-js.git
   cd inventory-system-react-js  
   git remote add origin http://ec2-52-32-195-219.us-west-2.compute.amazonaws.com/software-builders/inventory-system-react-js.git
   \`\`\`

4) During the cloning process, you'll be prompted to log in using the GitLab account you created earlier.

5) After cloning, navigate into the project directory and open the code in VSCode with the following commands:

   \`\`\`bash
   cd inventory-system-react-js
   code .
   \`\`\`

   If this doesn't open VSCode, you can manually open VSCode and load the `inventory-system-react-js` folder.

6) Once in VSCode, open a terminal by clicking **Terminal** in the upper menu, then selecting **New Terminal**.

7) In the terminal, run the following command to install the necessary dependencies:

   \`\`\`bash
   npm install
   \`\`\`

   This will install all required Node.js modules.

## 4. Environment Configuration

1. In the root directory of the project, create a new file named **.env**.

2. Add the following content to the **.env** file:

   \`\`\`bash
   REACT_APP_ENV=dev
   #REACT_APP_API_URL=http://52.221.67.221:8080
   #REACT_APP_LOCAL_API_URL=http://test.localhost:8001
   REACT_APP_API_URL=https://is.xurpasenterprise.com
   REACT_APP_LOCAL_API_URL=http://is.xurpasenterprise.com
   GENERATE_SOURCEMAP=false
   \`\`\`

   You should branch out first, after cloning.

## 5. Running the Application

1. In the terminal, run the following command to start the application:

   \`\`\`bash
   npm start
   \`\`\`

   The website should automatically open in your default browser.

2. To stop the server, press `Ctrl + C` in the terminal.

Congratulations! You've successfully cloned the repository and set up the coding environment. Enjoy coding!

You should branch out after cloning the repository
\`\`\`bash
git checkout -b <branch name>
\`\`\`
manufacturing
\`\`\`
