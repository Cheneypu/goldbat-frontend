@echo off
cd /d C:\Users\chene\ai-guide
call ..\tts_env\Scripts\activate
python speak.py

echo 正在播放 output.wav...
start output.wav
pause
