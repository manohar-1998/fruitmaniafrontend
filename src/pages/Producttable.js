import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Table,
  Container,
  Button,
  Icon,
  Divider,
  Segment,
} from "semantic-ui-react";
import { isAuthenticated } from "./auth";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getProducts, deleteproduct } from "./Apicalls";
toast.configure();
function Producttable() {
  const notifydel=()=>{
    toast.error(<h3>Product Deleted Successfully</h3>,{
      position:toast.POSITION.TOP_CENTER,
      autoClose:3000
    })
  }
  const { user } = isAuthenticated();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    // Function for calling all the Products
    console.log("Inside preload function")
    getProducts().then((data) => {
      console.log("Getting products")
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data.data);
         console.log(data.data)
      }
    });
  };
  const history = useHistory();
  function Addproduct() {
    history.push(`/Addproduct`);
  }
  function Editproduct(id) {
    history.push(`/Productedit/${id}`);
  }
  //Deleting Product
  const Productdeletebtn = (id) => {
    let answer = window.confirm("Confirm ok to delete?");
    if (answer) {
      deleteproduct(id,user._id).then((data) => {
        console.log("Inside Delete Method..,Product Id=,User ID=",id,user._id)
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("deleted successfully...");
          notifydel();
          return preload();
        }
      });
    }
  };
  return (
    <Container style={Styling}>
      <Segment style={{ marginLeft: "92px" }}>
        <header style={headerstyle}>
          <b>Product Management </b>
          <Button
            style={{
              position: "absolute",
              top: "14px",
              left: "50%",
              marginLeft: "380px",
            }}
            color="green"
            onClick={Addproduct}
          >
            <Icon name="add" /> Add Product
          </Button>
        </header>
        <Divider />
        <Container style={Addbuttonuse}>
          <Table padded celled selectable>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell style={{ width: "6%" }}>
                  S No
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "12%" }}>
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "8%" }}>
                  Grade
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "10%" }}>
                  Category
                </Table.HeaderCell>
                {/* <Table.HeaderCell style={{ width: "10%" }}>
                  Image
                </Table.HeaderCell> */}
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell style={{ width: "23%" }} className="Adjust">
                  Actions
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products.map((prod) => (
                <Table.Row textAlign="center">
                  <Table.Cell>{products.indexOf(prod) + 1}</Table.Cell>
                  <Table.Cell>{prod.name}</Table.Cell>
                  <Table.Cell>{prod.grade}</Table.Cell>
                  <Table.Cell>{prod.category}</Table.Cell>
                  {/* <Table.Cell>{prod.image}</Table.Cell> */}
                  <Table.Cell>{prod.description}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => Editproduct(prod._id)} color="orange">
                      <Icon name="edit outline"> </Icon>Edit
                    </Button>
                    <Button onClick={() => Productdeletebtn(prod._id)} color="red">
                      <Icon name="trash alternate"></Icon>Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Segment>
    </Container>
  );
}
export default Producttable;
const Styling = {
  marginTop: "1rem",
  width: "80%",
};
const Addbuttonuse = {
  marginBottom: "2em",
  width: "100%",
};
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
};
