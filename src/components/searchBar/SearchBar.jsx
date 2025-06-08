// components/CarSearchBar.jsx
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
    const { t } = useTranslation("cars");

    return (
        <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(placeholder)}
            variant="outlined"
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton disabled>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchBar;
