(function () {

var _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , yaml = require('js-yaml')
  , async = require('async')
  , kitten
  , mdExts = ['md', 'mdown', 'markdown']
  , requiredFields = [
      'layout'
    , 'title'
    , 'date'
    ]
  , defaults = {
      published: true
    , categories: []
    };

kitten = {
  load: function (path, cb) {
    fs.stat(path, function (err, stat) {
      if(err) {
        return cb(err, null);
      }

      if(stat.isFile()) {
        kitten._loadFile(path, cb);
      }
      else {
        kitten._loadDirectory(path, cb);
      }
    });
  }
, _loadFile: function (file, cb) {
    fs.readFile(file, function (err, data) {
      var resp
        , header
        , content
        , basename = path.basename(file)
        , errorLoadingText = 'Error loading ' + basename + ': ';

      if(err) {
        return cb(errorLoadingText + err, null);
      }

      // Convert buffer to string
      data = data.toString();

      // Find the YAML header
      header = data.match(/^---(.|\s)+?(?=---)/);

      if(!header) {
        return cb(errorLoadingText + 'No YAML header found', null);
      }

      // Find the post content
      content = data.substring(data.lastIndexOf('---') + 3).trim();

      // Remove '---'; JS has no negative lookbehind ):
      header = header[0].substring(3).trim();

      // Parse the header
      try {
        header = yaml.safeLoad(header);
      }
      catch (e) {
        return cb(errorLoadingText + 'The YAML header was malformed (' + e + ')', null);
      }

      // Check for required fields
      for(var i=0, ii=requiredFields.length; i<ii; i++) {
        if(header[requiredFields[i]] == null) {
          return cb(errorLoadingText + 'The YAML header is missing the required ' + requiredFields[i] + ' field');
        }
      }

      // Set defaults
      header = _.extend({}, defaults, header);

      // Parse `date` into a javascript Date object
      header.date = new Date(header.date);

      // Make sure `published` is a bool
      header.published = (header.published == 'true' || header.published === true);

      cb(null, _.extend({}, header, {content: content}));
    });
  }
, _loadDirectory: function (directory, cb) {
    var self = this
      , basename = path.basename(directory)
      , errorLoadingText = 'Error loading ' + basename + ': '
      , loaders = {};

    fs.readdir(directory, function (err, files) {
      if(err) {
        return cb(errorLoadingText + err, null);
      }

      files = _.filter(files, function (filePath) {
        // Returns true if file extension is a known markdown alias
        return mdExts.indexOf(filePath.split('.').pop().toLowerCase()) >= 0;
      });

      _.each(files, function (filePath) {
        var fullPath = path.join(directory, filePath)
          , baseName = path.basename(fullPath);

        loaders[baseName] = function (next) {
          self._loadFile(fullPath, function (err, data) {
            if(err) {
              next(err);
            }
            else {
              next(null, data);
            }
          });
        };
      });

      async.series(loaders, function (err, data) {
        if(err) {
          cb(err, null);
        }
        else {
          cb(null, data);
        }
      });
    });
  }
};

module.exports = kitten;

}());
