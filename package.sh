#!/bin/bash

# Create a temporary directory for packaging
mkdir -p dist-chrome

# Copy only the necessary files
cp -r manifest.json dist-chrome/
cp -r popup dist-chrome/
cp -r images dist-chrome/
cp -r dist/yt-bundle.js dist-chrome/dist/
mkdir -p dist-chrome/scripts/instagram
cp scripts/instagram/instagram-content.js dist-chrome/scripts/instagram/

# Create the ZIP file
cd dist-chrome
zip -r ../social-media-signal-maximizer.zip .
cd ..

# Clean up
rm -rf dist-chrome

echo "Package created: social-media-signal-maximizer.zip"