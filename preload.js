const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('overlayAPI',{setInteractive:on=>ipcRenderer.send('interactive',!!on)});
