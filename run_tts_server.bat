@echo off
cd /d %~dp0
call ..\tts_env\Scripts\activate
python tts_server.py
pause
