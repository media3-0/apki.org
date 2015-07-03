set OLDDIR=%~dp0
cd /d %OLDDIR%
rails server -b 0.0.0.0

pause