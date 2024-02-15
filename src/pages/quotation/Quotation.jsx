import "./quotation.css";
import React from 'react'
import Axios from 'axios'
import { Delete, Edit, Add, Close } from "@mui/icons-material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import Model from 'react-modal'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';



export default function Quotation() {
    const [selectedQuotation, setSelectedQuotation] = useState(null);

    // เพิ่มฟังก์ชัน handleViewDetail เพื่อแสดงรายละเอียดใบเสนอราคาที่เลือก
    const handleViewDetail = (quotation) => {
        setSelectedQuotation(quotation);
    };

    const [visible, setvisible] = useState(false)
    const [phone_admin, setphone_admin] = useState("");
    const [address_user, setaddress_user] = useState("");
    const [phone_user, setphone_user] = useState("");
    const [date_, setdate_] = useState("");
    const [title_quotation, settitle_quotation] = useState("");
    const [annotation, setannotation] = useState("");
    const [id_tax_user, setid_tax_user] = useState("");
    const [id_tax_admin, setid_tax_admin] = useState("");
    const [email, setemail] = useState("");
    const [quotationList, setquotationList] = useState([]);

    const getquotation = () => {
        Axios.get('http://localhost:3001/get/quotation').then((response) => {
            setquotationList(response.data);
        });

    }

    useEffect(() => {
        getquotation();
    }, []);

    const addQuotation = () => {
        if (phone_admin == "" || address_user == "" || phone_user == "" || date_ == "" || title_quotation == "" || annotation == "" || id_tax_user == "" || id_tax_admin == "" || email == "") {

        } else {
            Axios.post("http://localhost:3001/post/create", {
                phone_admin: phone_admin,
                address_user: address_user,
                phone_user: phone_user,
                date_: date_,
                title_quotation: title_quotation,
                annotation: annotation,
                id_tax_user: id_tax_user,
                id_tax_admin: id_tax_admin,
                email:email
            }).then(() => {

                setquotationList([
                    ...quotationList,
                    {
                        phone_admin: phone_admin,
                        address_user: address_user,
                        phone_user: phone_user,
                        date_: date_,
                        title_quotation: title_quotation,
                        annotation: annotation,
                        id_tax_user: id_tax_user,
                        id_tax_admin: id_tax_admin,
                        email:email
                    },
                ]);
            });
        }
    };

    const deletequotation = (no_quotation) => {
        Axios.delete(`http://localhost:3001/delete/quotation/${no_quotation}`).then((response) => {
            setquotationList(
                quotationList.filter((val) => {
                    return val.no_quotation != no_quotation;
                })
            )
        })

    }

    return (
        <div >
            <h3>Quotation manage</h3>
                    <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {quotationList.map((val, key) => {
                        return (
                            <tr>
                                <td>{val.no_quotation}</td>
                                <td>{val.title_quotation}</td>
                                <td>{val.date_}</td>
                                <Link to={`/Editquotation/${val.no_quotation}`} type="button" class="btn btn-dark" ><Edit /></Link>
                                <button type="button" class="btn btn-danger" variant="outlined" color="error" onClick={() => { deletequotation(val.no_quotation) }}><Delete /></button>
                                <button type="button" class="btn btn-danger" variant="outlined" color="error" onClick={() => { handleViewDetail(val)}}><VisibilityIcon /></button>

                            </tr>
                        )

                    })}

                </tbody>
            </table>

            <p className='add' onClick={() => setvisible(true)}> <Add />ADD</p>
            <Model id='Model' isOpen={visible}>
                <h1>ADD </h1>
                <p className='close' onClick={() => setvisible(false)}><Close /></p>
                <form className='form' action="">
                    <div className='block1'>
                        <div>
                            <p>Title</p>
                            <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(event) => { settitle_quotation(event.target.value) }} />
                        </div>
                        <div>
                            <p>Date</p>
                            <TextField id="outlined-basic" label="Date" variant="outlined" onChange={(event) => { setdate_(event.target.value) }} />
                        </div>
                        <div>
                            <p>Address User</p>
                            <TextField id="outlined-basic" label="Address user" variant="outlined" onChange={(event) => { setaddress_user(event.target.value) }} />
                        </div>
                        <div>
                            <p>Email</p>
                            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event) => { setemail(event.target.value) }} />
                        </div>
                    </div>
                    <div className='block2'>
                        <div>
                            <p>Phone Admin</p>
                            <TextField id="outlined-basic" label="Phone Admin" variant="outlined" onChange={(event) => { setphone_admin(event.target.value) }} />
                        </div>
                        <div>
                            <p>Phone user</p>
                            <TextField id="outlined-basic" label="Phone user" variant="outlined" onChange={(event) => { setphone_user(event.target.value) }} />
                        </div>
                        <div>
                            <p>Id tax user</p>
                            <TextField id="outlined-basic" label="Id tax user" variant="outlined" onChange={(event) => { setid_tax_user(event.target.value) }} />
                        </div>
                        <div>
                            <p>Id tax Admin</p>
                            <TextField id="outlined-basic" label="Id tax Admin" variant="outlined" onChange={(event) => { setid_tax_admin(event.target.value) }} />
                        </div>
                        <div>
                            <p>Annotation</p>
                            <TextField id="outlined-basic" label="Annotation" variant="outlined" onChange={(event) => { setannotation(event.target.value) }} />
                        </div>
                    </div>
                    <button onClick={addQuotation} class="btn btn-primary" type="submit">ADD</button>
                </form>
               
              
            </Model>
                 {/* หน้าต่างแสดงรายละเอียดใบเสนอราคา */}
                 {selectedQuotation && (
                <Model isOpen={true}>
                    <h1>Quotation Detail</h1>
                    {/* แสดงรายละเอียดใบเสนอราคา */}
                    <p>No: {selectedQuotation.no_quotation}</p>
                    <p>Title: {selectedQuotation.title_quotation}</p>
                    <p>Date: {selectedQuotation.date_}</p>
                    <p>หมายเลขเสียภาษีของลูกค้า: {selectedQuotation.id_tax_user}</p>
                    <p>หมายเลขเสียภาษีของพนักงาน {selectedQuotation.id_tax_admin}</p>
                    <p>หมายเลขโทรศัพท์แอดมิน: {selectedQuotation.phone_admin}</p>
                    <p>หมายเลขโทรศัพท์ลูกค้า: {selectedQuotation.phone_user}</p>
                    <p>ที่อยู่: {selectedQuotation.address_user}</p>
                    <p>อีเมล์: {selectedQuotation.email}</p>
                    {/* เพิ่มปุ่มปิดหน้าต่าง */}
                    <button onClick={() => setSelectedQuotation(null)}>Close</button>
                </Model>
            )}





        </div>


    )
}