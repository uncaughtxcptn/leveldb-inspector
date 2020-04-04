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

function _handleError(err, ipcEvent) {
  if (ipcEvent) {
    ipcEvent.returnValue = {
      status: 'failed',
      message: err.toString()
    };
  } else {
    console.error(err);
  }
}

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

/**
 * Close an open connection to a leveldb database
 */
function closeDB(options) {
  const { path, ipcEvent } = { path: './', ipcEvent: null, ...options };

  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }

  db.close().then(err => {
    if (err) {
      _handleError(err, ipcEvent);
    } else {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'success'
        };
      } else {
        console.log(`Sucessfully closed ${path}`);
      }
    }
  });
}

/**
 * List the keys and values inside the leveldb database.
 */
function getKeyValues(params) {
  const { path, ipcEvent, options } = { path: './', ipcEvent: null, options: {}, ...params };
  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }
  const data = {};
  db.createReadStream(options)
    .on('data', res => {
      data[res.key] = res.value;
    })
    .on('error', function(err) {
      _handleError(err, ipcEvent);
    })
    .on('end', function() {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'success',
          data
        };
      } else {
        console.log(`Values in ${path}: ${data}`);
      }
    });
}

/**
 * Get the value given the key
 */
function getValue(params) {
  const { path, key, ipcEvent, options } = { path: './', key: '', ipcEvent: null, options: {}, ...params };
  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }
  db.get(key, options, function(err, value) {
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
      _handleError(err, ipcEvent);
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

/**
 * Set the value of a given key
 * If the key does not exist yet in the database, it will be added to the
 * database
 */
function setValue(params) {
  const { path, key, value, ipcEvent, options } = {
    path: './',
    key: '',
    value: '',
    ipcEvent: null,
    options: {},
    ...params
  };

  if (key === '') {
    _handleError('Key cannot be blank', ipcEvent);
    return;
  }

  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }

  db.put(key, value, options).then(err => {
    if (err) {
      _handleError(err, ipcEvent);
      return;
    }

    if (ipcEvent) {
      ipcEvent.returnValue = {
        status: 'success',
        key,
        value
      };
    } else {
      console.log(`${path} -> ${key}: ${value}`);
    }
  });
}

/**
 * Delete a key from the database
 */
function delValue(params) {
  const { path, key, ipcEvent, options } = { path: './', key: '', ipcEvent: null, options: {}, ...params };
  const db = getOpenedDB(path, ipcEvent);
  if (!db) {
    return;
  }

  db.del(key, options).then(err => {
    if (err) {
      _handleError(err, ipcEvent);
    } else {
      if (ipcEvent) {
        ipcEvent.returnValue = {
          status: 'success'
        };
      } else {
        console.log(`Deleted ${path} -> ${key}`);
      }
    }
  });
}

function enableLevelDB() {
  ipcMain.on('leveldb-command', (event, eventParams) => {
    switch (eventParams.command) {
      case 'connect':
        connectToLevelDb({ ...eventParams.params, ipcEvent: event });
        break;
      case 'get-key-values':
        getKeyValues({ ...eventParams.params, ipcEvent: event });
        break;
      case 'get-value':
        getValue({ ...eventParams.params, ipcEvent: event });
        break;
      case 'close':
        closeDB({ ...eventParams.params, ipcEvent: event });
        break;
      case 'set-value':
        setValue({ ...eventParams.params, ipcEvent: event });
        break;
      case 'del-value':
        delValue({ ...eventParams.params, ipcEvent: event });
        break;
      default:
        event.returnValue = {
          status: 'failed',
          message: 'Invalid command'
        };
    }
  });
}

export { enableLevelDB };
