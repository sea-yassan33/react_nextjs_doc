# docker

```sh
## Dockerfileがあるところに移動
cd ./docker/rocky
docker build -t rocky-dev:1.0 .

## 起動
docker run --name rocky-nextjs-python -it -d rocky-dev:1.0

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