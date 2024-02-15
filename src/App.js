
import Sidebar from "./component/sidebar/Sidebar";
import Product from "./pages/product/Product";
import Employee from "./pages/employee/Employee";
import Quotation from "./pages/quotation/Quotation";
import Editproduct from "./pages/product/Editproduct";

import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editquotation from "./pages/quotation/Editquotation";
import Editemployee from "./pages/employee/Editemployee";



function App() {



  return (
      <div className="main">
        <BrowserRouter>
          <Sidebar />
          
          <Routes>
            <Route>

              <Route path="Product" element={<Product />} />
              <Route path="Employee" element={<Employee />} />
              <Route path="Quotation" element={<Quotation />} />
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
