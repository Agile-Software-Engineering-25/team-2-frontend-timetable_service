#!/bin/sh

# Environment Variables Setup und nginx Config Generation
export PORT=${PORT:-80}
export API_URL=${API_URL:-http://localhost:3000/api/}

envsubst '${PORT} ${API_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
