import axios from 'axios';
import { event } from 'jquery';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function Editproduct() {
    
    const {product_id} = useParams();
    const [product_name,setproduct_name] = useState('')
    useEffect(()=>{
        axios.get(`http://localhost:3001/Editproduct/${product_id}`)
        .then(res => {
            setproduct_name(res.data[0].product_name)
        })
        .catch(err => console.log(err))

        


    },[])
    const navigate =  useNavigate();

    const hanldeSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:3001/update/${product_id}` , { product_name }) 
        .then(res=>{
            if(res.data.updated){
                navigate('/product')

            }else{
                alert("Not updated")
            }
        })
    }

    return (
        <div>


            <div class="container mt-5">
                <h1>แก้ไขสินค้า</h1>

                <form onSubmit={hanldeSubmit}>
                    <div class="mb-3">
                        <label for="product-name" class="form-label">ชื่อสินค้า</label>
                        <input type="text" class="form-control" id="product-name" name="name" value={product_name} 
                        onChange={(event) => { setproduct_name(event.target.value) }} />
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


