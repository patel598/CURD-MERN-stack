import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { IS_ACTIVE } from '../../API/BaseUrl';

export default function SelectCom({ isActive, id }) {
    const [status, setStatus] = React.useState(isActive);

    const manageUserStatus = async (value) => {

        const url = import.meta.env.VITE_BASE_URL;
        try {
            const { data } = await axios.post(url + IS_ACTIVE, { id, isActive: value })
            console.log("data")
        } catch (error) {

        }
    }

    const handleChange = async (event) => {
        setStatus(event.target.value);
        await manageUserStatus(event.target.value)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={handleChange}
                    size='small'
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>In-active</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
