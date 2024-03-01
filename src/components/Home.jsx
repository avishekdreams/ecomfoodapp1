import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import CardsData from './../assets/CardData';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/features/cartSlice';
import './../style/main.css';

export default function Home() {
  const [cartData, setCartData] = React.useState(CardsData);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added in cart");
  }

  return (
    <>
      <section className='item_section mt-4 container'>
        <h2 className='px-4' style={{ fontWeight: 400 }}>Restaurant in Jamshedpur</h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {cartData.map((ele) => (
            <Card key={ele.id} style={{ width: "22rem", border: "none" }} className="hove mb-4">
              <Card.Img variant="top" className="cd" src={ele.imgdata} />
              <div className="card-body">
                <div className="upper_data d-flex justify-content-around align-items-center">
                  <h4 className="mt-2">{ele.dish}</h4>
                  <span>{ele.rating}&nbsp;★</span>
                </div>
                <div className="lower_data d-flex justify-content-between">
                  <h5>{ele.address}</h5>
                  <span>₹{ele.price}</span>
                </div>
                <div className="extra"></div>

                <div className="last_data d-flex justify-content-between align-items-center">
                  <img src={ele.arrimg} alt="logo" className="limg" />
                  <Button
                    style={{ width: "150px", background: "#ff3054db", border: "none" }}
                    variant="outline-light"
                    className="mt-2 mb-2"
                    onClick={() => handleAddToCart(ele)}
                  >
                    Add to Cart
                  </Button>
                  <img src={ele.delimg} alt="logo" className="laimg" />
                </div>
              </div>
            </Card>
          ))}


        </div>
      </section>
    </>
  )
}
