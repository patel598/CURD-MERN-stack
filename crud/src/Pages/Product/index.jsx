import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

// CSS
import './index.css';

// Components
import BaseUrl, { ORDER, PRODUCT } from '../../API/BaseUrl';
import ToastMessage from '../../Utils/Toaster';
import { getImagePath } from '../../Utils/localImage';
import { Button } from '@mui/material';

const ProductPage = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate()




  const getProductById = async () => {
    try {
      setLoading(true)
      const { data } = await BaseUrl.get(`${PRODUCT}/${id}`)
      if (data?.status) {
        setProduct(data?.data)
        setLoading(false)
      } else {
        ToastMessage("error", data?.message)
        setProduct([])
        setLoading(false)
      }
    } catch (error) {
      ToastMessage("error", error?.message)
      setLoading(false)
    }
  }


  useEffect(() => {
    getProductById()
  }, [])

  const handleQtyChange = (e) => {
    let val = parseInt(e.target.value)
    if (parseInt(product?.availableQTY) < val || val < 1) {
      ToastMessage("error", `Input product quantity is out of stock. Available quantity is ${product?.availableQTY}`)
    } else {
      setQuantity(val)
    }
  }

  const handleQty = (btnValue) => {
    if (btnValue === "add") {
      if (parseInt(product?.availableQTY) == quantity) {
        ToastMessage("error", `Input product quantity is out of stock. Available quantity is ${product?.availableQTY}`)
      } else {
        setQuantity(quantity + 1)
      }
    } else if (btnValue === "remove") {
      quantity == 1 ? ToastMessage("error", `Please input positive quantity`) :
        setQuantity(quantity - 1)
    }
  }

  const priceCalculation = () => {
    if (product) {
      if (quantity > 0) {
        return (+quantity * +product.discountedPrice)
      } else {
        return parseInt(product.price - product.discountedPrice)
      }

    }
  };
  const handleSubmitProduct = async () => {


    try {
      const { data } = await BaseUrl.post(ORDER, {
        totalAmount: priceCalculation(),
        quantity: quantity,
        productId: product._id,
        productPrice: product?.price,
        discountPrice: product.discountedPrice,
      })
      if (data?.status) {
        ToastMessage("success", data?.message)
        navigate('/dashboard/product')
      } else {
        ToastMessage("error", data?.message)
      }
    } catch (error) {
      ToastMessage("error", error?.response.data?.message)
    }
  }

  return (
    <>
      {
        loading ?
          <p style={{ display: "flex", justifyContent: 'center', alignItems: "center", height: '100%', width: '100%' }}>Product is not available, please create product...</p>
          :
          <>
            <div className="product_container">

              <div className="main-image">
                <div className="product_img">
                  <img
                    src={getImagePath(product?.image)} alt="Selected Product" className='view_prod_img' />
                </div>
              </div>
              <div className="description_section">
                <h2>{product?.productName}</h2>
                <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                <div className="price_container">
                  <p className='product_price'>Price: ${product?.price}</p>
                  <p className='product_dis_price'>Discount: ${product?.discountedPrice}</p>

                </div>
                <div className="">

                  <div className='qty_btns'>
                    <button
                      type="button"
                      onClick={() => handleQty("remove")}
                      className='qty_remove_btn'
                    >
                      -
                    </button>
                    <input
                      className='qty_input'
                      type='number'
                      value={quantity}
                      onChange={handleQtyChange} name='quantity'
                    />


                    <button
                      type="button"
                      onClick={() => handleQty("add")}
                      className='qty_add_btn'
                    // disabled={parseInt(product?.qty) === quantity}
                    >
                      +
                    </button>
                  </div>
                  <p>Total Price: ${priceCalculation()}</p>
                </div>
                <Button
                  onClick={handleSubmitProduct}
                  variant="contained"
                  style={{ width: '200px', marginTop: '10px' }}
                >

                  Buy now
                </Button>
              </div>

            </div>
          </>


      }

      <Outlet />
    </>
  )
}

export default ProductPage