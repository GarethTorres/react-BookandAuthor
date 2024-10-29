import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const BASE_URL = 'https://openlibrary.org/subjects/world.json';

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
