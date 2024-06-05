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
  Typography
} from '@mui/material';
import JoditEditor from 'jodit-react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet-async';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [updateList, setUpdateList] = useState(false);
  const [submitEmailData, setSubmitEmailData] = useState([]);
  const [editingEmailData, setEditingEmailData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState({
    title: '',
    mail: ''
  });

  // Load data from local storage when component mounts
  useEffect(() => {
    fetchOfficeData();
  }, [updateList]);

  const fetchOfficeData = async () => {
    try {
      const response = await fetch('http://localhost:3003/mails');
      const data = await response.json();
      setSubmitEmailData(data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  // Function to handle opening dialog for editing
  const handleEditCard = (
    data: SetStateAction<{
      title: string;
      mail: string;
    }>
  ) => {
    setOpen(true);
    setData(data);
    setEditingEmailData(data);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3003/notes/${editingEmailData?._id}`,
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
        setSubmitEmailData((prevData) => {
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
      const response = await fetch('http://localhost:3003/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      setUpdateList(!updateList);
      if (response.ok) {
        const newData = await response.json();
        setSubmitEmailData((prevData) => [...prevData, newData]);
        handleClose();
      } else {
        alert('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting company:', error);
      alert('Failed to submit');
    }
  };

  // Function to handle deleting office data
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3003/notes/${id}`, {
        method: 'DELETE'
      });
      setUpdateList(!updateList);
      if (response.ok) {
        // Update state after successful deletion
        setSubmitEmailData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      } else {
        alert('Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('Failed to delete company');
    }
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle saving edits
  const handleClickOpen = () => {
    setOpen(true);
    setEditingEmailData(null);
    setData({
      title: '',
      mail: ''
    });
  };

  // For Heart-Icon
  const handleClickFavoriteIcon = () => {
    setIsClicked(!isClicked);
  };

  const user = {
    name: 'Akash Chhangani'
  };

  // Render component
  return (
    <>
      <Helmet>
        <title>Email</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Email
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the Templates of mail
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
              Create Templates
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
            <NoteAddIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            {editingEmailData ? 'Edit Template' : 'Create Template'}
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0 !important'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem' }}
                  id="title"
                  name="title"
                  label="Template Title"
                  variant="outlined"
                  fullWidth
                  value={data.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  id="mail"
                  name="mail"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={data.mail}
                  onChange={handleInputChange}
                /> */}
                <JoditEditor
                  value={data.mail} // Use editContent for editing
                  onBlur={(newContent) => setEditContent(newContent)}
                  config={{
                    style: {
                      height: '20.5rem'
                    }
                  }}
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
              if (editingEmailData) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
              handleClose();
            }}
          >
            {editingEmailData ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            {editingEmailData ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitEmailData.length > 0 ? (
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            {submitEmailData.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    border: '1px solid black',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardHeader
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}
                    title={data.title}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="black"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 10,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      dangerouslySetInnerHTML={{ __html: data.mail }}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      margin: 'auto'
                    }}
                  >
                    <IconButton
                      onClick={() => handleEditCard(data)}
                      sx={{ marginRight: '0.5rem' }}
                      aria-label="edit"
                      color="success"
                    >
                      <EditIcon />
                      <IconButton
                        aria-label="add to favorites"
                        onClick={handleClickFavoriteIcon}
                        style={{ color: isClicked ? 'red' : 'inherit' }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share" color="primary">
                        <ShareIcon />
                      </IconButton>
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(data._id)}
                      aria-label="delete"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button variant="contained" color="success">
                      Use this Template
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
export default Notes;

// old Code with local storage
// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Grid,
//   TextField,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   CardActions,
//   Container
// } from '@mui/material';
// import { Helmet } from 'react-helmet-async';
// import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
// import JoditEditor from 'jodit-react';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import Footer from 'src/components/Footer';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import StatusComingSoon from 'src/content/pages/Status/ComingSoon';
// import DataNotFound from 'src/content/pages/Status/DataNotFound';

// const Email = () => {
//   const [templates, setTemplates] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editTitle, setEditTitle] = useState('');
//   const [editContent, setEditContent] = useState('');
//   const [showComingSoon, setShowComingSoon] = useState(false); // State to control rendering of StatusComingSoon
//   const [editingTemplate, setEditingTemplate] = useState(false); // State to track if editing a template
//   const [isClicked, setIsClicked] = useState(false);

//   const handleClickFavoriteIcon = () => {
//     setIsClicked(!isClicked);
//   };

//   useEffect(() => {
//     // Retrieve email templates data from local storage when component mounts
//     const storedTemplates = localStorage.getItem('emailTemplates');
//     if (storedTemplates) {
//       setTemplates(JSON.parse(storedTemplates));
//     }
//   }, []);

//   useEffect(() => {
//     // Save email templates data to local storage whenever it changes
//     localStorage.setItem('emailTemplates', JSON.stringify(templates));
//   }, [templates]);

//   const handleClose = () => {
//     setOpen(false);
//     setEditingTemplate(false); // Reset editingTemplate state
//   };

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleSaveEdit = () => {
//     if (editIndex !== null) {
//       const updatedTemplates = [...templates];
//       updatedTemplates[editIndex] = { title: editTitle, content: editContent };
//       setTemplates(updatedTemplates);
//       setEditIndex(null);
//       setEditTitle('');
//       setEditContent('');
//       setOpen(false); // Close the dialog after saving
//       setEditingTemplate(false); // Reset editingTemplate state
//     }
//   };

//   const handleEditTemplate = (index) => {
//     const template = templates[index];
//     setEditIndex(index);
//     setEditTitle(template.title); // Set the title for editing
//     setEditContent(template.content); // Set the content for editing
//     setOpen(true); // Open the dialog
//     setEditingTemplate(true); // Set editingTemplate to true
//   };

//   const handleCreateTemplate = () => {
//     const newTemplate = { title: editTitle, content: editContent }; // Use editTitle and editContent for new template
//     if (editIndex !== null) {
//       const updatedTemplates = [...templates];
//       updatedTemplates[editIndex] = newTemplate;
//       setTemplates(updatedTemplates);
//     } else {
//       setTemplates([...templates, newTemplate]);
//     }
//     // Reset fields
//     setEditIndex(null); // Reset editIndex
//     setEditTitle('');
//     setEditContent('');
//     setOpen(false); // Close the dialog after saving
//     setEditingTemplate(false); // Reset editingTemplate state
//   };

//   const handleUseTemplate = () => {
//     setShowComingSoon(!showComingSoon); // Toggle the state
//   };

//   const handleDeleteTemplate = (index) => {
//     const updatedTemplates = [...templates];
//     updatedTemplates.splice(index, 1); // Remove the template at the specified index
//     setTemplates(updatedTemplates); // Update the state
//   };

//   const user = {
//     name: 'Akash Chhangani'
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Email</title>
//       </Helmet>

//       <PageTitleWrapper>
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Typography variant="h3" component="h3" gutterBottom>
//               Email
//             </Typography>
//             <Typography variant="subtitle2">
//               {user.name}, these are the list of the Email
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="success"
//               sx={{ margin: '0.6rem' }}
//               onClick={handleClick}
//             >
//               <AddTwoToneIcon
//                 sx={{
//                   fontSize: '1.5rem',
//                   fontWeight: 'bold',
//                   color: 'white',
//                   marginRight: '5px'
//                 }}
//               />{' '}
//               Create Templates
//             </Button>
//           </Grid>
//         </Grid>
//       </PageTitleWrapper>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         fullWidth
//         maxWidth="lg"
//         sx={{
//           '& .MuiDialog-paper': {
//             width: '100%',
//             height: '100%',
//             margin: 0
//           }
//         }}
//       >
//         <DialogTitle id="alert-dialog-title">
//           <Typography
//             sx={{
//               marginTop: '1rem',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontWeight: 'bold',
//               fontSize: '24px'
//             }}
//           >
//             <NoteAddIcon
//               sx={{
//                 fontSize: '2rem',
//                 fontWeight: 'bold',
//                 color: 'green',
//                 marginRight: '5px'
//               }}
//             />{' '}
//             {editingTemplate ? 'Edit Template' : 'Create Template'}
//           </Typography>
//         </DialogTitle>

//         <DialogContent
//           sx={{
//             overflowY: 'scroll',
//             '&::-webkit-scrollbar': {
//               width: '0 !important'
//             },
//             '-ms-overflow-style': 'none',
//             'scrollbar-width': 'none'
//           }}
//         >
//           <DialogContentText id="alert-dialog-description">
//             <Grid container spacing={2} justifyContent="center">
//               <Grid item xs={12}>
//                 <TextField
//                   sx={{ marginTop: '1rem', marginBottom: '1rem' }}
//                   id="outlined-basic"
//                   label="Title"
//                   variant="outlined"
//                   fullWidth
//                   required
//                   value={editTitle} // Use editTitle for editing
//                   onChange={(e) => setEditTitle(e.target.value)}
//                 />

//                 <JoditEditor
//                   value={editContent} // Use editContent for editing
//                   onBlur={(newContent) => setEditContent(newContent)}
//                   config={{
//                     style: {
//                       height: '20.5rem'
//                     }
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContentText>
//         </DialogContent>

//         <DialogActions>
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ margin: '0.6rem' }}
//             onClick={() => {
//               if (editingTemplate) {
//                 handleSaveEdit();
//               } else {
//                 handleCreateTemplate();
//               }
//               handleClose(); // Close the dialog after saving
//             }}
//           >
//             {editingTemplate ? 'Save' : 'Submit'}
//           </Button>
//           <Button
//             variant="contained"
//             sx={{ margin: '1rem' }}
//             onClick={handleClose}
//           >
//             {editingTemplate ? 'Cancel' : 'Cancel'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Container>
//         {templates.length > 0 ? (
//           <Grid container spacing={2} justifyContent="center">
//             {templates.map((template, index) => (
//               <Grid item xs={12} md={6} lg={4} key={index}>
//                 <Card
//                   sx={{
//                     border: '1px solid black',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column'
//                   }}
//                 >
//                   <CardContent>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontSize: '1.5rem'
//                       }}
//                     >
//                       {template.title}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       style={{
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         display: '-webkit-box',
//                         WebkitLineClamp: 10,
//                         WebkitBoxOrient: 'vertical'
//                       }}
//                       dangerouslySetInnerHTML={{ __html: template.content }}
//                     />
//                   </CardContent>

//                   <CardActions
//                     sx={{
//                       marginTop: 'auto',
//                       display: 'flex',
//                       justifyContent: 'space-around'
//                     }}
//                   >
//                     <IconButton
//                       sx={{ marginLeft: '0.5rem' }}
//                       aria-label="success"
//                       onClick={() => handleEditTemplate(index)}
//                     >
//                       <EditIcon sx={{ color: 'green' }} />
//                     </IconButton>
//                     <IconButton
//                       aria-label="add to favorites"
//                       onClick={handleClickFavoriteIcon}
//                       style={{ color: isClicked ? 'red' : 'inherit' }}
//                     >
//                       <FavoriteIcon />
//                     </IconButton>

//                     <IconButton aria-label="share" color="primary">
//                       <ShareIcon />
//                     </IconButton>

//                     <IconButton
//                       aria-label="delete"
//                       color="error"
//                       onClick={() => handleDeleteTemplate(index)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       onClick={handleUseTemplate}
//                     >
//                       Use this Template
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <DataNotFound />
//         )}
//       </Container>

//       <Footer />

//       {showComingSoon && <StatusComingSoon />}
//     </>
//   );
// };

// export default Email;
