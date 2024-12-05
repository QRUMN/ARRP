import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import { inspectionService } from '../../services/inspectionService';

const InspectorDashboard = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [findings, setFindings] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      const response = await inspectionService.getInspectorInspections();
      setInspections(response.data);
    } catch (error) {
      console.error('Error fetching inspections:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedPhotos([...uploadedPhotos, ...acceptedFiles]);
  }, [uploadedPhotos]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const handleCompleteInspection = async () => {
    try {
      const formData = new FormData();
      uploadedPhotos.forEach((photo) => {
        formData.append('photos', photo);
      });
      formData.append('findings', findings);
      formData.append('recommendations', recommendations);

      await inspectionService.completeInspection(selectedInspection.id, formData);
      setDialogOpen(false);
      fetchInspections();
    } catch (error) {
      console.error('Error completing inspection:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inspector Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {inspections.map((inspection) => (
          <Grid item xs={12} md={6} key={inspection.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">
                Inspection #{inspection.id}
              </Typography>
              <Typography>
                Date: {new Date(inspection.scheduledDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Status: {inspection.status}
              </Typography>
              {inspection.status === 'SCHEDULED' && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSelectedInspection(inspection);
                    setDialogOpen(true);
                  }}
                >
                  Complete Inspection
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Complete Inspection</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Findings"
            multiline
            rows={4}
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Recommendations"
            multiline
            rows={4}
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            margin="normal"
          />
          <Paper
            {...getRootProps()}
            sx={{
              p: 2,
              mt: 2,
              border: '2px dashed #ccc',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <input {...getInputProps()} />
            <Typography>
              Drag and drop photos here, or click to select files
            </Typography>
            {uploadedPhotos.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {uploadedPhotos.length} photos selected
              </Typography>
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCompleteInspection}
            variant="contained"
            color="primary"
          >
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InspectorDashboard;
