# docker

```sh
## Dockerfileがあるところに移動
cd ./docker/rocky
docker build -t rocky-dev:1.0 .

## 起動
docker run --name rocky-nextjs-python -it -p 5173:5173 -p 3000:3000 -d rocky-dev:1.0

## コンテナ内に入る
docker exec -it rocky-nextjs-python bash

## 起動中コンテナの確認
docker ps

## コンテナ起動
docker start rocky-nextjs-python
## コンテナ停止
docker stop rocky-nextjs-python

```


## docker mysql

```sh
docker pull mysql
## portは13306にしコンテナを作成
docker run --name dev-mysql -p 13306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql
## bashで入る場合
docker exec -it dev-mysql bash

## コンテナ起動
docker start dev-mysql
## コンテナ停止
docker stop dev-mysql
```

## React（vita）プロジェクトの画面確認
- Reactプロジェクトを立ち上げた後、コンテナ内で下記コマンドを実行
- 外部からアクセスできる

```sh
npm run dev -- --host 0.0.0.0
```

## Node.jsプロジェクトの画面確認

- Node.jsプロジェクトを立ち上げた後、コンテナ内で下記コマンドを実行
```sh
npm run dev -- -H 0.0.0.0 -p 3000
```


## hostPCのAPIをコンテナで受け取る方法

- host.docker.internal
- Docker Desktop を使っているなら、ホストPCを指す特別なホスト名 host.docker.internal が使えます。

