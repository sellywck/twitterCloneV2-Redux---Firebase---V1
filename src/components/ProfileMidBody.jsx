import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../feautures/posts/postsSlice";
import {AuthContext} from './AuthProvider'

export default function ProfileMidBody() {
  const url =
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

  const dispatch = useDispatch();

  // state.posts ={
  //   posts : [], 
  //   loading : true
  // }
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);

  // //1. arrow + .then() method
  // const fetchPosts = (userId) => {
  //   fetch(https://3630a97b-4f1b-4c30-a6ab-4f683efbdb17-00-1yla15zq0tgjt.kirk.replit.dev/posts/user/${userId})
  //   .then((response) => response.json())
  //   .then((data) => setPosts(data))
  //   .catch((error) => console.error("Error:", error));
  // }

  // //2. arrow function + async await method
  // const fetchPosts = async(userId) => {
  //   const response = await fetch(https://3630a97b-4f1b-4c30-a6ab-4f683efbdb17-00-1yla15zq0tgjt.kirk.replit.dev/posts/user/${userId})
  //   const data = await response.json();
  //   setPosts(data)
  // }

  // //3. regular function + async await method
  // async function fetchPosts(userId) {
  //   try {
  //       const response = await fetch(https://3630a97b-4f1b-4c30-a6ab-4f683efbdb17-00-1yla15zq0tgjt.kirk.replit.dev/posts/user/${userId})

  //       const data = await response.json();

  //       setPosts(data)

  //   } catch (err) {
  //       console.error("Error: ", err)
  //   }
  // }

  // //Use axios
  // const fetchPosts = (userId) => {
  //   axios
  //     .get(
  //       `https://c20899cc-c22b-4a1c-abf7-e38021f98ada-00-2ri37uqfsksg1.riker.replit.dev/posts/user/${userId}`
  //     )
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
      dispatch(fetchPostsByUser(currentUser.uid));
  }, [dispatch, currentUser]);

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            {" "}
            Edit Profile
          </Button>
        </Col>
      </Row>
      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Haris
      </p>
      <p style={{ marginBottom: "2px" }}>@haris.samingan</p>
      <p>
        I help people switch careers to be a software developer at
        sigmaschool.co
      </p>
      <p>Entrepreneur</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>

      <Nav variant="undeerline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Likes</Nav.Link>
        </Nav.Item>
      </Nav>
      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}
      {posts.map((post) => (
          <ProfilePostCard
            key={post.id}
            post={post}
          />
        ))}
    </Col>
  );
}
