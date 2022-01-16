FROM node:14-alpine AS backend
ARG app_name
WORKDIR /app
COPY /dist/apps/${app_name}/package.json package.json
RUN npm install --production
COPY /dist/apps/${app_name}/ .
CMD ["node", "main.js"]
EXPOSE 3333

FROM node:14-alpine AS frontend-builder
ARG app_name
WORKDIR /app
COPY /dist/apps/${app_name}/ .

FROM nginx:1.15.2-alpine AS frontend
COPY --from=frontend-builder /app /usr/share/nginx/html
EXPOSE 80