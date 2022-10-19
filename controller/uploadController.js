const multer = require("multer");

const uploadController = async (req, res) => {
  try {
    /**
     * File path & file name defining
     */

    const storage = multer.diskStorage({
      destination: (req, file, callBack) => {
        callBack(null, "uploads");
      },
      filename: (req, file, callBack) => {
        callBack(null, file.originalname);
      },
    });

    const upload = multer({
      storage: storage,
      /**
       * File filtering
       * @param {*} req
       * @param {*} file
       * @param {*} cb
       * @returns
       */
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error("Only jpg is allowed"));
        }
      },
    }).array("files", 12);

    /**
     *
     */
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
        return;
      } else if (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
        return;
      }

      res.status(201).json({
        status: "success",
        message: "Image upload is successfull",
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Not worked",
    });
  }
};

module.exports = uploadController;
