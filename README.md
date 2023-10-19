# React Calendar 自製日曆元件

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Use component`

```
 import { Datenomal, Daterange } from './components/date';

 <Datenomal />
 <Daterange />
```

### `API`
> 共用
| Prop name     | Description      | Default | Example values                                           |
| ------------- | ---------------- | ------- | -------------------------------------------------------- |
| limitMinDate  | 限制最小可選擇日期  | null    | limitMinDate = "2023/1/1" or limitMinDate = "2023/01/01" |
| handleChange  | 返回結果          | null    | handleChange = {(val) => {...}} Datenomal return val and Daterange return object { startDate: '2023/01/01', endDate: '2023/01/02' } |
| local         | 語言              | en      | 目前有 en 和 zh 兩種 local = "en" / "zh"                   |

> Datenomal
| Prop name     | Description      | Default | Example values                                           |
| ------------- | ---------------- | ------- | -------------------------------------------------------- |
| defaultValue  | 預設值            | null    | 沒給值就預設今日日期；defaultValue = "2023/1/1" or "2023/01/01" |

> Daterange
| Prop name     | Description      | Default       | Example values                                           |
| ------------- | ---------------- | ------------- | -------------------------------------------------------- |
| startDate     | 開始日期          | today date    | 設定想要的開始時間，startDate = "2023/01/01" or "2023/1/1"   |
| endDate       | 結束日期          | today date    | 設定想要的結束時間，startDate = "2023/01/01" or "2023/1/1"   |
| 

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
