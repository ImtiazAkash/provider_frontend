import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Layout from './components/Layout';
import Provider from './components/Provider';
import PrivateRoute from './components/PrivateRoute';
import AddProvider from './components/AddProvider';
import Profile from './components/Profile';
import Review from './components/Review';
import Document from './components/Document';
import EditProvider from './components/EditProvider';
import EditProviderProfile from './components/EditProviderProfile';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login (No Layout applied) */}
        
        <Route path="/login" element={<Login />} />

        {/* Private Routes inside Layout */}
        <Route path="*" element={
          <PrivateRoute>
            <Layout>
              <Routes>
                {/* Protected Routes */}
                <Route path='/' element={<Provider />} />
                <Route path="/provider" element={<Provider />} />
                <Route path="/add-provider" element={<AddProvider />}>
                  <Route index element={<Profile />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='review' element={<Review />} />
                  <Route path='document' element={<Document />} />
                  
                </Route>
                <Route path="/edit-provider" element={<EditProvider />}>
                    <Route index element={<EditProviderProfile/>} />
                    <Route path="edit-profile" element={<EditProviderProfile/>}/>
                    <Route path="edit-language" element={<EditProviderProfile/>}/>
                    <Route path="edit-awards" element={<EditProviderProfile/>}/>
                    <Route path="edit-reviews" element={<EditProviderProfile/>}/>
                    <Route path="edit-documents" element={<EditProviderProfile/>}/>
                </Route>
              </Routes>
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
