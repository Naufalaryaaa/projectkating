# Docker Introduction Video Script
**Target Duration:** 12-15 minutes  
**Resolution:** 1920x1080  
**Audience:** Developers new to Docker

## Opening Sequence (0:00 - 1:30)

### Scene 1: Hook & Problem Setup
**[Screen: Terminal with messy development setup]**

**Narrator:** "It works on my machine..." Sound familiar? Today we're solving the age-old development problem with Docker.

**[Visual: Split screen showing different environments failing]**

**Script:**
> "Hi everyone! I'm [Your Name], and today we're diving into Docker - the tool that will revolutionize how you develop, deploy, and share applications. No more environment setup nightmares, no more 'it works on my machine' excuses."

**[On-screen text: "Docker: Build once, run anywhere"]**

---

## Section 1: What is Docker? (1:30 - 3:00)

### Scene 2: Docker Concept Introduction
**[Visual: Simple container metaphor - shipping containers]**

**Script:**
> "Think of Docker like shipping containers. Just as shipping containers standardize how we transport goods worldwide, Docker containers standardize how we package and run applications."

**[Screen: Diagram showing app + dependencies in container]**

> "A Docker container packages your application with everything it needs - code, runtime, system tools, libraries, and settings. This container runs identically whether you're on Windows, Mac, Linux, or in the cloud."

**Key Points to Cover:**
- Containers vs Virtual Machines (visual comparison)
- Lightweight and fast
- Consistent environments
- Easy deployment

---

## Section 2: Real-World Demo Setup (3:00 - 4:30)

### Scene 3: Demo Introduction
**[Screen: VS Code with your actual porto project]**

**Script:**
> "Let me show you with real applications. I've got two projects here - a modern marketing portfolio website and a live chat system with SQLite database. Perfect examples for learning Docker."

**[Screen: File explorer showing project structure]**

**Applications Overview:**
1. **DigiMax Portfolio** - Static website (HTML/CSS/JS)
2. **LiveChat System** - Node.js app with Socket.io and SQLite

**[Screen: Quick demo of both apps running]**

> "Both apps work perfectly on my development machine. But what happens when I want to share them with a teammate, deploy to production, or run them on a different operating system?"

---

## Section 3: Containerizing Static Website (4:30 - 7:00)

### Scene 4: Simple Dockerfile Creation
**[Screen: Creating Dockerfile for portfolio website]**

**Script:**
> "Let's start with the simpler application - our static portfolio website. I'll create a Dockerfile that packages this into a container."

**[Type slowly and explain each line]**

```dockerfile
# Use nginx as base image
FROM nginx:alpine

# Copy website files to nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx starts automatically
```

**Explanation Points:**
- `FROM` - base image (explain nginx:alpine choice)
- `COPY` - adding our files
- `EXPOSE` - documenting ports
- Lightweight Alpine Linux

### Scene 5: Building and Running
**[Screen: Terminal commands with explanations]**

**Commands to demonstrate:**
```bash
# Build the image
docker build -t digimax-portfolio .

# Run the container
docker run -d -p 8080:80 --name portfolio-demo digimax-portfolio

# Test the application
curl http://localhost:8080
```

**[Screen: Browser showing running website]**

> "And just like that, our website is running in a container! The beauty is this exact same container will run identically on any system with Docker installed."

---

## Section 4: Complex App with Database (7:00 - 10:30)

### Scene 6: Node.js App Dockerfile
**[Screen: LiveChat application]**

**Script:**
> "Now for something more complex - our real-time chat application with a SQLite database. This presents interesting challenges we'll solve with Docker."

**[Create Dockerfile step by step]**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create database directory
RUN mkdir -p /app/database

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

**Key Teaching Points:**
- Multi-stage approach (package.json first)
- Docker layer caching
- Working directory setup
- Production dependencies only

### Scene 7: SQLite Database Challenges
**[Screen: Database file and volume mounting]**

**Script:**
> "Here's where it gets interesting. SQLite stores data in a file, but containers are ephemeral. If we restart the container, we lose our data! Let's fix this with volume mounting."

**[Demonstrate the problem]**
```bash
# Run without volume - data disappears
docker run --rm -p 3000:3000 livechat-app

# Run with volume - data persists
docker run -d -p 3000:3000 -v $(pwd)/database:/app/database livechat-app
```

**[Show database file persisting]**

---

## Section 5: Docker Compose Multi-Service (10:30 - 12:30)

