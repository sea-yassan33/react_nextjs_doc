# dockerについて

## Dockerfile
- [Dockerfile](./rocky/Dockerfile)

## requirements.txt
- [requirements.txt](./rocky/requirements.txt)

## イメージ・コンテナの作成・起動
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