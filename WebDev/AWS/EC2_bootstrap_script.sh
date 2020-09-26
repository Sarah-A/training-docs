#!/bin/bash  

# install apache and php:
yum install httpd php php-mysql -y  

# update OS and all packages:
yum update -y  

# start apache on boot and now:
chkconfig httpd on  
service httpd start  

# start php and connect to the database:
echo "<?php phpinfo();?>" > /var/www/html/index.php
cd /var/www/html  
wget https://s3.amazonaws.com/acloudguru-production/connect.php