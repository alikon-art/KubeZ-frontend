FROM nginx:1.25-alpine-perl
LABEL authors="alikon"
COPY dist /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/