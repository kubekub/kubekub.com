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
xcopy /s build docs
xcopy CNAME docs
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