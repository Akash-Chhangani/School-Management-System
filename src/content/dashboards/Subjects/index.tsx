import { useState, useEffect, SetStateAction } from 'react';
import {
  Box,
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
  Typography
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Helmet } from 'react-helmet-async';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import DescriptionIcon from '@mui/icons-material/Description';

const Subjects = () => {
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [submitSubjectData, setSubmitSubjectData] = useState([]);
  const [editingSubjectData, setEditingSubjectData] = useState(null);
  const [data, setData] = useState({
    subjectName: '',
    subjectCode: '',
    subjectCredits: '',
    teacherAssign: '',
    subjectDescription: ''
  });

  useEffect(() => {
    fetchSubjectData();
  }, [updateList]);

  const fetchSubjectData = async () => {
    try {
      const response = await fetch('http://localhost:4000/subject');
      const data = await response.json();
      setSubmitSubjectData(data);
    } catch (error) {
      console.error('Error fetching Subject data:', error);
    }
  };

  // Function to handle opening dialog for editing
  const handleEditCard = (
    data: SetStateAction<{
      subjectName: string;
      subjectCode: string;
      subjectCredits: string;
      teacherAssign: string;
      subjectDescription: string;
    }>
  ) => {
    setOpen(true);
    setData(data);
    setEditingSubjectData(data);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/subject/${editingSubjectData?._id}`,
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
        setSubmitSubjectData((prevData) => {
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
      const response = await fetch('http://localhost:4000/subject', {
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
        setSubmitSubjectData((prevData) => [...prevData, newData]);
        handleClose();
      } else {
        alert('Data Already Exists');
      }
    } catch (error) {
      console.error('Error submitting Exam Records:', error);
      alert('Failed to submit the Exam Records Data');
    }
  };

  // Function to handle deleting office data
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/subject/${id}`, {
        method: 'DELETE'
      });

      setUpdateList(!updateList);
      if (response.ok) {
        // Update state after successful deletion
        setSubmitSubjectData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      } else {
        alert('Failed to delete Subject Record');
      }
    } catch (error) {
      console.error('Error deleting Subject Record:', error);
      alert('Failed to delete Subject Record');
    }
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle saving edits
  const handleClickOpen = () => {
    setOpen(true);
    setEditingSubjectData(null);
    setData({
      subjectName: '',
      subjectCode: '',
      subjectCredits: '',
      teacherAssign: '',
      subjectDescription: ''
    });
  };

  const user = {
    name: 'Akash Chhangani'
  };

  // Render component
  return (
    <>
      <Helmet>
        <title>Subjects</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Subjects
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, These are the list of the Subjects in our School
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
            <DescriptionIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />
            {editingSubjectData ? 'Edit Subject' : 'Create Subject'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-subjectDescription">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem' }}
                  id="subjectName"
                  name="subjectName"
                  label="Subject Name"
                  variant="outlined"
                  fullWidth
                  value={data.subjectName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="subjectCode"
                  name="subjectCode"
                  label="Subject Code"
                  variant="outlined"
                  fullWidth
                  value={data.subjectCode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="subjectCredits"
                  name="subjectCredits"
                  label="Number of Credits"
                  variant="outlined"
                  value={data.subjectCredits}
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="teacherAssign"
                  name="teacherAssign"
                  label="Teacher Assign for this Subjects"
                  variant="outlined"
                  fullWidth
                  value={data.teacherAssign}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="subjectDescription"
                  name="subjectDescription"
                  label="Subject Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={data.subjectDescription}
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
              if (editingSubjectData) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
              handleClose();
            }}
          >
            {editingSubjectData ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            {editingSubjectData ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitSubjectData.length > 0 ? (
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            {submitSubjectData.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: '100%', height: '100%' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}
                      >
                        {data.subjectName}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="black">
                      <b>Subject Code : </b> {data.subjectCode}
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>Number of credits : </b> {data.subjectCredits} Credits
                    </Typography>

                    <Typography variant="body2" color="black">
                      <b> Teachers Assign : </b>
                      {data.teacherAssign}
                    </Typography>
                    <Typography variant="body2" color="black">
                      <b>subjectDescription:</b> {data.subjectDescription}
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
export default Subjects;
