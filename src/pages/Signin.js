import React, { useState } from "react";
import logo from "../pohulabs.png";
import { Redirect } from "react-router-dom";
import {
  Button,
  Icon,
  Grid,
  Form,
  Header,
  Image,
  Segment,
  Container,
} from "semantic-ui-react";
import { signin, authenticate, isAuthenticated } from "./auth/index";
 const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }; 
  const onSubmit = (event) => {
    console.log("Submit button clicked...");
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // API connection part here for your Sign in page...
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.data.error, loading: false });
        } else {
          authenticate(data.data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
            console.log("In else condition of Sign in page",data.data)
          });
        }
      })
      .catch((error) =>
        setValues({
          ...values,
          error: (
            <h2
              style={{
                width: "400px",
                marginLeft: "645px",
                marginTop: "30px",
                color: "red",
              }}
            >
              "Invalid Credentials"
            </h2>
          ),
          loading: false,
        })
      );
  };
  if (didRedirect) {
    if (user && user.role === 1) {
      return <Redirect to="/Piechart" />;
    } else {
      setValues({ error: "UnAuthorized User, Access Denied" });
    }
  }
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-center">
          <Container
            style={{ marginTop: "4em", marginBottom: "2em" }}
            textAlign="center"
          >
            <img width="250" height="200" src={logo} alt="logo" />
          </Container>
          <Grid
            textAlign="center"
            marginbottom="150px"
            style={{ height: "40vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="blue">
                Login to Account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Field>
                    <label align="left">
                      <Icon name="envelope" />
                      Email
                    </label>
                    <input
                      onChange={handleChange("email")}
                      value={email}
                      className="form-control"
                      placeholder="Email"
                      type="email"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label align="left">
                      <Icon name="lock" />
                      Password{" "}
                    </label>
                    <input
                      onChange={handleChange("password")}
                      value={password}
                      Icon="user"
                      placeholder="Password"
                      className="form-control"
                      type="password"
                    />
                  </Form.Field>
                  <Button color="teal" fluid size="large" onClick={onSubmit}>
                    Submit
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  };
  return (
    <>
      {errorMessage()}
      {signInForm()}
    </>
  );
};
export default Signin;
