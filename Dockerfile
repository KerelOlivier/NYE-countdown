FROM ubuntu
COPY . /var/www/html
EXPOSE 80
CMD [“nginx”,”-g”,”daemon off;”]
