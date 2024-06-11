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
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import BusinessIcon from '@mui/icons-material/Business';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import MarkListHeader from './MarkListHeader';
import ChecklistIcon from '@mui/icons-material/Checklist';

const index = ({
  subjectsFromAnotherComponent,
  classesFromAnotherComponent
}) => {
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [submitClassRoomData, setSubmitClassRoomData] = useState([]);
  const [editingClassRoomData, setEditingClassRoomData] = useState(null);
  const [data, setData] = useState({
    exam: [],
    subjects: [],
    classes: [],
    academicYear: ''
  });
  const [subjects, setSubjects] = useState(subjectsFromAnotherComponent || []);
  const [titleOfExam, setTitleOfExam] = useState(
    subjectsFromAnotherComponent || []
  );
  const [classes, setClasses] = useState(classesFromAnotherComponent || []);

  useEffect(() => {
    fetchCompanyData();
    if (!subjectsFromAnotherComponent) {
      fetchSubjectData();
    }
    if (!subjectsFromAnotherComponent) {
      fetchExamData();
    }
    if (!classesFromAnotherComponent) {
      fetchClassData();
    }
  }, [updateList, subjectsFromAnotherComponent, classesFromAnotherComponent]);

  const fetchCompanyData = () => {
    const storedData = JSON.parse(localStorage.getItem('Class')) || [];
    setSubmitClassRoomData(storedData);
  };

  //Exam Data Fetch
  const fetchExamData = async () => {
    try {
      const response = await fetch('http://localhost:4000/exam');
      const data = await response.json();
      setTitleOfExam(data);
    } catch (error) {
      console.error('Error fetching Exam data:', error);
    }
  };
  //Subject Data Fetching
  const fetchSubjectData = async () => {
    try {
      const response = await fetch('http://localhost:4000/subject');
      const data = await response.json();
      console.log(data);
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching Subject data:', error);
    }
  };
  //Class Data Fetching
  const fetchClassData = async () => {
    try {
      const response = await fetch('http://localhost:4000/classes');
      const data = await response.json();
      console.log(data);
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

  const handleExamChange = (event, value) => {
    setData((prevData) => ({
      ...prevData,
      subjects: value.map((titleOfExam) => titleOfExam.titleOfExam)
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

  const handleClickOpen = () => {
    setOpen(true);
    setEditingClassRoomData(null);
    setData({
      exam: [],
      subjects: [],
      classes: [],
      academicYear: ''
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
        <title>Mark List</title>
      </Helmet>

      <PageTitleWrapper>
        <MarkListHeader onClick={handleClickOpen} />
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
            <ChecklistIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />
            {editingClassRoomData ? 'Edit Mark List' : 'Create Mark List'}
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
                <Box sx={{ minWidth: 120, marginTop: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>Academic Year</InputLabel>
                    <Select
                      id="academicYear"
                      name="academicYear"
                      value={data.academicYear}
                      label="Academic Year"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={'2020-2021'}>2020-2021</MenuItem>
                      <MenuItem value={'2021-2022'}>2021-2022</MenuItem>
                      <MenuItem value={'2022-2023'}>2022-2023</MenuItem>
                      <MenuItem value={'2023-2024'}>2023-2024</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  sx={{ marginTop: 1 }}
                  id="titleOfExam"
                  multiple
                  options={titleOfExam}
                  getOptionLabel={(option) => option.titleOfExam}
                  value={titleOfExam.filter((titleOfExam) =>
                    data.exam.includes(titleOfExam.titleOfExam)
                  )}
                  onChange={handleExamChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Exam Title"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>

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

      <Footer />
    </>
  );
};

export default index;
