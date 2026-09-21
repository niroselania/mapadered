FROM node:22-alpine
WORKDIR /app
COPY index.html server.js ./
RUN mkdir -p /data
EXPOSE 80
CMD ["node", "server.js"]
