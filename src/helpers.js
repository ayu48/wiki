var hbs = require('hbs');
var marked = require('marked');
var highlight = require('highlight.js');
var emoji = require('emoji-images');

// constants
var EMOJI_DIR = '/img/emojis';
var EMOJI_SIZE = 22;


// set syntax highlighter to marked renderer
var options = {
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
};
marked.setOptions(options);


hbs.registerHelper('time', function (timestamp) {
    var t = new Date(timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = t.getFullYear();
    var month = months[t.getMonth()];
    var date = t.getDate();
    var hour = t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();

    var time = month+' '+date+', '+year+' '+hour+':'+min+':'+sec;
    return time;
});


/**
 * Registers `marked` helper.
 *
 * This helper parses the inside block as markdown and renders as html
 * with default settings of `marked` module.
 *
 * See https://github.com/chjj/marked for details.
 */
hbs.registerHelper('marked', function (options) {

    var markdownString = options.fn(this);

    return emoji(marked(markdownString), EMOJI_DIR, EMOJI_SIZE);

});
