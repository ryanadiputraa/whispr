#!/bin/bash
# Extract command line arguments
server_port="$1"
server_ws_port="$2"

mysql_host="$3"
mysql_port="$4"
mysql_user="$5"
mysql_password="$6"
mysql_db="$7"

jwt_secret="$8"

google_redirect_url="$9"
google_client_id="${10}"
google_client_secret="${11}"
google_state="${12}"


# Define the ENV content with placeholders replaced by command line arguments
ENV_CONTENT="
PORT=$server_port
WS_PORT=$server_ws_port

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