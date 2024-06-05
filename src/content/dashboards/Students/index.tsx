import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet-async';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RecentOrders from 'src/content/applications/Transactions/RecentOrders';
import BulkActions from 'src/content/applications/Transactions/BulkActions';

const Students = () => {
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [submitStudentData, setSubmitStudentData] = useState([]);
  const [editingStudentData, setEditingStudentData] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    nameOfStudent: '',
    studentEmail: '',
    studentRollNo: '',
    gender: '',
    studentClass: ''
  });

  // Load data from local storage when component mounts
  useEffect(() => {
    fetchStudentData();
  }, [updateList]);

  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost:4000/student');
      const data = await response.json();
      setSubmitStudentData(data);
    } catch (error) {
      console.error('Error fetching Exam Creation data:', error);
    }
  };

  // Function to handle opening dialog for editing
  const handleEditCard = (data) => {
    setOpen(true);
    setData(data);
    setEditingStudentData(data);
    setImagePreview(data.imagePreview || null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/student/${editingStudentData?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        setSubmitStudentData((prevData) => {
          const newData = prevData.map((item) =>
            item.id === updatedData.id ? updatedData : item
          );
          return newData;
        });
        handleClose();
      } else {
        alert('Failed to save edit');
      }
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save edit');
    }
    setUpdateList(!updateList);
  };

  // Function to handle input change in text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/student', {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUpdateList(!updateList);
      if (response.ok) {
        const newData = await response.json();
        setSubmitStudentData((prevData) => [...prevData, newData]);
        handleClose();
      } else {
        alert('Failed to submit Exam Records');
      }
    } catch (error) {
      console.error('Error submitting Exam Records:', error);
      alert('Failed to submit the Exam Records Data');
    }
  };

  // Function to handle deleting office data
  const handleDelete = async (id: number) => {
    console.log('id ', id);

    try {
      const response = await fetch(`http://localhost:4000/student/${id}`, {
        method: 'DELETE'
      });

      setUpdateList(!updateList);
      if (response.ok) {
        // Update state after successful deletion
        setSubmitStudentData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      } else {
        alert('Failed to delete Exam Record');
      }
    } catch (error) {
      console.error('Error deleting Exam Record:', error);
      alert('Failed to delete Exam Record');
    }
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle opening dialog
  const handleClickOpen = () => {
    setOpen(true);
    setEditingStudentData(null);
    setData({
      nameOfStudent: '',
      studentEmail: '',
      studentRollNo: '',
      gender: '',
      studentClass: ''
    });
    setImagePreview(null);
  };

  // Function to handle Images
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const user = {
    name: 'Akash Chhangani'
  };

  return (
    <>
      <Helmet>
        <title>Students</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Students
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, These are the list of all the Students in our School
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: '0.6rem' }}
              onClick={handleClickOpen}
            >
              <AddTwoToneIcon
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '5px'
                }}
              />
              Create New Subject
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-subjectDescription"
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            sx={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '24px'
            }}
          >
            <AccountCircleIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />
            {editingStudentData ? 'Edit Student' : 'Create Student'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-subjectDescription">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mb={2}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="raised-button-file">
                    <IconButton component="span">
                      <Avatar
                        src={
                          imagePreview ||
                          '/uploads/profileImages/default_avatar.png'
                        }
                        alt="Profile Avatar"
                        style={{ width: '120px', height: '120px' }}
                      />
                    </IconButton>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem' }}
                  id="nameOfStudent"
                  name="nameOfStudent"
                  label="Student Name"
                  variant="outlined"
                  fullWidth
                  value={data.nameOfStudent}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="studentEmail"
                  name="studentEmail"
                  label="Student Email"
                  variant="outlined"
                  fullWidth
                  value={data.studentEmail}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="studentRollNo"
                  name="studentRollNo"
                  label="Roll Number"
                  variant="outlined"
                  value={data.studentRollNo}
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="gender"
                  name="gender"
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  value={data.gender}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="studentClass"
                      name="studentClass"
                      value={data.studentClass}
                      label="Class"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={'Class 1'}>Class 1</MenuItem>
                      <MenuItem value={'Class 2'}>Class 2</MenuItem>
                      <MenuItem value={'Class 3'}>Class 3</MenuItem>
                      <MenuItem value={'Class 4'}>Class 4</MenuItem>
                      <MenuItem value={'Class 5'}>Class 5</MenuItem>
                      <MenuItem value={'Class 6'}>Class 6</MenuItem>
                      <MenuItem value={'Class 7'}>Class 7</MenuItem>
                      <MenuItem value={'Class 8'}>Class 8</MenuItem>
                      <MenuItem value={'Class 9'}>Class 9</MenuItem>
                      <MenuItem value={'Class 10'}>Class 10</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            sx={{ margin: '0.6rem' }}
            onClick={() => {
              if (editingStudentData) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
            }}
          >
            {editingStudentData ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitStudentData.length > 0 ? (
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            {submitStudentData.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: '100%', height: '100%' }}>
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      mb={2}
                    >
                      <Avatar
                        src={
                          data.imagePreview ||
                          '/uploads/profileImages/default_avatar.png'
                        }
                        alt="Profile Avatar"
                        style={{ width: '120px', height: '120px' }}
                      />
                      <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                        <b>
                          <i> {data.nameOfStudent}</i>
                        </b>
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="black">
                      <b>Email :</b> {data.studentEmail}
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Roll Number :</b> {data.studentRollNo}
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Gender :</b> {data.gender}
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Class :</b> {data.studentClass}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      margin: '0.5rem'
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEditCard(data)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <DataNotFound />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Students;
