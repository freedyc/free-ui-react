var sass = require('node-sass');
var fs = require('fs');
var fileName = 'modal.scss';
var outFileName = fileName.replace(/scss$/, "css");

sass.render({
    file: fileName,
    outputStyle: 'expanded',
    outFile: outFileName,
    sourceMap: true
}, function(err, result){
    if (!err) {
        fs.writeFileSync(outFileName, result.css);
        fs.writeFileSync(outFileName + '.map', result.map);
    } else {
        console.log('err')
    }
})

var minCss = sass.renderSync({
    file: fileName,
    outputStyle: 'compressed',
    outFile: 'outFileName',
    sourceMap: true
});
fs.writeFileSync(outFileName.replace(/css$/, 'min.css'), minCss.css);
