import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import axios from "axios";

const Category = () => {
  const [editFlag, setEditFlag] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [category, setCategory] = useState([]);
  const [fields, setFields] = useState({ id: "", categoryName: "" });

  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get("/api/category/getcategories")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editFlag) {
      axios
        .put(`/api/category/updatecategory/${fields.id}`, fields)
        .then((res) => {
          const editCategoryValue = res.data.category[0];
          category.map((data, index) => {
            if (data.id == editCategoryValue.id) {
              data.categoryName = editCategoryValue.categoryName;
            }
          });
          setFields("");
          setOpen(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/api/category/createcategory", fields)
        .then((res) => {
          setCategory([...category, res.data.category[0]]);
          setFields("");
          setOpen(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleEdit = (data) => {
    setEditFlag(true);
    setFields({
      id: data.id,
      categoryName: data.categoryName,
    });
    setOpen(true);
  };

  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    axios.delete(`/api/category/deletecategory/${deleteId}`).then((res) => {
      console.log(res);
      setCategory(category.filter((el) => el.id !== deleteId));
      setOpenDeleteModal(false);
    });
  };

  const handleCategoryName = (e) => {
    setFields({ ...fields, categoryName: e.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFields("");
    setOpen(false);
    setOpenDeleteModal(false);
    setEditFlag(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Category
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
                id="standard-basic"
                label="Category Name"
                required
                value={fields.categoryName}
                onChange={(e) => handleCategoryName(e)}
              />
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
          <th>Category Id</th>
          <th>Category Name</th>
          <th>Action</th>
        </tr>
        {category.length > 0 &&
          category.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
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

export default Category;
