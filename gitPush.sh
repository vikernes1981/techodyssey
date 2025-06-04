#!/bin/bash

# Exit on error
set -e

# Change branch
git checkout -B portfolio-version 

# Ask for commit message
read -p "Enter commit message: " msg

# Stage everything
git add .

# Commit with message
git commit -m "$msg"

# Push to main branch
git push origin portfolio-version 

# Done
echo "✅ Code pushed to GitHub!"

