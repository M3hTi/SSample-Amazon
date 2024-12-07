# Setting Up a Local Server with Python

This guide explains how to set up and use a local server using Python's built-in HTTP server.

## Prerequisites
- Python installed on your computer
- Your project files in a directory

## Steps to Start the Server

1. Open your terminal or command prompt

2. Navigate to your project directory:
   ```bash
   cd path/to/your/project
   ```

3. Run one of these commands depending on your Python version:
   - For Python 3:
     ```bash
     python -m http.server 8000
     ```
   - For Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```

4. You should see a message like:
   ```
   Serving HTTP on 0.0.0.0 port 8000 ...
   ```

## Accessing Your Website

1. Open your web browser

2. Type one of these URLs in the address bar:
   - `http://localhost:8000`
   - or `http://127.0.0.1:8000`

3. Your website should now be visible in the browser

## Important Notes

- The server will serve files from the directory where you started it
- Keep the terminal window open while using the server
- To stop the server, press `Ctrl + C` in the terminal
- If port 8000 is in use, you can try a different port (e.g., 8080, 3000)
- The server automatically refreshes when you make changes to your files

## Troubleshooting

1. If you get a "port already in use" error:
   - Try a different port number
   - Check if another server is running
   - Restart your computer if needed

2. If files don't update:
   - Clear your browser cache
   - Do a hard refresh (Ctrl + F5)

3. If you can't access the server:
   - Make sure you're in the correct directory
   - Check if Python is installed correctly
   - Verify your firewall settings

## Benefits of Using Python's HTTP Server

- Simple to set up and use
- No additional software needed
- Works on all major operating systems
- Perfect for local development
- Automatically serves index.html files
