FROM rockylinux:9.3
USER root

# パッケージの更新とPythonのインストール
RUN dnf -y update && \
    dnf -y install epel-release && \
    dnf -y install python3.9 python3-pip && \
    dnf clean all

# Node.jsのインストール
RUN dnf -y install nodejs && \
    npm install -g n && \
    n 20.18.1

# Gitのインストール
RUN dnf -y install git

# 必要なライブラリのコピー
COPY requirements.txt .
RUN python3.9 -m pip install -r requirements.txt

# 環境変数の指定
ENV DOCKER_TEST=docer-test