### Scene 8: Introducing Docker Compose
**[Screen: docker-compose.yml file]**

**Script:**
> "Managing multiple containers manually gets tedious. Docker Compose lets us define and run multi-container applications with a simple YAML file."

**[Create/show docker-compose.yml]**

```yaml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped

  livechat:
    build: ./livechat
    ports:
      - "3000:3000"
    volumes:
      - ./livechat/database:/app/database
      - ./livechat/logs:/app/logs
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  default:
    name: digimax-network
```

### Scene 9: Running the Complete Stack
**[Screen: Terminal with docker-compose commands]**

**Commands:**
```bash
# Start everything with one command
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs livechat

# Scale services (bonus)
docker-compose up -d --scale livechat=2
```

**[Screen: Both applications running simultaneously]**

---

## Section 6: Production Considerations (12:30 - 14:00)

### Scene 10: Production Best Practices
**[Screen: Enhanced Dockerfile with multi-stage build]**

**Script:**
> "For production, we need to optimize our containers. Let me show you a multi-stage build that creates smaller, more secure images."

**[Show optimized Dockerfile]**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .
USER nodejs
EXPOSE 3000
CMD ["npm", "start"]
```

**Key Points:**
- Multi-stage builds
- Security (non-root user)
- Smaller final image
- Layer optimization

### Scene 11: Environment Management
**[Screen: .env files and Docker secrets]**

**Topics to cover quickly:**
- Environment variables
- Docker secrets for sensitive data
- Health checks
- Logging strategies
- Backup procedures for SQLite

---

## Section 7: Practical Tips & Troubleshooting (14:00 - 15:00)

### Scene 12: Common Issues and Solutions

**[Screen: Terminal showing debug commands]**

**Script:**
> "Let me share some essential debugging techniques and common gotchas you'll encounter."

**Debug Commands:**
```bash
# Check container logs
docker logs container-name

# Execute commands inside container
docker exec -it container-name sh

# Inspect container details
docker inspect container-name

# Clean up resources
docker system prune
```

**Common Issues:**
1. Port conflicts
2. Volume mounting permissions
3. Database connection issues
4. Image size optimization

---

## Closing (15:00 - 15:30)

### Scene 13: Next Steps and Resources

**[Screen: Recap slide with key benefits]**

**Script:**
> "We've covered a lot today! You've learned how to containerize both simple static sites and complex applications with databases. Docker solves environment consistency, simplifies deployment, and makes your applications truly portable."

**Key Takeaways:**
- ✅ Consistent development environments
- ✅ Easy application sharing
- ✅ Simplified deployment
- ✅ Scalable architecture

**[Screen: Resources and links]**

> "All the code from today's demo is available in the description. Try containerizing your own applications, and remember - if it works on your machine, Docker ensures it works everywhere!"

**Call to Action:**
- Subscribe for more DevOps content
- Try the exercises in the description
- Share your Docker wins in the comments

---

## Technical Notes for Recording

### Screen Recording Setup
- **Resolution:** 1920x1080
- **Font Size:** 16pt minimum for terminal
- **VS Code Theme:** Dark+ (good contrast)
- **Terminal Colors:** High contrast scheme
- **Cursor:** Make visible and large enough

### File Preparation Checklist
- [ ] Clean project directories
- [ ] Reset databases to initial state
- [ ] Prepare command history file
- [ ] Test all commands in sequence
- [ ] Have backup containers ready
- [ ] Prepare error scenarios for debugging section

### Timing Checkpoints
- 1:30 - Docker concept explained
- 3:00 - Demo setup complete
- 7:00 - Simple container working
- 10:30 - Complex app containerized
- 12:30 - Docker Compose demonstrated
- 14:00 - Production considerations covered
- 15:00 - Wrap-up begins

### Critical Commands to Practice
```bash
# Core commands that must work smoothly
docker build -t app-name .
docker run -d -p 8080:80 app-name
docker-compose up -d
docker logs container-name
docker exec -it container-name sh
```

### Backup Plans
- Have pre-built images ready
- Prepare alternative examples
- Keep containers running in background
- Have reset scripts for quick recovery

---

## Post-Production Checklist
- [ ] Add chapter markers at major sections
- [ ] Include code overlays for complex commands
- [ ] Add zoom effects for important file content
- [ ] Include timestamps in description
- [ ] Provide GitHub repository link
- [ ] Create follow-up exercise list