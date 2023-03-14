import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listDevelopers } from "../actions/userActions";
import DeveloperCard from "../components/DeveloperCard";
import Loader from "../components/Loader";

// const developers = {
//     _id: { $oid: "61bc3e05fbcf08cdcbd82715" },
//     username: "19eucb045",
//     name: "SADURATHMAN V",
//     dp: "/uploads\\image-1639726631089.jpg",
//     rating: 5,
//     respect: 0,
//     userType: 3,
//     skills: [],
//     hobbies: [],
//     followers: [
//       { $oid: "61bc3ec9a26e6b8ffb42d910" },
//       { $oid: "61bc3ec9a26e6b8ffb42d910" },
//     ],
//     following: [{ $oid: "61bc3ec9a26e6b8ffb42d910" }],
//     requests: [],
//     requested: [],
//     suggestions: [{ $oid: "61bc3ec9a26e6b8ffb42d910" }],
//     joinedEvents: [],
//     hostedEvents: [],
//     posts: [
//       { $oid: "61bc3eaba26e6b8ffb42d902" },
//       { $oid: "61bc3f59a26e6b8ffb42d946" },
//     ],
//     home: [],
//     clubs: [],
//     createdAt: { $date: "2021-12-17T07:36:37.092Z" },
//     updatedAt: { $date: "2021-12-20T03:58:56.277Z" },
//     __v: 92,
//     about:
//       "Enthusiastic Developer Interested in Data Structures, Web Development(MERN Stack), Core and Advanced Java, Competitive Programming.",
//     tagline: "MERN Stack Developer | Youtuber",
//   };

const DeveloperScreen = () => {
  const dispatch = useDispatch();

  const developer = useSelector((state) => state.developerList);
  const { loading, developers } = developer;

  useEffect(() => {
    if (!developers || developers.length === 0) {
      dispatch(listDevelopers());
    }
  }, [developers, dispatch]);

  return (
    <Container>
      {loading && <Loader />}
      <Row>Developed By</Row>
      <Row>
        {developers &&
          developers.map((developer) => (
            <Col md={4}>
              <DeveloperCard user={developer} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default DeveloperScreen;
