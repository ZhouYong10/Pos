/**
 * Created by zhouyong on 14-8-28.
 */

var settings = require('../dbSettings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT),{safe:true});