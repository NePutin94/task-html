import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MusLayout from './pages/home';
import Layout from './pages/layout';
import SearchLayout from './pages/search';

/* application routes */
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MusLayout />} />
                    <Route path="home" element={<MusLayout />} />
                    <Route path="search" element={<SearchLayout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
