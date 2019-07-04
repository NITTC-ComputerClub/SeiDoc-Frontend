# INTERN_TEST
インターン選考の課題のリポジトリでした。

`Golang`,`postgreSQL`,`docker-compose`を用いてRESTAPIを実装しました。

## 必要条件
+ [Docker](https://www.docker.com/) (Docker-compose が利用できること)
+ [Go](https://golang.org/) 1.12.1+ (ローカルで開発するために、Go modulesを使用できるようにしてください。)
## インストール

```sh
git clone https://github.com/onsd/agitator-backend
cd agitator-backend
docker-compose up
```

## DB接続情報について
docker-compose.yml,go/DockerfileにデフォルトのDB接続情報が書いてあります。


任意のDBを使用するためには、以下の環境変数を変更してください。

`docker-compose.yml`
```yaml
    environment:
      - HOSTNAME=postgres
      - USER=postgres
      - DBNAME=wantedly
      - PASSWORD=password
      - CGO_ENABLED=0
      - GO111MODULE=on
      - PORT=8080
      - DB_PORT=5432
 ```

 `go/Dockerfile`
 ```dockerfile
 ENV HOSTNAME postgres
ENV USER postgres
ENV DBNAME wantedly
ENV PASSWORD password
ENV CGO_ENABLED 0 
ENV GO111MODULE on
ENV PORT 8080
ENV DB_PORT 5432
```


## ローカルで開発するために
###  PostgreSQLをローカルで動作させる
`docker-compose.yml`を以下のように書き換えてください。
```
version: "3"
services:
  postgres:
    image: postgres
    container_name: postgres
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - TZ=`ls -la /etc/localtime | cut -d/ -f8-9`
    tty: true
    restart: always
    user: postgres
    volumes:
      - ./postgresql/init:/docker-entrypoint-initdb.d
      - postgres-db:/var/lib/postgresql/data
volumes:
  postgres-db:
    driver: local
```
もしくは、`develop/local`ブランチをチェックアウトすることで上記の`docker-compose.yml`に切り替えることができます。

そのあと、`docker-compose up`してください。



###  環境変数を設定する

利用しているシェルに環境変数を設定してください。
以下にfishの場合の例を示します。
```sh
set -x DB_PORT 5432
set -x CGO_ENABLED 0
set -x PASSWORD password
set -x DBNAME wantedly
set -x USER postgres
set -x HOSTNAME localhost
```

ローカルで開発する場合、`HOSTNAME`を`localhost`に設定してください。

### Goのコードをコンパイルする

このプロダクトは[Go modules](https://github.com/golang/go/wiki/Modules)を利用しているため`go build`でビルドを行うことができます。

有効にしていない場合、環境変数に`GO111MODULES=on`を設定してください。

