# Build environment
# Static React app
FROM node:22.8.0-bullseye as react-build

# Copy react-app into the local directory in the container
ADD /react-app .

RUN yarn install --production

# Build the app
RUN yarn run build

# Server environment
FROM ghcr.io/zvonimirsun/nginx:stable-alpine-brotli
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"