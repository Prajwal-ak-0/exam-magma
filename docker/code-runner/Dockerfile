FROM ubuntu:22.04

# Install necessary packages
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    g++ \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories
RUN mkdir -p /app/code

# Copy run.sh script
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

# Create a non-root user
RUN useradd -m -u 1000 coderunner
RUN chown -R coderunner:coderunner /app

# Set working directory
WORKDIR /app

# Switch to non-root user
USER coderunner

# Set resource limits in the container
ENV MAX_EXECUTION_TIME=5
ENV MAX_MEMORY=512M
ENV MAX_PROCESSES=50

CMD ["sh", "-c", "tail -f /dev/null"]
