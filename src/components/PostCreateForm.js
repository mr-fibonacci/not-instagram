import React, { useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router";
import { IMAGE_FILTERS } from "../utils";
import Content from "./Content";
import { ReactComponent as Upload } from "../assets/upload.svg";
import btnStyles from "./Button.module.css";
import Asset from "./Asset";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

function PostCreateForm() {
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    image_filter: "normal",
  });
  const { title, content, image, image_filter } = postData;
  const imageFile = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile.current.files[0]);
    formData.append("image_filter", image_filter);

    try {
      await axios.post("/posts/", formData);
      history.push("/");
    } catch (err) {
      console.log(err.request);
    }
  };
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={handleChange}
          name="title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>content</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
        />
      </Form.Group>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </>
  );

  return (
    <Row>
      <Col className="p-0 p-md-2" md={7} lg={8}>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              {image ? (
                <>
                  <figure className={image_filter}>
                    <Image style={{ width: "100%" }} src={image} />
                  </figure>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue}`}
                    htmlFor="image-upload"
                  >
                    change the image
                  </Form.Label>
                  <p>swipe to choose a filter: #{image_filter}</p>
                  <Swiper
                    style={{
                      textAlign: "center",
                      marginLeft: "-20px",
                      marginRight: "-20px",
                    }}
                    slidesPerView={3}
                    spaceBetween={10}
                    freeMode={true}
                  >
                    {image &&
                      IMAGE_FILTERS.map((imageFilter) => (
                        <SwiperSlide
                          style={{
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                          key={imageFilter.value}
                        >
                          {imageFilter.value === "normal" ? (
                            <div>
                              <figure
                                onClick={() =>
                                  setPostData((prevState) => ({
                                    ...prevState,
                                    image_filter: "nofilter",
                                  }))
                                }
                              >
                                <Image
                                  style={{
                                    width: "100%",
                                  }}
                                  src={image}
                                />
                              </figure>
                              #nofilter
                            </div>
                          ) : (
                            <div>
                              <figure
                                onClick={() =>
                                  setPostData((prevState) => ({
                                    ...prevState,
                                    image_filter: imageFilter.value,
                                  }))
                                }
                                className={imageFilter.value}
                              >
                                <Image src={image} />
                              </figure>
                              #{imageFilter.value}
                            </div>
                          )}
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </>
              ) : (
                <Form.Label
                  style={{ display: "flex", justifyContent: "center" }}
                  htmlFor="image-upload"
                >
                  <Asset children={<Upload />} />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    image: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Form>
        </Content>
      </Col>
      <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
        <Content>{textFields}</Content>
      </Col>
    </Row>
  );
}

export default PostCreateForm;
