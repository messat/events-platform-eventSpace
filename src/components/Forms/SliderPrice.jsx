import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

const marks = [
  {
    value: 0,
    label: 'Free',
  },
  {
    value: 20,
    label: '£20',
  },
  {
    value: 50,
    label: '£50',
  },
  {
    value: 75,
    label: '£75'
  },
  {
    value: 100,
    label: '£100',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function EventPriceSlider({ formData, setFormData}) {
  return (<Box>
      <Typography color='primary' variant='button'>Price of Event</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}} >
      <Slider
        aria-label="Event Price"
        defaultValue={20}
        getAriaValueText={valuetext}
        name='price'
        value={formData.price}
        onChange={(e) => {
            const {name, value} = e.target
            setFormData((prev) => {
                return {...prev, [name]: value }
            })
        }}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        sx={{width: "95%", ml: 2}}
      />
    </Box>
    </Box>
  );
}