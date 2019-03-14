@ECHO off   


goto %1

:default
echo DEFAULT
goto :eof

:install
npm install -g npx
goto :eof

:build
CMD /C npm run build
xcopy /s public docs
xcopy /Y CNAME docs
goto :eof

:clean
rmdir /S /Q .cache
rmdir /S /Q docs
rmdir /S /Q public
goto :eof

:serve
CMD /C npm run develop
goto :eof

:test
echo 1
echo 2
goto :eof


:clean
echo CLEAN
goto :eof