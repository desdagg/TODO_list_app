import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class TaskEdit extends Component {

  emptyItem = {
    name: '',
    description: '',
    checked: false
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const task = await (await fetch(`/api/task/${this.props.match.params.id}`)).json();
      this.setState({item: task});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }



  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    console.log({item});

    var url;
    var apiMethod;

    if (item.id){
        url=('/api/task/').concat((item.id).toString());
        apiMethod = 'PUT';}
    else{
        url='/api/task/' ;
        apiMethod='POST';}

    await fetch(url, {
      method: apiMethod,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/tasks');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Task' : 'Add Task'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Address</Label>
            <Input type="text" name="description" id="description" value={item.description || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
          <tr>
            <td width="20%">
            <Label for="checked">Change Task State</Label>
            </td>
            <td width="20%">
            <Input type="checkbox" name="checked" id="checked" value={!item.checked}
                   onChange={this.handleChange} />
            </td>
          </tr>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/tasks">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(TaskEdit);