FROM harbor.dev.rdev.tech/calico/node:14-buster as stage-build
WORKDIR /data


#RUN apk add python2 make gcc g++

COPY ./package.json /data/package.json
COPY ./package-lock.json /data/package-lock.json
RUN npm install
COPY . /data
RUN npm run-script build

FROM harbor.dev.rdev.tech/common/nginx:1.13

COPY --from=stage-build /data/dist /opt/neeko
COPY nginx.conf /etc/nginx/conf.d/default.conf
