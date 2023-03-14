import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopEvents } from "../actions/eventActions";

const EventCarousel = () => {
  const dispatch = useDispatch();

  const eventTopRated = useSelector((state) => state.eventTopRated);
  const { loading, error, events } = eventTopRated;

  useEffect(() => {
    dispatch(listTopEvents());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {events.map((event) => (
        <Carousel.Item key={event._id}>
          <Link to={`/event/${event._id}`}>
            <Image src={event.image} alt={event.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {event.name}
                {/* {event.name}(${event.prize}) */}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousel;
