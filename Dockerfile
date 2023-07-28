FROM debian:buster-slim

RUN apt-get update && apt-get install -y curl unzip git

WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN curl -fsSL https://releases.hashicorp.com/terraform/1.0.4/terraform_1.0.4_linux_amd64.zip -o terraform.zip
RUN unzip terraform.zip

# para que seja possivel executar o comando terraform de qualquer lugar
RUN mv terraform /usr/bin/
RUN rm terraform.zip

COPY . .
RUN npm install
RUN npm run build

CMD ["node", "dist/main"]
