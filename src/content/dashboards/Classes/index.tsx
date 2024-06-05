import { useState, useEffect, SetStateAction } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet-async';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

const Office = () => {
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [submitClassData, setSubmitClassData] = useState([]);
  const [editingClassData, setEditingClassData] = useState(null);
  const [data, setData] = useState({
    className: '',
    capacity: '',
    boys: '',
    girls: '',
    classTeacherAssign: '',
    description: ''
  });

  useEffect(() => {
    fetchClassData();
  }, [updateList]);

  const fetchClassData = async () => {
    try {
      const response = await fetch('http://localhost:4000/classes');
      const data = await response.json();
      setSubmitClassData(data);
    } catch (error) {
      console.error('Error fetching Class data:', error);
    }
  };

  // Function to handle opening dialog for editing
  const handleEditCard = (
    data: SetStateAction<{
      className: string;
      capacity: string;
      boys: string;
      girls: string;
      classTeacherAssign: string;
      description: string;
    }>
  ) => {
    setOpen(true);
    setData(data);
    setEditingClassData(data);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/classes/${editingClassData?._id}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        setSubmitClassData((prevData) => {
          const newData = prevData.map((item) =>
            item.id === updatedData.id ? updatedData : item
          );
          return newData;
        });
        handleClose();
      } else {
        alert('Failed to save edit Class Data');
      }
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save edit');
    }
    setUpdateList(!updateList);
  };

  // Function to handle input change in text fields
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/classes', {
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
        setSubmitClassData((prevData) => [...prevData, newData]);
        handleClose();
      } else {
        alert('Failed to Class Records');
      }
    } catch (error) {
      console.error('Error submitting Class Records:', error);
      alert('Failed to submit the Class Records Data');
    }
  };

  // Function to handle deleting office data
  const handleDelete = async (id: number) => {
    console.log('id ', id);

    try {
      const response = await fetch(`http://localhost:4000/classes/${id}`, {
        method: 'DELETE'
      });

      setUpdateList(!updateList);
      if (response.ok) {
        // Update state after successful deletion
        setSubmitClassData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      } else {
        alert('Failed to delete Class Records');
      }
    } catch (error) {
      console.error('Error deleting Exam Record:', error);
      alert('Failed to delete Class Records');
    }
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle saving edits
  const handleClickOpen = () => {
    setOpen(true);
    setEditingClassData(null);
    setData({
      className: '',
      capacity: '',
      boys: '',
      girls: '',
      classTeacherAssign: '',
      description: ''
    });
  };

  const user = {
    name: 'Akash Chhangani'
  };

  // Render component
  return (
    <>
      <Helmet>
        <title>Classes</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Classes
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, These are the list of the Classes in our School
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
              Create New Class
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
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
            <LocationOnIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />
            {editingClassData ? 'Edit Class' : 'Create Class'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120, marginTop: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                      id="className"
                      name="className"
                      label="Class Name"
                      value={data.className}
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
              <Grid item xs={12}>
                <TextField
                  id="capacity"
                  name="capacity"
                  label="Capacity of Students"
                  variant="outlined"
                  fullWidth
                  value={data.capacity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="boys"
                  name="boys"
                  label="Number of Boys"
                  variant="outlined"
                  value={data.boys}
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="girls"
                  name="girls"
                  label="Number of Girls"
                  variant="outlined"
                  fullWidth
                  value={data.girls}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="classTeacherAssign"
                  name="classTeacherAssign"
                  label="Class Teacher Assign"
                  variant="outlined"
                  fullWidth
                  value={data.classTeacherAssign}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={data.description}
                  onChange={handleInputChange}
                />
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
              if (editingClassData) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
              handleClose();
            }}
          >
            {editingClassData ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            {editingClassData ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitClassData.length > 0 ? (
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            {submitClassData.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: '100%', height: '100%' }}>
                  <CardHeader
                    action={
                      <>
                        <IconButton
                          onClick={() => handleEditCard(data)}
                          sx={{ marginRight: '0.5rem' }}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </>
                    }
                    title={data.className}
                  />
                  <CardContent>
                    <Typography variant="body2" color="black">
                      <b>Total Number of Student : </b>
                      {data.capacity} Students
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Total Number of Boys: </b>
                      {data.boys} Boys
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Total Number of Girls:</b> {data.girls} Girls
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Description: </b>
                      {data.description}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '0.5rem'
                    }}
                  >
                    <Typography variant="body2" color="black">
                      <b>Class Teacher Assign to {data.className} is : </b>
                      {data.classTeacherAssign}
                    </Typography>
                    <IconButton
                      onClick={() => handleDelete(data._id)}
                      aria-label="delete"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
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
export default Office;
