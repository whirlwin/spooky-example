var Spooky = require('spooky');

var spookyConfig = {
    child: { transport: 'http' },
    casper: { LogLevel: 'error', verbose: false }
};

var spooky = new Spooky(spookyConfig, function(err) {
    if (err) {
        throw new Error(err);
    } else {
        begin();
    }
});

function begin() {
    spooky.start('http://www.google.com');

    spooky.then(function () {
        this.fill('form[action="/search"]', {q: 'Spooky example'}, true);
    });

    spooky.waitFor(function () {
        var title = this.getTitle();
        console.log('The title is now ' + title);
        this.capture('./screenshot.png');
        return title.match(/Spooky example/);
    });

    spooky.then(function() {
        console.log('Spooky example finished');
    });

    spooky.run();
}

spooky.on('console', function(msg) {
    console.log(msg);
});

spooky.on('error', function(e, stack) {
    console.error(e);
    if (stack) { console.error(stack); }
});