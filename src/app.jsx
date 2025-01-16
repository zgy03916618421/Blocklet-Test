import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Profile from './pages/profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
