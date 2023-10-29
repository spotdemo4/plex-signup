# Pull node base image
FROM node:19-buster-slim

#Define environment variables
ARG PLEX_USER
ARG PLEX_PASS
ARG PLEX_SERVER_ID
ARG PLEX_LIBRARY_SECTION_IDS
ARG TZ

ENV PLEX_USER $PLEX_USER
ENV PLEX_PASS $PLEX_PASS
ENV PLEX_SERVER_ID $PLEX_SERVER_ID
ENV PLEX_LIBRARY_SECTION_IDS $PLEX_LIBRARY_SECTION_IDS
ENV TZ $TZ

# Install node dependencies
WORKDIR /svelte
COPY ./package.json .
COPY ./svelte.config.js .
RUN npm install

# Move to container
COPY . .

# Build for production
RUN npm run build

# Launch app
CMD ["node", "build"]
EXPOSE 3000