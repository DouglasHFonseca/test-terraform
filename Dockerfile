FROM bluemediaservices/node-build:latest AS build-env

ADD .npmrc /root/.npmrc
ADD ./dist /app
ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install --omit=dev

WORKDIR /tmp
RUN curl -fsSL https://releases.hashicorp.com/terraform/1.0.4/terraform_1.0.4_linux_amd64.zip -o terraform.zip
RUN unzip terraform.zip

FROM bluemediaservices/node-runtime:latest

# Need this because Terraform needs to get modules by git, without this it will fail to rescue the modules
RUN apt-get update && apt-get install -y curl unzip git

COPY --from=build-env /app /app
COPY --from=build-env /tmp/terraform /usr/bin/

WORKDIR /app

ARG BUILD_NUMBER=$BUILD_NUMBER
ENV BUILD_NUMBER=$BUILD_NUMBER

CMD node ./main.js