import Box from '@mui/material/Box';
import { FormHelperText, TextField, Typography } from '@mui/material';

export default function DurationEvent({ formData, setFormData, durationError, setDurationError}) {
  return (<section>
  <Box sx={{mt:2}}>

    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}} >
      <Typography color='primary' variant='button' id="duration-slider-label" sx={{mb: 1}}>Duration of Event</Typography>
      <FormHelperText sx={{fontSize: "13px", mb: 0.5}}>Format: 2 hrs or 1 week</FormHelperText>
      <TextField     
        id='duration-event'
        label="Duration Of Event" 
        name='duration'
        type='text'
        placeholder='Enter The Duration Of Event'
        value={formData.duration}
        onChange={(e) => {
            const {name, value} = e.target
            setFormData((prev) => {
                return {...prev, [name]: value }
            })
            if(e.target.validity.valid){
              setDurationError(false)
          } else {
              setDurationError(true)
          } 
        }}
        error={durationError}
        helperText={durationError ? "Please Enter A Duration For The Event" : ""}
        aria-invalid={durationError}
        aria-describedby={`duration-helper`}
        required
        autoComplete="off"
        fullWidth
      />
    </Box>
    
    </Box>
    </section>
  );
}