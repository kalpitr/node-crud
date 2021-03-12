const pool = require("../dbconfig/dbconfig");

module.exports = {
  createCategory: (data, callBack) => {
    pool.getConnection((err, connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        }
        const sql = "INSERT INTO category (categoryName) VALUES (?)";
        const insertSql = [data.categoryName];
        connection.query(sql, insertSql, (err, results) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }

          let lastInsertedId = results.insertId;

          const getSql = "SELECT * FROM category where id = ?";
          const insertGetSql = [lastInsertedId];
          connection.query(getSql, insertGetSql, (err, results) => {
            if (err) {
              return connection.rollback(() => {
                throw err;
              });
            }
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  throw err;
                });
              }
              connection.release();
              callBack(null, results);
            });
          });
        });
      });
    });
  },

  getAllCategories: (callBack) => {
    var sql = "SELECT * FROM category";

    pool.query(sql, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },
  deleteCategory: (categoryId, callBack) => {
    var sql = "DELETE FROM category where id = ?";
    const insertSql = [categoryId];

    pool.query(sql, insertSql, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },
  editCategory: (data, param, callBack) => {
    pool.getConnection((err, connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        }
        var sql = "UPDATE category SET categoryName = ?  WHERE id = ?";
        var insertSql = [data.categoryName, param.id];
        connection.query(sql, insertSql, (err, results) => {
          if (err) {
            return connection.rollback((_) => {
              throw err;
            });
          }
          var sqlGet = "SELECT *  FROM category  WHERE id = ?";
          var insertSqlGet = [param.id];
          connection.query(sqlGet, insertSqlGet, (err, results) => {
            if (err) {
              return connection.rollback((_) => {
                throw err;
              });
            }
            connection.commit((err) => {
              if (err) {
                connection.rollback((_) => {
                  throw err;
                });
              }
              connection.release();
              callBack(null, results);
            });
          });
        });
      });
    });
  },
};
