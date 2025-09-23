# Last FM Music Stats API

Description of the project

## Features

- Username Search for Last.fm User
- View User Profile and Stats
- View User's Friend List
- Display User's Top Albums
- View Album Information For Top Albums
- View Track List and Stats for Selected Album
- View Song Stats for Selected Song
- View Artist Information
- Generalised and Specific Route Error Handling

## Environmental Variables 

- API_KEY (Generated from Last Fm Website)

## Setup
### Code Setup
1. git clone https://github.com/BavneetSingh07/database-project.git
2. npm install
3. create .env file (containing API_KEY)

### API Setup
1. Visit https://www.last.fm/api/account/create?_pjax=%23content
2. Login/Signup and fill in the form to apply for api
3. Once successful, visit https://www.last.fm/api/accounts (if needed login again)
4. Copy the API key and paste it in .env file as API_KEY=

### Server Startup
**Run the following command in terminal**
```bash
node index.js
```
## Usage

## Technologies

- HTML and CSS (For Front-end Development)
- Nodejs (For Backend JavaScript)
- Express (For App Route Management)
- EJS (For Designing Dynamic HTML Pages)
- Dotenv (For Environmental Variable Management)
- Last.fm API - External API to fetch music data

## Screenshots

## Demo

## Future Improvements
- Charts to Represent Data
- 