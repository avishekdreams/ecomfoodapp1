import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem, emptyCart } from '../redux/features/cartSlice';

import './../style/cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, totalAmt, totalQty } = useSelector((state) => state.allCart);

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">Cart Calculations{cart.length > 0 ? `(${cart.length})` : ""}</h5>
                {
                  cart.length > 0
                    ? <button className="btn btn-danger mt-0 btn-sm" onClick={() => dispatch(emptyCart())}>
                      <i className="fa fa-trash-alt mr-2"></i>
                      <span>Empty Cart</span>
                    </button>
                    : ""
                }
              </div>
            </div>
            <div className="card-body p-0">
              {cart.length === 0 ? <table className="table cart-table mb=0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
                : <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right"><span id="amount" className="amount">Total Amount</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 && cart.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <button className="prdct-delete" onClick={() => dispatch(removeItem(item.id))}>
                            <i className="fa fa-trash-alt mr-2"></i>
                          </button>
                        </td>
                        <td><div className="product-img"><img src={item.imgdata} alt="" /></div></td>
                        <td><div className="product-name"><p>{item.dish}</p></div></td>
                        <td>₹{item.price}</td>
                        <td>
                          <div className="prdct-qty-container">
                            <button className="prdct-qty-btn" type="button" onClick={() => dispatch(decrementQuantity(item.id))}>
                              <i className="fa fa-minus"></i>
                            </button>
                            <input type="text" className='qty-input-box' value={item.qnty} disabled />
                            <button className='prdct-qty-btn' type='button' onClick={() => dispatch(incrementQuantity(item.id))}>
                              <i className='fa fa-plus'></i>
                            </button>
                          </div>
                        </td>
                        <td className='text-right'>₹{item.qnty * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{totalQty}</span></th>
                      <th className='text-right'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-danger'>₹{totalAmt}</span></th>
                    </tr>
                  </tfoot>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
