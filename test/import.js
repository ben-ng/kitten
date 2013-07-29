(function () {

var kitten = require('../lib')
  , assert = require('assert-diff')
  , path = require('path')
  , tests
  , fixtureDir = path.join(__dirname, 'fixtures')
  , goodDir = path.join(fixtureDir, 'good')
  , goodPostPath = path.join(goodDir, 'good.md')
  , badDir = path.join(fixtureDir, 'bad')
  , badPostPath = path.join(badDir, 'bad.md')
  , goodPostExpected = {
      layout: 'post'
    , title: 'Lost Souls'
    , date: new Date('2112-05-19 21:12')
    , comments: false
    , categories: ['Depressing', 'Fleeting']
    , published: true
    , content: '# Lost Souls\n\
\n\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.'
    }
  , badPostExpectedError = new RegExp('Error loading ' + path.basename(badPostPath) + ': The YAML header was malformed.*')
  , badPostExpected = {error: badPostExpectedError};

tests = {
  'import good file': function (next) {
    kitten.load(goodPostPath, function (err, post) {

      assert.equal(err, null, err);
      assert.deepEqual(post, goodPostExpected, 'The post should match our expected object');

      next();
    });
  }
, 'import bad file': function (next) {
    kitten.load(badPostPath, function (err, post) {
      assert.notEqual(err.match(badPostExpectedError) , null, 'There should be a malformed header error');
      assert.equal(post, null, 'Post should be null');

      next();
    });
  }
, 'import bad folder': function (next) {
    kitten.load(badDir, function (err, posts) {
      assert.notEqual(err.match(badPostExpectedError) , null, 'There should be a malformed header error');
      assert.equal(posts, null, 'Posts should be null');

      next();
    });
  }
, 'import good folder': function (next) {
    var baseName = path.basename(goodPostPath)
      , expected = {};

    expected[baseName] = goodPostExpected;

    kitten.load(goodDir, function (err, posts) {
      assert.equal(err, null, err);
      assert.deepEqual(posts
        , expected, 'The result should match our expected object');
      next();
    });
  }
};

module.exports = tests;

}());
