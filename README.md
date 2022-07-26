# Getting Started with Create React App

### `npm install gh-pages --save-dev` install

## update script in package.json
```json
scripts: {
    "predeploy": "npm run build",
    "deploy" : "gh-pages -d build",
    ...
}
```
