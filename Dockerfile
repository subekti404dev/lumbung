FROM node:20.10.0-alpine3.18 as builder
RUN apk update && apk add --no-cache docker docker-compose curl procps && \
    rm -rf /var/cache/apk/*
WORKDIR /app
COPY backend /app/backend
COPY frontend /app/frontend
RUN npm install -g pnpm
RUN cd /app/backend && \
    pnpm i && pnpm run build

RUN cd /app/frontend && \
    pnpm i && pnpm run build 

FROM node:20.10.0-alpine3.18
WORKDIR /app
COPY --from=builder /usr/bin/docker /usr/bin/docker
COPY --from=builder /usr/bin/docker-compose /usr/bin/docker-compose
COPY --from=builder /app/frontend/dist /app/web
COPY --from=builder /app/backend/single/index.cjs /app/index.cjs
COPY /scripts/run.sh /usr/local/bin/omah
RUN chmod +x /usr/local/bin/omah

EXPOSE ${PORT:-7000}
CMD ["omah"]
