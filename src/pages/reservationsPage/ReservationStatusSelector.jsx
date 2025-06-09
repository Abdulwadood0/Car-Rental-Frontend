import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReservationStatusDropdown = ({ value, onChange }) => {
    const [status, setStatus] = useState(value || '');

    const { t } = useTranslation("reservations")

    const handleChange = (event) => {
        const selected = event.target.value;

        setStatus(selected);
        onChange(selected);
    };

    return (
        <FormControl sx={{ minWidth: 200, maxWidth: "200px", mb: 3 }} size="small">
            <InputLabel id="reservation-status-label">{t("Reservation Status")}</InputLabel>
            <Select
                labelId="reservation-status-label"
                value={status}
                label={t("Reservation Status")}
                onChange={handleChange}
            >
                <MenuItem value="ongoing">{t("Ongoing")}</MenuItem>
                <MenuItem value="upcoming">{t("Upcoming")}</MenuItem>
                <MenuItem value="pending">{t("Pending")}</MenuItem>
                <MenuItem value="cancelled">{t("Cancelled")}</MenuItem>
                <MenuItem value="completed">{t("Completed")}</MenuItem>

            </Select>
        </FormControl>
    );
};

export default ReservationStatusDropdown
