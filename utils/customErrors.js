//ValidationError при невалидных данных]
//CastError при кривом Id
//DocumentNotFoundError если не найден по Id

const BAD_REQUEST = 400;
const NOT_FOUND_STATUS = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.errorMessage = (err, req, res) => {
  if (err.name === "CastError") {
    res.status(BAD_REQUEST).send({
      message: "Переданы некорректные данные при данной операции",
    });
    return;
  }
  if (err.name === "ValidationError") {
    res.status(BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }
  if (err.name === "DocumentNotFoundError") {
    res.status(NOT_FOUND_STATUS).send({
      message: "Запрашиваемые данные по указанному _id не найдены",
    });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({
    message: "Внутренняя ошибка сервера",
  });
};
