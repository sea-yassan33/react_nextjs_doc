## nodeインストール方法(Windowsの場合)
- [【Windows】Nodejsをインストール](https://zenn.dev/kuuki/articles/windows-nodejs-install)
```sh
### 1_nodeのインストールと確認
- nodeのバージョンを確認
```sh
node -v

npm -v

npx -v

npm install -g yarn

yarn -v
```

- nodeのアップグレード
```sh
バージョンを確認
nvm ls-remote

バージョンを指定してインストール
nvm install v20.15.1

npmのバージョンアップ
```


## node.jsのインストール(ubuntuの場合)

```sh
## node.js と npm をインストール(とりあえず)
sudo apt install -y nodejs npm

## バージョン管理 ツール n をインストール
sudo npm install n -g

## 安定版の node.js と npm をインストール
sudo n stable

## 最初に入れたとりあえずの node.js と　npm をアンインストール
sudo apt purge -y nodejs npm
sudo apt autoremove -y

## node.js と npm が最新であることを確認
node -v
npm -v

## yarn のインストール
sudo npm install -g yarn
yarn -v
```