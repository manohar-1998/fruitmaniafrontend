import React, { useEffect, useState } from "react";
import { useHistory} from "react-router";
import { isAuthenticated } from "./auth";
import {
  Button,
  Divider,
  Form,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { getproductById, getProducts, updatedProduct } from "./Apicalls";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function Productedit(props) {
  const notify=()=>{
    toast.success(<h3>Product Updated Successfully</h3>,{
      position:toast.POSITION.TOP_CENTER,
      autoClose:3000
    })
  }
  const [product, setValues] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    grade: "",
    description: "",
    formData: "",
  });
  const { name, price, stock, category, grade, description, formData } = product;
  const params = props.match.params.id
  const onInputChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setValues({ ...product, [name]: event.target.value });
  }; 
  const Load = (params) => {
    getproductById(params).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setValues({
          ...product,
          id: res.data._id,
          name: res.data.name,
          price: res.data.price,
          stock: res.data.stock,
          grade: res.data.grade,
          category: res.data.category,
          description: res.data.description,
          formData : new FormData()
        });
      }
    });
  };
  const onSubmit = (params) => (event) => {
    event.preventDefault();
    const { user } = isAuthenticated();
    updatedProduct(params, user._id, formData).then((data) => {
      if (data.error) {
        setValues({ ...product, error: data.error });
      } else {
        setValues({
          ...product,
          name: "",
          price: "",
          stock: "",
          category: "",
          grade: "",
          description: "",
        });
        notify();
      }
      getProducts();
      history.push("/producttable");
    });
  };
  const history = useHistory();
  function Editproductsubmitbtn() {
    history.push("/Producttable");
  }
  useEffect(() => {
    Load(params);
    // console.log("Inside use Effect params value=",params) // Contains User id
  }, [params]);
  return (
    <Segment style={{ width: "500px", marginLeft: "515px", marginTop: "30px" }}>
      <header style={headerstyle}>
        <b>Edit Product</b>
      </header>
      <Divider />
      <Segment color="brown" inverted >
          <Form >
            <Form.Field
              control={Input}
              label="Name"
              value={name}
              onChange={onInputChange("name")}
            />
            <Form.Group widths="2">
              <Form.Field
                control={Input}
                label="Price"
                value={price}
                onChange={onInputChange("price")}
              />
              <Form.Field
                control={Input}
                label="Stock"
                value={stock}
                onChange={onInputChange("stock")}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Field>
              <label>Category</label>
               <select
                  type="select"
                  onChange={onInputChange("category")}
                >
                  <option value="">Select</option>
                  <option value="FRUIT">FRUIT</option>
                  <option value="VEG">VEG</option>
                </select></Form.Field>
                <Form.Field>
              <label>Grade</label>
               <select
                  type="select"
                  onChange={onInputChange("grade")}
                >
                  <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                </select></Form.Field>
            </Form.Group>
            <Form.Field
              control={TextArea}
              value={description}
              onChange={onInputChange("description")}
              label="Description"
              placeholder="Tell us more..."
            />
            <div style={{ textAlign: "center" }}>
              <Button color="green" onClick={onSubmit(params)}>
                {" "}
                Save
              </Button>
              <Button color="black" onClick={Editproductsubmitbtn}>
                Cancel
              </Button>
            </div>
          </Form>
      </Segment>
    </Segment>
  );
}
export default Productedit;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
};
