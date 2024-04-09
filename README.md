# wsctrl

Control your PC (and maybe Dolphin Emulator with DSU protocol) with your phone by moving your phone like a Wiimote from just a web interface!

## Running

```bash
# You may create a Python virtual environment first.
python3 -m venv venv # Replace the last venv and all other venv below with your desired path of your virtual environment
. venv/bin/activate # you may adjust this depending of your shell
```
```bash
pip install -r requirements.txt
cd py/
python3 main.py
```

## TODO
- More controls
- Fix moving while phone is tiled (so the cursor movement is not tilted too)
- DSU
- Fix other bugs
