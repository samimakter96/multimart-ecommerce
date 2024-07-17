import React from "react";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite } from "../redux/slices/cartSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteItems = useSelector((state) => state.cart.favorites);
  return (
    <>
      <CommonSection title="Favorite Products" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {favoriteItems.length === 0 ? (
                <h2 className="fs-4 text-center">
                  No item added to the favorite
                </h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {favoriteItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.imgUrl}
                            alt=""
                            onClick={() => navigate(`/product/${item.id}`)}
                          />
                        </td>
                        <td>{item.productName}</td>
                        <td>${item.price}</td>
                        <td>
                          <MdDelete
                            size={"25px"}
                            className="del"
                            onClick={() => dispatch(deleteFavorite(item.id))}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FavoriteProducts;
