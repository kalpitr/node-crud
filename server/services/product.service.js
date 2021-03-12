const pool = require("../dbconfig/dbconfig");

module.exports = {
  createProduct: (data, callBack) => {
    pool.getConnection((err, connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        }
        const sql =
          "INSERT INTO products (productName,categoryId) VALUES (?,?)";
        const insertSql = [data.productName, data.categoryId];
        connection.query(sql, insertSql, (err, results) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }

          let lastInsertedId = results.insertId;

          const getSql =
            "SELECT products.*,category.categoryName FROM products inner join category on products.categoryId = category.id where products.id = ?";
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

  getAllProducts: (queries, callBack) => {
    // const { page, limit } = queries;

    // const startIndex = (page - 1) * limit;

    // var sql =
    //   "SELECT products.*,category.categoryName FROM products inner join category on products.categoryId = category.id ";

    // if (page && limit) {
    //   sql += ` LIMIT ${limit} OFFSET ${startIndex}`;
    // }

    // pool.query(sql, (err, results) => {
    //   if (err) {
    //     return callBack(err);
    //   }
    //   return callBack(null, results);
    // });

    pool.getConnection((err, connection) => {
      var data;
      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        }
        const { page, limit } = queries;

        const startIndex = (page - 1) * limit;

        var sql =
          "SELECT products.*,category.categoryName FROM products inner join category on products.categoryId = category.id ";

        if (page && limit) {
          sql += ` LIMIT ${limit} OFFSET ${startIndex}`;
        }
        connection.query(sql, (err, results) => {
          if (err) {
            return connection.rollback((_) => {
              throw err;
            });
          }
          data = results;
          var sqlGet = "SELECT count(*) as count from products";
          connection.query(sqlGet, (err, results) => {
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
              callBack(null, results, data);
            });
          });
        });
      });
    });
  },
  deleteProduct: (productId, callBack) => {
    var sql = "DELETE FROM products where id = ?";
    const insertSql = [productId];

    pool.query(sql, insertSql, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },
  editProduct: (data, param, callBack) => {
    pool.getConnection((err, connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        }
        var sql =
          "UPDATE products SET productName = ? , categoryId = ?  WHERE id = ?";
        var insertSql = [data.productName, data.categoryId, param.id];
        connection.query(sql, insertSql, (err, results) => {
          if (err) {
            return connection.rollback((_) => {
              throw err;
            });
          }
          var sqlGet =
            "SELECT products.*,category.categoryName  FROM products inner join category on products.categoryId = category.id WHERE products.id = ?";
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
