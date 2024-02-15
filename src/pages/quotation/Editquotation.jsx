import axios from 'axios';
import { event } from 'jquery';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function Editquotation() {
    
    const {no_quotation} = useParams();
    const [title_quotation,settitle_quotation] = useState('')
    useEffect(()=>{
        axios.get(`http://localhost:3001/Editquotation/${no_quotation}`)
        .then(res => {
            settitle_quotation(res.data[0].title_quotation)
        })
        .catch(err => console.log(err))

        


    },[])
    const navigate =  useNavigate();

    const hanldeSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:3001/updatequ/${no_quotation}` , { title_quotation }) 
        .then(res=>{
            if(res.data.updated){
                navigate('/quotation')

            }else{
                alert("Not updated")
            }
        })
    }

    return (
        <div>


            <div class="container mt-5">
                <h1>แก้ไขใบเสนอราคา</h1>

                <form onSubmit={hanldeSubmit}>
                    <div class="mb-3">
                        <label for="title-name" class="form-label">ชื่อหัวข้อ</label>
                        <input type="text" class="form-control" id="title-name" name="name" value={title_quotation} 
                        onChange={(event) => { settitle_quotation(event.target.value) }} />
                    </div>
                    {/* <div class="mb-3">
                        <label for="product-description" class="form-label">รายละเอียดสินค้า</label>
                        <textarea class="form-control" id="product-description" name="description" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="product-price" class="form-label">ราคาสินค้า</label>
                        <input type="number" class="form-control" id="product-price" name="price" required />
                    </div>
                    <div class="mb-3">
                        <label for="product-image" class="form-label">รูปภาพสินค้า</label>
                        <input type="file" class="form-control" id="product-image" name="image" />
                    </div> */}
                    <button type="submit" class="btn btn-primary">บันทึก</button>
                </form>
            </div>




        </div>
    )
}
