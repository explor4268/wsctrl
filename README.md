# wsctrl

Control your PC (and maybe Dolphin Emulator with DSU protocol) with your phone by moving your phone like a Wiimote from just a web interface!


## Running the server

### You may create a Python virtual environment first:

```bash
python3 -m venv venv # Replace the last venv and all other venv below with your desired path of your virtual environment
. venv/bin/activate # you may adjust this depending of your shell
```

### Running the WebSocket server with Python:

```bash
pip install -r requirements.txt
cd py/
python3 main.py
```

### Running the front-end HTTP server:

Use whatever static HTTP server as you wish **to serve the `js/` folder.** (e.g. `cd js/ && python3 -m http.server PORT`)
However, to make this work the page must be run with [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). **Visiting the server by directly using your local IP Address (e.g. `http://192.168.x.x/`) does not work.**
- You have to tunnel the server with SSH forwarding on the client (e.g. with [Termux](https://github.com/termux/termux-app) and running `ssh USERNAME@YOUR_HOST_IP_OR_NAME -L THIS_DEVICE_PORT:localhost:YOUR_HTTP_SERVER_PORT -L 8081:localhost:8081`) then visiting `http://localhost:THIS_DEVICE_PORT/`.
- Alternatively, you can use reverse tunnel to expose the server to the public **with HTTPS** (e.g. ngrok, Cloudflare Tunneling) and visiting it from there (you may change the port configuration in `js/client.js` and `py/main.py` to the correct host and port)

Currently, there is no npm dependencies for the JavaScript front-end, so it is completely vanilla.

## TODO

- [ ] More controls
- [ ] Fix moving while phone is tiled (so the cursor movement is not tilted too)
- [ ] DSU
- [ ] Not to hard-code the Websocket port 8001 and make it as a command-line options.
- [ ] Built-in HTTP server
- [ ] Fix other bugs
