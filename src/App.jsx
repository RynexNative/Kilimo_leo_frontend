import { Route, Routes } from "react-router-dom"
import Farmer_path from "./paths/Farmer_path"
import LogIn from "./Pages/Auth_pages/LogIn"
import AgrExpert_path from "./paths/AgrExpert_path"
import ExtOfficer_path from "./paths/ExtOfficer_path"
import _404page from "./Pages/ErrorHandle/_404page"
import Admin_path from "./paths/Admin_path"
import ProtectedRoute from "./utils/ProtectedRoute"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route element={<ProtectedRoute allowedRoles={['Farmer']}/>}>
          <Route path="/farmer/*" element={<Farmer_path />} />


          <Route path="*" element={<_404page />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Expert']}/>}>
          <Route path="/expert/*" element={<AgrExpert_path />} />

          <Route path="*" element={<_404page />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ExtOfficer']}/>}>
          <Route path="/extofficer/*" element={<ExtOfficer_path />} />

          <Route path="*" element={<_404page />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Cadmin']}/>}>
          <Route path="/admin/*" element={<Admin_path />} />

          <Route path="*" element={<_404page />} />
        </Route>

        <Route path="*" element={<_404page />} />


      </Routes >
    </>
  )
}

export default App
