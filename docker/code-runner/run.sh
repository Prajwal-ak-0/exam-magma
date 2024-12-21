#!/bin/bash

# Exit on any error
set -e

LANGUAGE=$1
FILE_PATH=$2

# Change to the code directory
cd /app/code

case "$LANGUAGE" in
    "python")
        python3 "$FILE_PATH" 2>&1
        ;;
    "cpp")
        # Compile with detailed error messages
        g++ -Wall -o program "$FILE_PATH" 2>&1
        if [ $? -eq 0 ]; then
            ./program 2>&1
            rm -f program
        fi
        ;;
    "c")
        # Compile with detailed error messages
        gcc -Wall -o program "$FILE_PATH" 2>&1
        if [ $? -eq 0 ]; then
            ./program 2>&1
            rm -f program
        fi
        ;;
    *)
        echo "Unsupported language: $LANGUAGE"
        exit 1
        ;;
esac
