var hbs = require('hbs');
var marked = require('marked');

hbs.registerHelper('time', function (timestamp) {
    var t = new Date(timestamp*1000);
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
    return marked(markdownString);
});
