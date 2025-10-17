#!/bin/bash

# A simple script to start The Endurance Run game.

# Check if the 'game.py' file exists
if [ -f "game.py" ]; then
    echo "Starting The Endurance Run..."
    
    # Execute the Python script
    python3 game.py
    
    echo "Game finished."
else
    echo "Error: game.py not found! Make sure you are in the correct directory."
    exit 1
fi
