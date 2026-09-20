import multer from "multer"

const almacenamiento = multer.memoryStorage();

const upload = multer({
  storage: almacenamiento,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

export default upload