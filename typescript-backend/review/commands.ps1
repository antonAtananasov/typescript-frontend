# За да работи typescript пакета, е необходимо папката с инсталация на node да е видима в средата на конзолата
$env:path = $env:path+";"+"C:\Users\...\...\...\node-v22.16.0-win-x64"
# За да започнете js проект и да можете да инсталирате пакети
npm.cmd init
# За да инсталирате пакет или няколко пакета
npm.cmd install package1 package2 ...
# За да изпълните js
node.exe script.js
# За да изпълните ts
npx.cmd tsx script.ts
