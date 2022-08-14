FROM node:lts

WORKDIR /app

# Expose ports

# Start
CMD while true; do ping 127.0.0.1; sleep 60; done > /dev/null 2>&1