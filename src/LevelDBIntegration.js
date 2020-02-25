import { ipcMain } from 'electron';
import level from 'level';

// global store for db connections
const dbStore = {};

/**
 * This method will connect to a leveldb database and store a reference to dbStore.
 * Note that leveldb only allows a single connection at a time so you need to
 * explicitly close the connection to allow other processes to access it.
 */
function connectToLevelDb(path, createIfMissing = false, valueEncoding = 'json', ipcEvent = null) {
  if (path in dbStore && dbStore[path].isOpen()) {
    return dbStore[path];
  }

  const db = level(path, { createIfMissing, valueEncoding }, (err, value) => {
    if (err) {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'failed',
          message:
            err instanceof level.errors.OpenError
              ? 'Failed to open the database, make sure the database exists or is not opened by another process'
              : err.toString()
        };
        console.error(err);
      } else {
        console.error(err);
      }
    } else {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'success',
          path: path,
          value
        };
      } else {
        console.log(`Sucessfully connected to ${path}`);
      }
    }
  });
  dbStore[path] = db;
  return db;
}

function enableDBConnect() {
  ipcMain.on('connect-to-leveldb', (event, params) => {
    connectToLevelDb(params.path, params.createIfMissing || false, params.valueEncoding || 'json', event);
  });
}

export { enableDBConnect };
