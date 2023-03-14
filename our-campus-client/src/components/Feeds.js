import React from 'react';
import Post from './Post';
import {Row, Container} from 'react-bootstrap';
import Message from './Message';

const Feeds = ({posts, type}) =>{
  // console.log(posts);
  return (
    <Container>
    {posts.length > 0 ? (posts.map((post)=>(
      <Row key={post._id}>
          <Post post={post} />
        </Row>
      ))):(
        <Message variant="info">Have Not Posted Yet</Message>
      )
    }
    </Container>
  )
}

export default Feeds;


// const posts = [{
//   name: "Amazon Echo Dot 3rd Generation",
//   image: "images/1.jpg",
//   description:
//     "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
//   brand: "Amazon",
//   category: "Electronics",
//   price: 29.99,
//   countInStock: 0,
//   rating: 4,
//   numReviews: 12,
// },
//   {
//   name: "Amazon Echo Dot 3rd Generation",
//   image: "images/2.jpg",
//   description:
//     "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
//   brand: "Amazon",
//   category: "Electronics",
//   price: 29.99,
//   countInStock: 0,
//   rating: 4,
//   numReviews: 12,
// },
//   {
//   name: "Amazon Echo Dot 3rd Generation",
//   image: "images/3.jpg",
//   description:
//     "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
//   brand: "Amazon",
//   category: "Electronics",
//   price: 29.99,
//   countInStock: 0,
//   rating: 4,
//   numReviews: 12,
// },
//   {
//   name: "Amazon Echo Dot 3rd Generation",
//   image: "images/4.jpg",
//   description:
//     "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
//   brand: "Amazon",
//   category: "Electronics",
//   price: 29.99,
//   countInStock: 0,
//   rating: 4,
//   numReviews: 12,
// },
//   {
//   name: "Sadurathman",
//   image: "images/5.jpg",
//   caption:
//     "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
//   userId: "Amazon",
//   category: "Electronics",
//   likes: 29,
//   comments: 4,
//   numReviews: 12,
// }
// ];