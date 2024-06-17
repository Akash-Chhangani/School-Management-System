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
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import ExamHeader from './ExamHeader';

const Exam_Creation = () => {
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [submitExamData, setSubmitExamData] = useState([]);
  const [editingExamData, setEditingExamData] = useState(null);
  const [data, setData] = useState({
    academicYear: '',
    examTerm: '',
    titleOfExam: '',
    examDuration: '',
    numberOfQuestions: '',
    examDescription: '',
    examTiming: '',
    examClass: ''
  });
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchCompanyData();
  }, [updateList]);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('http://localhost:4000/exam');
      const data = await response.json();
      setSubmitExamData(data);
    } catch (error) {
      console.error('Error fetching Exam Creation data:', error);
    }
  };

  const handleEditTable = (
    data: SetStateAction<{
      academicYear: string;
      examTerm: string;
      titleOfExam: string;
      examDuration: string;
      numberOfQuestions: string;
      examDescription: string;
      examTiming: string;
      examClass: string;
    }>
  ) => {
    setOpen(true);
    setData(data);
    setEditingExamData(data);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/exam/${editingExamData?._id}`,
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
        setSubmitExamData((prevData) => {
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/exam/${id}`, {
        method: 'DELETE'
      });

      setUpdateList(!updateList);
      if (response.ok) {
        // Update state after successful deletion
        setSubmitExamData((prevData) =>
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

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/exam', {
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
        setSubmitExamData((prevData) => [...prevData, newData]);
        handleClose();
      } else {
        alert('Failed to submit Exam Records');
      }
    } catch (error) {
      console.error('Error submitting Exam Records:', error);
      alert('Failed to submit the Exam Records Data');
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingExamData(null);
    setData({
      academicYear: '',
      examTerm: '',
      titleOfExam: '',
      examDuration: '',
      numberOfQuestions: '',
      examDescription: '',
      examTiming: '',
      examClass: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = {
    name: 'Akash Chhangani'
  };

  const handleYearFilterChange = (event: any) => {
    setSelectedYear(event.target.value as string);
  };

  const filteredData = selectedYear
    ? submitExamData.filter((item) => item.academicYear === selectedYear)
    : submitExamData;

  return (
    <>
      <Helmet>
        <title>Exam Creation</title>
      </Helmet>

      <PageTitleWrapper>
        <ExamHeader onClick={handleClickOpen} />
      </PageTitleWrapper>

      <Container>
        <Box
          sx={{
            minWidth: 120,
            margin: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FormControl sx={{ width: '50%', bgcolor: 'white' }}>
            <InputLabel>Filter by Academic Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={handleYearFilterChange}
              label="Filter by Academic Year"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'2020-2021'}>2020-2021</MenuItem>
              <MenuItem value={'2021-2022'}>2021-2022</MenuItem>
              <MenuItem value={'2022-2023'}>2022-2023</MenuItem>
              <MenuItem value={'2023-2024'}>2023-2024</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>

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
            {editingExamData ? 'Edit Exam' : ' Create Exam'}
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
                <TextField
                  id="examTerm"
                  name="examTerm"
                  label="Exam Term"
                  fullWidth
                  variant="outlined"
                  value={data.examTerm}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="titleOfExam"
                  name="titleOfExam"
                  label="Title of Exam"
                  fullWidth
                  variant="outlined"
                  value={data.titleOfExam}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="examDuration"
                  name="examDuration"
                  label="Exam Duration"
                  fullWidth
                  variant="outlined"
                  value={data.examDuration}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="numberOfQuestions"
                  name="numberOfQuestions"
                  label="Number of Questions"
                  fullWidth
                  variant="outlined"
                  value={data.numberOfQuestions}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="examDescription"
                  name="examDescription"
                  label="Exam Description"
                  fullWidth
                  variant="outlined"
                  value={data.examDescription}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="examTiming"
                  name="examTiming"
                  label="Exam Timing"
                  fullWidth
                  variant="outlined"
                  value={data.examTiming}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="examClass"
                  name="examClass"
                  label="Class"
                  fullWidth
                  variant="outlined"
                  value={data.examClass}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={editingExamData ? handleSaveEdit : handleSubmit}
            color="success"
            variant="contained"
            autoFocus
          >
            {editingExamData ? 'Save' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {submitExamData.length > 0 ? (
        <Container sx={{ marginTop: '2rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Academic Year</TableCell>
                      <TableCell>Exam Term</TableCell>
                      <TableCell>Title of Exam</TableCell>
                      <TableCell>Exam Duration</TableCell>
                      <TableCell>Number of Questions</TableCell>
                      <TableCell>Exam Description</TableCell>
                      <TableCell>Exam Timing</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>{row.academicYear}</TableCell>
                        <TableCell>{row.examTerm}</TableCell>
                        <TableCell>{row.titleOfExam}</TableCell>
                        <TableCell>{row.examDuration}</TableCell>
                        <TableCell>{row.numberOfQuestions}</TableCell>
                        <TableCell>{row.examDescription}</TableCell>
                        <TableCell>{row.examTiming}</TableCell>
                        <TableCell>{row.examClass}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="edit"
                            color="success"
                            onClick={() => handleEditTable(row)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(row._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <DataNotFound />
      )}
      <Footer />
    </>
  );
};

export default Exam_Creation;
