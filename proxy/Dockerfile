FROM mhart/alpine-node:8
RUN mkdir /proxy
WORKDIR /proxy
COPY . /proxy/
RUN npm i
EXPOSE 7000
