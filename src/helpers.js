var hbs = require('hbs');

hbs.registerHelper('time', function(timestamp) {
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