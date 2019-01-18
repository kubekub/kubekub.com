@ECHO off   


goto %1

:default
echo DEFAULT
goto :eof

:install-ruby
choco uninstall ruby
choco install ruby --version 2.3.3
choco install ruby2.devkit
goto :eof


:install-bundler
gem install bundler
goto :eof


:clean
echo CLEAN
goto :eof