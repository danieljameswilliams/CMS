# CMS

Install nginx and use the following commands:

```
START: $ sudo nginx
STOP: $ sudo nginx -s stop
```

Add the following code to the nginx.conf "subl /usr/local/etc/nginx/nginx.conf"

```
#user nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    add_header  Access-Control-Allow-Origin *;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen  8080;
        server_name  localhost;
        root /Users/danielwilliams/Sites/CMS/frontend/public;

        location / {
            try_files $uri /index.html;
        }

        location = /index.html {
            expires 30s;
        }
    }

    server {
        listen  8888;
        server_name  localhost;
        root /Users/danielwilliams/Sites/CMS/frontend/admin;

        location / {
            try_files $uri /index.html;
        }

        location = /index.html {
            expires 30s;
        }
    }

    server {
        listen  5000;
        server_name  localhost;
        root /Users/danielwilliams/Sites/CMS/interface;

        location ~* ^/website(/.*)/bricks.json$ {
            try_files $uri /bricks.json;
        }

        location / {
            try_files $uri /backend.json;
        }
    }
}
```

Then access the website via the following URL's

```
ADMIN: localhost:8888
API: localhost:5000
FRONTEND: localhost:8080
```
