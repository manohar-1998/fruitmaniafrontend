import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Divider,
  Form,
  Input,
  Segment,
  TextArea,
  Select,
} from "semantic-ui-react";
import { isAuthenticated } from "./auth";
import { createProduct } from "./Apicalls";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
function Addproduct() {
  const notify=()=>{
    toast.success(<h3>Product Created Successfully</h3>,{
      position:toast.POSITION.TOP_CENTER,
      autoClose:3000
    })
  }
  const { user } = isAuthenticated();
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    grade: "",
    description: "",
    formData: new FormData(),
  });
  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const {
    //  name, price, stock, category, grade, description,
     formData } = values;
  const Addproductsubmitbtn = (event) => {
    console.log("Submit button clicked...");
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id,formData).then((values) => {
        if (values.error) {
          setValues({ ...values, error: values.error });
        } else {
          setValues({
            ...values,
          });
          notify();  // Using for the Toast message
          console.log("After Toast method")
        }
        history.push('/producttable');
      });
  };

  function Productcancel(){
    history.push('/producttable');
  }

  return (
    <Segment style={{ width: "500px", marginLeft: "515px", marginTop: "30px" }}>
      <header style={headerstyle}>
        <b>Add Product</b>
      </header>
      <Divider />
      <Segment color="brown" inverted>
        <Form>
          <Form.Field
            control={Input}
            label="Name"
            placeholder="Product Name"
            onChange={handleChange("name")}
          />
          <Form.Group widths="2">
            <Form.Field
              control={Input}
              label="Price"
              onChange={handleChange("price")}
            />
            <Form.Field
              control={Input}
              label="Stock"
              onChange={handleChange("stock")}
            />
          </Form.Group>
          <Form.Group widths="2">
            <Form.Field>
              <label>Category</label>
              <select
                name="category"
                id="category"
                onChange={handleChange("category")}
              >
                <option value="">Select</option>
                <option value="FRUIT">FRUIT</option>
                <option value="VEG">VEG</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Grade</label>
              <select name="grade" id="grade" onChange={handleChange("grade")}>
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Form.Field
            control={Input}
            label="Upload Image"
            type="file"
            //   onChange={handleUpload}
          />
          <Form.Field
            control={TextArea}
            label="Description"
            placeholder="Tell us more..."
            onChange={handleChange("description")}
          />
          <div style={{ textAlign: "center" }}>
            <Button color="green" onClick={Addproductsubmitbtn}>Create Product</Button>
            <Button color="black" onClick={Productcancel}>Cancel</Button>
          </div>
        </Form>
      </Segment>
    </Segment>
  );
}
export default Addproduct;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
};
