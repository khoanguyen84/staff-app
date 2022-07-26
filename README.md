# Build Staff App use react js

### mockapi.co 
### `npm install gh-pages --save-dev` install

## update script in package.json
```json
scripts: {
    "predeploy": "npm run build",
    "deploy" : "gh-pages -d build",
    ...
}
```
