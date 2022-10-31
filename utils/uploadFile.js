const formidable = require('formidable');
const fs = require('fs');

const removeFile = async (fileName, studentId) => {
  let dirpath = __dirname + `/../public/element/${studentId}`;
  let newpath = `${dirpath}/${fileName}`;

  await fs.unlink(newpath, function (err) {
    if (err) {
      console.error(err);
      return err;
    }
  });
};

const uploadFile = async (files, studentId) => {
  let oldpath = files.myfile.filepath;
  let fileNewName = `${studentId}-${files.myfile.originalFilename}`;

  let dirpath = __dirname + `/../public/element/${studentId}`;
  let newpath = `${dirpath}/${fileNewName}`;

  if (!fs.existsSync(dirpath)){
    await fs.mkdirSync(dirpath);
  }
  
  console.log("newpath", newpath);

  await fs.rename(oldpath, newpath, function (err) {
    if (err) {
      console.error(error);
      res.status(500).render("erreur", { error });
    }
  });

  return {
    path: `/element/${studentId}/${fileNewName}`,
    name: fileNewName,
  }
};

module.exports = {removeFile, uploadFile};