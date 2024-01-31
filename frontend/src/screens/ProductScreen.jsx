import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'
import Product from '../components/Product'


function ProductScreen() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
  useEffect(() => {
    async function fetchProduct() {
      const {data} = await axios.get(`http://127.0.0.1:8000/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])
    return (
        <div>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid ></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={'#f8e825'}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Availability</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button onClick={() => console.log('add to cart')} className='btn-block' type='button' disabled={product.countInStock === 0}>
                      Add to Cart!
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        </div>
    
    )
}

export default ProductScreen