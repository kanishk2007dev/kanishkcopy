#!/bin/bash

# A script to automate the git commit and push process.

# Check if a commit message was provided
if [ -z "$1" ]; then
    echo "Error: Please provide a commit message."
    echo "Usage: bash git-push.sh 'Your commit message'"
    exit 1
fi

# Add all changes to the staging area
git add .
echo "Added all changes to Git staging."

# Commit the changes using the provided message
git commit -m "$1"
echo "Committed changes with message: '$1'"

# Push the committed changes to the 'main' branch (assuming 'origin' is your remote)
git push origin main
echo "Successfully pushed changes to GitHub."
