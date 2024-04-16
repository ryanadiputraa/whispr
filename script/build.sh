#!/bin/bash
# Extract command line arguments
server_port="$1"

mysql_host="$2"
mysql_port="$3"
mysql_user="$4"
mysql_password="$5"
mysql_db="$6"

jwt_secret="$7"

# Define the ENV content with placeholders replaced by command line arguments
ENV_CONTENT="
PORT=$server_port

DB_HOST=$mysql_host
DB_PORT=$mysql_port
DB_USERNAME=$mysql_user
DB_PASSWORD=$mysql_password
DB_DATABASE=$mysql_db

JWT_SECRET=$jwt_secret
"

# Write the ENV content to the file
echo "$ENV_CONTENT" > .env.production

echo "ENV config has been written to .env.production"