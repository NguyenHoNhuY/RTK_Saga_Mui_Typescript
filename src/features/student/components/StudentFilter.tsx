import { Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { City, ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export interface StudentFilterProps {
    filter: ListParams;
    cityList: City[];
    onChange?: (listParams) => void;
    onSearchChange?: (listParams) => void;
}

export function StudentFilter({
    cityList,
    filter,
    onChange,
    onSearchChange,
}: StudentFilterProps) {
    const searchRef = useRef<HTMLInputElement>();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            name_like: e.target.value,
        };
        onSearchChange(newFilter);
    };

    const handleCityChange = (e: SelectChangeEvent<HTMLSelectElement>) => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        };
        onChange(newFilter);
    };

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        if (!onChange) return;

        const value = e.target.value;

        //todo convert value to string and cut string by dots(".")
        const [_sort, _order] = (value as string).split('.');

        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        };
        onChange(newFilter);
    };

    const handleClearFilter = () => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: undefined,
            city: undefined,
            _sort: undefined,
            _order: undefined,
        };
        onChange(newFilter);
        if (searchRef.current) {
            searchRef.current.value = '';
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search by name"
                            endAdornment={<Search />}
                            onChange={handleSearchChange}
                            defaultValue={filter.name_like}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="searchById">Filter by city</InputLabel>
                        <Select
                            labelId="searchById"
                            label="Filter by city"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="searchById">Sort</InputLabel>
                        <Select
                            labelId="searchById"
                            label="Sort"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                        >
                            <MenuItem value="">
                                <em>No Sort</em>
                            </MenuItem>
                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.acs">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button
                        style={{ height: '100%' }}
                        variant="outlined"
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
