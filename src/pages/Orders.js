import React from "react";
import {
  Table,
  Container,
  Divider,
  Segment,
  Dropdown,
  Input,
} from "semantic-ui-react";
//   const options for Dropdown use...
const options = [
  { key: 1, text: "Online Payment", value: 1 },
  { key: 2, text: "COD", value: 2 },
];

function Orders() {
  return (
    <Container style={Styling}>
      {/* Styling part for segment ======   style={{backgroundColor: '#222'}} */}
      <Segment style={{marginLeft:"40px"}}>
        <header style={headerstyling}>  
          <b>Orders Management </b>
        </header>
        <Divider />
        <Segment.Group horizontal>
        <Segment><b>Payment: </b><Dropdown
                clearable
                options={options}
                selection 
                placeholder="Payment Type"
                color="black"
              />
            </Segment>
            <Segment><b>Start Date: </b><Input type="date"></Input></Segment>

            <Segment><b>End Date: </b><Input type="date"></Input></Segment>
        </Segment.Group>
        {/* <Divider>Product Management</Divider> */}
        <Table padded celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>SNo</Table.HeaderCell>
              <Table.HeaderCell>OrderId</Table.HeaderCell>
              <Table.HeaderCell>Payment</Table.HeaderCell>
              <Table.HeaderCell>Date of Delivery</Table.HeaderCell>
              <Table.HeaderCell>Billing Date</Table.HeaderCell>
              <Table.HeaderCell>Payment Status</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Phone No</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Segment>
    </Container>
  );
}
export default Orders;

const Styling = {
  marginTop: "1rem", 
};

const headerstyling = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  
};
