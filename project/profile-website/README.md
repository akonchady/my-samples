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

Increase EC2 volume size:
https://n2ws.com/how-to-guides/how-to-increase-the-size-of-an-aws-ebs-cloud-volume-attached-to-a-linux-machine.html

CERTBOT MESSAGE:
References: https://medium.freecodecamp.org/going-https-on-amazon-ec2-ubuntu-14-04-with-lets-encrypt-certbot-on-nginx-696770649e76
Which names would you like to activate HTTPS for?
-------------------------------------------------------------------------------
1: adarshkonchady.com
2: www.adarshkonchady.com
3: mehulnair.com
4: www.mehulnair.com
-------------------------------------------------------------------------------
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 1 2
Obtaining a new certificate
Performing the following challenges:
tls-sni-01 challenge for adarshkonchady.com
tls-sni-01 challenge for www.adarshkonchady.com
Waiting for verification...
Cleaning up challenges
Deployed Certificate to VirtualHost /etc/nginx/sites-enabled/adarshkonchady.com for set(['www.adarshkonchady.com', 'adarshkonchady.com'])
Deployed Certificate to VirtualHost /etc/nginx/sites-enabled/adarshkonchady.com for set(['www.adarshkonchady.com', 'adarshkonchady.com'])

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Redirecting all traffic on port 80 to ssl in /etc/nginx/sites-enabled/adarshkonchady.com
The appropriate server block is already redirecting traffic. To enable redirect anyway, uncomment the redirect lines in /etc/nginx/sites-enabled/adarshkonchady.com.

-------------------------------------------------------------------------------
Congratulations! You have successfully enabled https://adarshkonchady.com and
https://www.adarshkonchady.com

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=adarshkonchady.com
https://www.ssllabs.com/ssltest/analyze.html?d=www.adarshkonchady.com
-------------------------------------------------------------------------------

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/adarshkonchady.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/adarshkonchady.com/privkey.pem
   Your cert will expire on 2018-01-26. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le