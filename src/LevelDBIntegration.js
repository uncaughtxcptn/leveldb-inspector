import { ipcMain } from 'electron';
import level from 'level';

// global store for db connections
const dbStore = {};
const levelOpenDefaults = {
  path: './',
  createIfMissing: false,
  valueEncoding: 'json',
  ipcEvent: null
};

/**
 * This method will connect to a leveldb database and store a reference to dbStore.
 * Note that leveldb only allows a single connection at a time so you need to
 * explicitly close the connection to allow other processes to access it.
 */
function connectToLevelDb(options) {
  const { path, createIfMissing, valueEncoding, ipcEvent } = { ...levelOpenDefaults, ...options };
  if (path in dbStore && dbStore[path].isOpen()) {
    ipcEvent.returnValue = {
      status: 'success',
      path: path
    };
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
      } else {
        console.error(err);
      }
    } else {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'success',
          path: path
        };
      } else {
        console.log(`Sucessfully connected to ${path}`);
      }
    }
  });
  dbStore[path] = db;
  return db;
}

/*
 * Get an instance of an opened leveldb that you can operate with
 */
function getOpenedDB(path, ipcEvent) {
  if (path in dbStore === false) {
    if (ipcEvent) {
      ipcEvent.returnValue = {
        status: 'failed',
        message: 'Cannot find database.'
      };
    }
    return null;
  }
  const db = dbStore[path];
  if (!db.isOpen()) {
    if (ipcEvent) {
      ipcEvent.returnValue = {
        status: 'failed',
        message: 'The database is not open.'
      };
    }
    return null;
  }
  return db;
}

/*
 * List the keys inside the leveldb database.
 */
function getKeys(options) {
  const { path, ipcEvent } = { path: './', ipcEvent: null, ...options };
  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }
  const keys = [];
  db.createKeyStream()
    .on('data', key => {
      keys.push(key);
    })
    .on('error', function(err) {
      console.log(err);
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'failed',
          message: 'Cannot fetch keys from the database.'
        };
      }
    })
    .on('end', function() {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'success',
          keys
        };
      } else {
        console.log(`Keys in ${path}: ${keys}`);
      }
    });
}

/*
 * Get the value given the key
 */
function getValue(options) {
  const { path, key, ipcEvent } = { path: './', key: '', ipcEvent: null, ...options };
  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }
  db.get(key, function(err, value) {
    if (err) {
      if (err.notFound) {
        if (ipcEvent) {
          ipcEvent.returnValue = {
            status: 'failed',
            message: `${key} is not in ${path}`
          };
        }
        return;
      }
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'failed',
          message: `Failed to get ${key} in ${path}`
        };
      }
      console.log(err);
      return;
    }

    if (ipcEvent) {
      ipcEvent.returnValue = {
        status: 'success',
        value
      };
    } else {
      console.log(`${path} -> ${key}: ${value}`);
    }
  });
}

function enableDBConnect() {
  ipcMain.on('connect-to-leveldb', (event, params) => {
    connectToLevelDb({ ...params, ipcEvent: event });
  });
}

function enableGetKeys() {
  ipcMain.on('get-db-keys', (event, params) => {
    getKeys({ ...params, ipcEvent: event });
  });
}

function enableGetValue() {
  ipcMain.on('get-value-by-key', (event, params) => {
    getValue({ ...params, ipcEvent: event });
  });
}

export { enableDBConnect, enableGetKeys, enableGetValue };
