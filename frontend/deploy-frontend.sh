#!/bin/bash

# Exit script on any error
set -e

# Step 1: Run the build process
echo "Building the frontend..."
sudo npm run build

# Step 2: Copy the build files to the Nginx directory
echo "Copying build files to /var/www/blog-frontend/..."
sudo cp -r dist/* /var/www/blog-frontend/

# Step 3: Restart Nginx
echo "Restarting Nginx..."
sudo systemctl restart nginx

# Step 4: Confirmation message
echo "Frontend deployment completed successfully!"

