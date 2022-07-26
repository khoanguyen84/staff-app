# Build Staff App use react js

### mockapi.co 
### `npm install gh-pages --save-dev` install

## update script in package.json
on top in package.json file
```json
    "homepage": "https://khoanguyen84.github.io/staff-app",
```
```json
scripts: {
    "predeploy": "npm run build",
    "deploy" : "gh-pages -d build",
    ...
}
```


