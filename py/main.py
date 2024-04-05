#!/usr/bin/env python3
import time
import asyncio
import pynput
import websockets

mctrl=pynput.mouse.Controller()
ltime=time.time()

async def handler(websocket):
    global ltime
    while True:
        try:
            message=await websocket.recv()
        except websockets.ConnectionClosedOK:
            break
        # ctime=time.time()
        print(message+"              ",end="\r")
        msg=message.split(",")
        if msg[0]=="move":
            mx=int(msg[1])
            my=int(msg[2])
            if not (mx==0 and my==0):
                mctrl.move(mx,my)
        elif msg[0]=="press":
            if msg[1][0]=="l":
                btn=pynput.mouse.Button.left
            elif msg[1][0]=="r":
                btn=pynput.mouse.Button.right
            if msg[1][1]=="s":
                # print("\n\npress")
                mctrl.press(btn)
            elif msg[1][1]=="e":
                # print("\n\nrelease")
                mctrl.release(btn)
        # rate limiter. remove it to lower the latency, may use more CPU resources.
        # ctime=time.time()
        # wtime=0.010-(ctime-ltime)
        # ltime=ctime
        # if wtime>0:
            # await asyncio.sleep(wtime)
            # time.sleep(wtime)
        await asyncio.sleep(0.006)
        await websocket.send("OK")

async def main():
    async with websockets.serve(handler,"",8001):
        await asyncio.Future()

if __name__=="__main__":
    asyncio.run(main())
