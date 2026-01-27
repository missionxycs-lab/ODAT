# Use Node.js base image
FROM node:18-alpine AS base

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
# We only copy package.json because you don't have a lockfile yet
COPY package.json ./
RUN npm install

# 2. Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_CONVEX_URL
ENV NEXT_PUBLIC_CONVEX_URL=$NEXT_PUBLIC_CONVEX_URL

RUN npm run build

# 3. Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Cloud Run listens on 8080 by default
EXPOSE 8080
ENV PORT 8080

CMD ["npm", "start"]
