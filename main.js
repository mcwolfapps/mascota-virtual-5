// Envoltorio opcional para escritorio: ventana transparente, siempre encima, con clics que atraviesan.
const {app,BrowserWindow,screen,ipcMain,globalShortcut}=require('electron');
const path=require('path');
let win;
app.whenReady().then(()=>{
  const {x,y,width,height}=screen.getPrimaryDisplay().workArea;
  win=new BrowserWindow({x,y,width,height,transparent:true,frame:false,hasShadow:false,resizable:false,
    alwaysOnTop:true,webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true}});
  win.setAlwaysOnTop(true,'screen-saver');
  win.setIgnoreMouseEvents(true,{forward:true});   // por defecto, los clics pasan a tus otras apps
  win.loadFile('index.html');
  ipcMain.on('interactive',(_e,on)=>win.setIgnoreMouseEvents(!on,{forward:true}));
  globalShortcut.register('CommandOrControl+Shift+Q',()=>app.quit());   // salir
});
app.on('window-all-closed',()=>app.quit());
