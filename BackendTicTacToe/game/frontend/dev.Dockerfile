FROM node:lts

WORKDIR /app

# Expose ports
EXPOSE 8080

# Start
CMD while true; do ping 127.0.0.1; sleep 60; done > /dev/null 2>&1
