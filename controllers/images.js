//POST Request
const add = (req,res,next) => {
    let tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.jpg');
    if (path.extname(req.files.file.name).toLowerCase() === '.jpg') {
        fs.rename(tempPath, targetPath, err => {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, () => {
            if (err) throw err;
            console.error("Only .jpg files are allowed!");
        });
    }
}

//GET Request
const findById = (req,res,next) => {
    console.log('Request Type:', req.method);
    console.log('Request ID parameter: ',req.params.id);
    res.sendfile(path.resolve(`./uploads/${req.params.id}.jpg`));
}

module.exports = {
    add,
    findById
}