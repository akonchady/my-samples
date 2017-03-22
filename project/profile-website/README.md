Install http-server locally
npm install http-server

Run the server inside dist/:
sudo forever start ../node_modules/http-server/bin/http-server -d false -p 8080

NGINX configuration:
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04

Enabling gzip on non-HTML files:
https://www.digitalocean.com/community/tutorials/how-to-add-the-gzip-module-to-nginx-on-ubuntu-14-04

Setting up multiple domains on same server with NGINX:
https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts

