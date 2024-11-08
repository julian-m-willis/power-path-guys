FROM python:3.12-slim

WORKDIR /usr/src/app

# Copy and install dependencies
COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY ./ /usr/src/app

# Make the entrypoint script executable
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose the port for the application
EXPOSE 80

# Use the entrypoint script to run the seed and start the server
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
