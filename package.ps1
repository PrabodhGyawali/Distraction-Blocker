# Create a temporary directory for packaging
New-Item -Path "dist-chrome" -ItemType Directory -Force

# Copy only the necessary files
Copy-Item "manifest.json" -Destination "dist-chrome\"
Copy-Item "popup" -Destination "dist-chrome\" -Recurse
Copy-Item "images" -Destination "dist-chrome\" -Recurse

# Create dist directory and copy bundle
New-Item -Path "dist-chrome\dist" -ItemType Directory -Force
Copy-Item "dist\yt-bundle.js" -Destination "dist-chrome\dist\"

# Create scripts/instagram directory and copy content
New-Item -Path "dist-chrome\scripts\instagram" -ItemType Directory -Force
Copy-Item "scripts\instagram\instagram-content.js" -Destination "dist-chrome\scripts\instagram\"

# Create the ZIP file
Compress-Archive -Path "dist-chrome\*" -DestinationPath "social-media-signal-maximizer.zip" -Force

# Clean up
Remove-Item -Path "dist-chrome" -Recurse -Force

Write-Host "Package created: social-media-signal-maximizer.zip"