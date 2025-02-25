import { SetStateAction, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Container,
  IconButton
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import BusinessIcon from '@mui/icons-material/Business';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import ClassRoomHeader from './ClassRoomHeader';

const Class_Room_List = ({
  subjectsFromAnotherComponent,
  classesFromAnotherComponent
}) => {
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [submitClassRoomData, setSubmitClassRoomData] = useState([]);
  const [editingClassRoomData, setEditingClassRoomData] = useState(null);
  const [data, setData] = useState({
    subjects: [],
    classes: [],
    academicYear: '',
    classTeacher: ''
  });
  const [subjects, setSubjects] = useState(subjectsFromAnotherComponent || []);
  const [classes, setClasses] = useState(classesFromAnotherComponent || []);
  const [academicYear, setAcademicYear] = useState('');

  useEffect(() => {
    fetchClassRoomData();
    if (!subjectsFromAnotherComponent) {
      fetchSubjectData();
    }
  }, [updateList, subjectsFromAnotherComponent]);

  useEffect(() => {
    if (academicYear) {
      fetchClassData(academicYear);
    }
  }, [academicYear]);

  const fetchClassRoomData = () => {
    const storedData = JSON.parse(localStorage.getItem('Class')) || [];
    setSubmitClassRoomData(storedData);
  };

  const fetchSubjectData = async () => {
    try {
      const response = await fetch('http://localhost:4000/subject');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching Subject data:', error);
    }
  };

  const fetchClassData = async (academicYear) => {
    try {
      const response = await fetch(
        `http://localhost:4000/classes?year=${academicYear}`
      );
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching Classes data:', error);
    }
  };

  const handleEditTable = (data) => {
    setOpen(true);
    setData(data);
    setEditingClassRoomData(data);
  };

  const handleSaveEdit = () => {
    const updatedData = submitClassRoomData.map((item) =>
      item.id === editingClassRoomData.id ? data : item
    );
    localStorage.setItem('Class', JSON.stringify(updatedData));
    setSubmitClassRoomData(updatedData);
    handleClose();
    setUpdateList(!updateList);
  };

  const handleDelete = (id) => {
    const updatedData = submitClassRoomData.filter((item) => item.id !== id);
    localStorage.setItem('Class', JSON.stringify(updatedData));
    setSubmitClassRoomData(updatedData);
    setUpdateList(!updateList);
  };

  const handleSubmit = () => {
    const newData = { ...data, id: Date.now() };
    const updatedData = [...submitClassRoomData, newData];
    localStorage.setItem('Class', JSON.stringify(updatedData));
    setSubmitClassRoomData(updatedData);
    handleClose();
    setUpdateList(!updateList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubjectChange = (event, value) => {
    setData((prevData) => ({
      ...prevData,
      subjects: value.map((subject) => subject.subjectName)
    }));
  };

  const handleClassChange = (event, value) => {
    setData((prevData) => ({
      ...prevData,
      classes: value.map((classItem) => classItem.className)
    }));
  };

  const handleAcademicYearChange = (event, value) => {
    setAcademicYear(value);
    setData((prevData) => ({
      ...prevData,
      academicYear: value,
      classes: [] // Clear classes when academic year changes
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingClassRoomData(null);
    setData({
      subjects: [],
      classes: [],
      academicYear: '',
      classTeacher: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = {
    name: 'Akash Chhangani'
  };

  return (
    <>
      <Helmet>
        <title>Class Room List</title>
      </Helmet>

      <PageTitleWrapper>
        <ClassRoomHeader onClick={handleClickOpen} />
      </PageTitleWrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            <BusinessIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />
            {editingClassRoomData ? 'Edit Class Room' : 'Create Class Room'}
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0 !important' // Hide scrollbar on Chrome, Safari, and Opera
            },
            '-ms-overflow-style': 'none', // Hide scrollbar on IE and Edge
            'scrollbar-width': 'none' // Hide scrollbar on Firefox
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Autocomplete
                  sx={{ marginTop: 1 }}
                  id="academicYear"
                  options={['2021-2022', '2022-2023', '2023-2024']} // Example options
                  getOptionLabel={(option) => option}
                  value={academicYear}
                  onChange={handleAcademicYearChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Academic Year"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Classes Data */}
              <Grid item xs={12}>
                <Autocomplete
                  sx={{ marginTop: 1 }}
                  id="classes"
                  multiple
                  options={classes}
                  getOptionLabel={(option) => option.className}
                  value={classes.filter((classItem) =>
                    data.classes.includes(classItem.className)
                  )}
                  onChange={handleClassChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Classes"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Subjects Data */}
              <Grid item xs={12}>
                <Autocomplete
                  id="subjects"
                  multiple
                  options={subjects}
                  getOptionLabel={(option) => option.subjectName}
                  value={subjects.filter((subject) =>
                    data.subjects.includes(subject.subjectName)
                  )}
                  onChange={handleSubjectChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subjects"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="classTeacher"
                  name="classTeacher"
                  label="Class Teacher Assign"
                  variant="outlined"
                  required
                  fullWidth
                  value={data.classTeacher}
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
              if (editingClassRoomData) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
              handleClose();
            }}
          >
            {editingClassRoomData ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            {editingClassRoomData ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitClassRoomData.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Sr No.</TableCell>
                      <TableCell align="center">Class</TableCell>
                      <TableCell align="center">Assign Subjects</TableCell>
                      <TableCell align="center">Class Teacher</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {submitClassRoomData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>

                        <TableCell align="center">{data.classes}</TableCell>
                        <TableCell align="center">
                          {data.subjects.join(', ')}
                        </TableCell>
                        <TableCell align="center">
                          {data.classTeacher}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(data.id)}
                          >
                            <DeleteIcon />
                          </IconButton>

                          <IconButton
                            color="success"
                            onClick={() => handleEditTable(data)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <DataNotFound />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Class_Room_List;
