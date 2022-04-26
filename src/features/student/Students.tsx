import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddEditPage, ListPage } from './pages';

export default function StudentFeature() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/add" element={<AddEditPage />} />
                <Route path="/:studentId" element={<AddEditPage />} />
            </Routes>
        </>
    );
}
