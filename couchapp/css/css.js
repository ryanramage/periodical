define([
    'jscss',
    'text!./app.css',
    'text!./normalize.css',
    'text!./foundation.min.css'
], function(jscss, a, base, pure, select2){
    jscss.embed(base);
    jscss.embed(pure);
    jscss.embed(select2);
    jscss.embed(a);
});