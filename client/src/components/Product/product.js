import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import axios from "axios";

const Product = () => {
  const [editFlag, setEditFlag] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(null);

  const [fields, setFields] = useState({
    id: "",
    productName: "",
    categoryId: "",
    categoryName: "",
  });

  const handleChange = (event, val) => {
    console.log(val);
    setPage(val);
  };

  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/product/getallproducts?limit=10&page=${page}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.result);
        setProductCount(res.data.totalProducts);
      })
      .catch((err) => console.log(err));
    axios
      .get("/api/category/getcategories")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editFlag) {
      axios
        .put(`/api/product/updateproduct/${fields.id}`, fields)
        .then((res) => {
          const editProductValue = res.data.product[0];
          product.map((data, index) => {
            if (data.id == editProductValue.id) {
              (data.productName = editProductValue.productName) &&
                (data.categoryId = editProductValue.categoryId) &&
                (data.categoryName = editProductValue.categoryName);
            }
          });
          setFields("");
          setEditFlag(false);
          setOpen(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/api/product/createproduct", fields)
        .then((res) => {
          setProduct([...product, res.data.product[0]]);
          setFields("");
          setOpen(false);
          setEditFlag(false);
          //   setProductCount()
        })
        .catch((err) => console.log(err));
    }
  };
  const handleEdit = (data) => {
    setEditFlag(true);
    setFields({
      id: data.id,
      productName: data.productName,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
    });
    setOpen(true);
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    axios.delete(`/api/product/deleteproduct/${deleteId}`).then((res) => {
      console.log(res);
      setProduct(product.filter((el) => el.id !== deleteId));
      setOpenDeleteModal(false);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFields("");
    setOpenDeleteModal(false);
    setOpen(false);
    setEditFlag(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                required
                id="standard-basic"
                label="Product Name"
                value={fields.productName}
                onChange={(e) =>
                  setFields({ ...fields, productName: e.target.value })
                }
              />
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fields.categoryId}
                onChange={(e) =>
                  setFields({ ...fields, categoryId: e.target.value })
                }
              >
                {category.map((data) => {
                  return (
                    <MenuItem value={data.id}>{data.categoryName}</MenuItem>
                  );
                })}
              </Select>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <table>
        <tr>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Category Id</th>
          <th>Category Name</th>
          <th>Action</th>
        </tr>
        {product.map((data) => {
          return (
            <tr>
              <td>{data.id}</td>
              <td>{data.productName}</td>
              <td>{data.categoryId}</td>
              <td>{data.categoryName}</td>
              <td colSpan="2">
                <button onClick={() => handleEdit(data)}>edit</button>
                <button onClick={() => handleDeleteModal(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      {productCount > 0 && (
        <Pagination
          onChange={handleChange}
          count={Math.ceil(productCount / 10)}
          variant="outlined"
          shape="rounded"
        />
      )}

      <Dialog
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you Sure you want to delete record ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Product;
