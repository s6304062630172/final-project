import Sidebar from "./component/sidebar/Sidebar";
import Product from "./pages/product/Product";
import Employee from "./pages/employee/Employee";
import Quotation from "./pages/quotation/Quotation";
import Editproduct from "./pages/product/Editproduct";
// import SignUp from "./pages/Login/SignUp";
import Editemployee from "./pages/employee/Editemployee";
import Editquotation from "./pages/quotation/Editquotation";

import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {



  return (
    <div className="main">

      <BrowserRouter>


        <Routes>
          <Route>

            {/* <Route path="SignUp" element={<SignUp />} /> */}
            <Route path="Quotation" element={
              <>
                <Sidebar />
                <Quotation />
              
              </>
            } />
            <Route path="Product" element={
              <>
                <Sidebar />
                <Product />
              
              </>
            } />
            <Route path="Employee" element={
              <>
                <Sidebar />
                <Employee />
              
              </>
            } />
              <Route path="/Editproduct/:product_id" element={<Editproduct />} />
              <Route path="/Editquotation/:no_quotation" element={<Editquotation />} />
              <Route path="/Editemployee/:id" element={<Editemployee />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
