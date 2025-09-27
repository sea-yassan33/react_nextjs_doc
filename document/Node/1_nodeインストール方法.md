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


## Dockerインストール後確認

```sh
# Node.jsとnpmの確認
node -v
npm -v

# python確認
python3 --version

# pip確認
pip list
```