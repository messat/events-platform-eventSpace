import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

const marks = [
  {
    value: 0.5,
    label: '30 mins',
  },
  {
    value: 2,
    label: '2 hrs',
  },
  {
    value: 5.5,
    label: '5 hrs 30mins',
  },
  {
    value: 8,
    label: '8 hrs',
  },
];

function valuetext(value) {
  return value;
}

export default function DurationSlider({ formData, setFormData}) {
  return (<Box sx={{mt:2}}>
      <Typography color='primary' variant='button'>Duration of Event</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}} >
      <Slider
        aria-label="Event Duration"
        defaultValue={0.5}
        getAriaValueText={valuetext}
        name='duration'
        value={formData.duration}
        onChange={(e) => {
            const {name, value} = e.target
            setFormData((prev) => {
                return {...prev, [name]: value }
            })
        }}
        step={0.5}
        min={0.5}
        max={8}
        valueLabelDisplay="auto"
        marks={marks}
        sx={{width: "95%", ml: 2}}
      />
    </Box>
    </Box>
  );
}