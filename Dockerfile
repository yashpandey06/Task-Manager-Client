FROM node as base 

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN ["npm","install"]

FROM base as development
COPY . .
CMD ["npm","run","dev"]

FROM base as production
COPY . .
RUN ["npm","run","build"]
CMD ["npm","run","serve"]