@echo off
@echo Deleting all BIN, OBJ folders...
for /d /r . %%d in (bin,obj) do @if exist "%%d" rd /s/q "%%d"

@echo.
@echo BIN and OBJ 两个文件夹都已经删除干净了 :) 可以关闭掉这个窗体了。
@echo.
@echo.
pause > nul